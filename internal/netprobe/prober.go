// Package netprobe 从面板主机直连节点服务器,测量网络入口延迟。
// 它不依赖 dae 的内部健康检查,也不进行代理协议握手。
//
// 目标地址来自管理员自己的 dae 配置,可能合法地指向内网或回环地址
// (example.dae 就包含 socks5://localhost:1080),因此这里不按地址段过滤,
// 而是靠端点的认证与 CSRF 校验限定调用者,并用全局并发上限约束出站突发。
package netprobe

import (
	"context"
	"errors"
	"fmt"
	"net"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"
)

const (
	MaxTargets         = 64
	defaultTimeout     = 4 * time.Second
	defaultConcurrency = 16
	probeAttempts      = 3
)

type Target struct {
	Host string `json:"host"`
	Port int    `json:"port"`
}

type Result struct {
	Host       string  `json:"host"`
	Port       int     `json:"port"`
	Reachable  bool    `json:"reachable"`
	LatencyMs  float64 `json:"latencyMs,omitempty"`
	ResolvedIP string  `json:"resolvedIp,omitempty"`
	Method     string  `json:"method,omitempty"`
	Error      string  `json:"error,omitempty"`
}

type Prober struct {
	dial      func(ctx context.Context, network, address string) (net.Conn, error)
	resolve   func(ctx context.Context, host string) ([]net.IPAddr, error)
	ping      func(ctx context.Context, address net.IP) (float64, error)
	timeout   time.Duration
	semaphore chan struct{}
}

func New() *Prober {
	return newWithLimits(markedDialContext, defaultTimeout, defaultConcurrency)
}

// newWithLimits 让测试可以收紧超时与并发,同时保证 semaphore 始终有容量。
func newWithLimits(dial func(context.Context, string, string) (net.Conn, error), timeout time.Duration, concurrency int) *Prober {
	if timeout <= 0 {
		timeout = defaultTimeout
	}
	if concurrency <= 0 {
		concurrency = defaultConcurrency
	}
	return &Prober{
		dial:      dial,
		resolve:   resolveHost,
		ping:      probeICMP,
		timeout:   timeout,
		semaphore: make(chan struct{}, concurrency),
	}
}

func (t Target) validate() error {
	host := strings.TrimSpace(t.Host)
	if host == "" || host != t.Host || len(host) > 253 || strings.ContainsAny(host, " /\\") {
		return fmt.Errorf("探测主机 %q 无效", t.Host)
	}
	if t.Port < 1 || t.Port > 65535 {
		return fmt.Errorf("探测端口 %d 无效", t.Port)
	}
	return nil
}

// ValidateBatch 只检查整批目标的数量限制。单个目标是否合法不在这里拦截——
// Probe 会把它变成那一条结果上的错误,不牵连同批其他目标。调用方在决定
// 是否走缓存之前需要先做这层校验,因此单独暴露出来,避免两处各写一份规则。
func ValidateBatch(targets []Target) error {
	if len(targets) == 0 {
		return errors.New("探测目标不能为空")
	}
	if len(targets) > MaxTargets {
		return fmt.Errorf("探测目标数量超过 %d 上限", MaxTargets)
	}
	return nil
}

// Probe 并发探测全部目标并按入参顺序返回结果。
// 并发上限属于 Prober 实例,因此多个并发请求共享同一份出站预算。
// 单个目标不合法只影响它自己的那条结果,不会让整批探测失败。
func (p *Prober) Probe(ctx context.Context, targets []Target) ([]Result, error) {
	if err := ValidateBatch(targets); err != nil {
		return nil, err
	}

	results := make([]Result, len(targets))
	var wg sync.WaitGroup
	for index, target := range targets {
		if err := target.validate(); err != nil {
			results[index] = Result{Host: target.Host, Port: target.Port, Error: err.Error()}
			continue
		}
		wg.Add(1)
		go func() {
			defer wg.Done()
			results[index] = p.probeOne(ctx, target)
		}()
	}
	wg.Wait()
	return results, nil
}

func (p *Prober) probeOne(ctx context.Context, target Target) Result {
	result := Result{Host: target.Host, Port: target.Port}
	select {
	case p.semaphore <- struct{}{}:
		defer func() { <-p.semaphore }()
	case <-ctx.Done():
		result.Error = describeDialError(ctx.Err())
		return result
	}

	probeCtx, cancel := context.WithTimeout(ctx, p.timeout)
	defer cancel()

	addresses, err := p.resolve(probeCtx, target.Host)
	if err != nil {
		result.Error = "解析节点地址: " + describeDialError(err)
		return result
	}

	// 很多旁路由没有 IPv6 默认路由。优先 IPv4 可避免一个不可达的 AAAA 记录
	// 耗尽整次探测预算,同时仍为纯 IPv6 节点保留候选地址。
	sort.SliceStable(addresses, func(left, right int) bool {
		return addresses[left].IP.To4() != nil && addresses[right].IP.To4() == nil
	})

	var lastErr error
	for _, address := range addresses {
		candidate := address.String()
		result.ResolvedIP = candidate
		if isPublicAddress(address.IP) {
			result.Method = "icmp"
			latency, err := p.ping(probeCtx, address.IP)
			if err != nil {
				lastErr = err
				continue
			}
			result.Reachable = true
			result.LatencyMs = latency
			return result
		}

		result.Method = "tcp"
		samples, err := p.probeTCP(probeCtx, candidate, target.Port)
		if err != nil {
			lastErr = err
			continue
		}
		result.Reachable = true
		result.LatencyMs = samples[len(samples)/2]
		return result
	}
	if result.Method == "icmp" {
		result.Error = "公网节点未响应 ICMP，无法得到可信的网络延迟: " + describeDialError(lastErr)
	} else if lastErr != nil {
		result.Error = describeDialError(lastErr)
	} else {
		result.Error = "节点没有可探测的 IP 地址"
	}
	return result
}

func (p *Prober) probeTCP(ctx context.Context, host string, port int) ([]float64, error) {
	samples := make([]float64, 0, probeAttempts)
	var lastErr error
	for range probeAttempts {
		latency, err := p.dialOnce(ctx, host, port)
		if err != nil {
			lastErr = err
			break
		}
		samples = append(samples, latency)
	}
	if len(samples) == 0 {
		return nil, lastErr
	}
	sort.Float64s(samples)
	return samples, nil
}

func isPublicAddress(ip net.IP) bool {
	return ip != nil && ip.IsGlobalUnicast() && !ip.IsPrivate()
}

func (p *Prober) dialOnce(ctx context.Context, host string, port int) (float64, error) {
	startedAt := time.Now()
	conn, err := p.dial(ctx, "tcp", net.JoinHostPort(host, strconv.Itoa(port)))
	elapsed := time.Since(startedAt)
	if err != nil {
		return 0, err
	}
	_ = conn.Close()
	return float64(elapsed.Microseconds()) / 1000, nil
}

func resolveHost(ctx context.Context, host string) ([]net.IPAddr, error) {
	if ip := net.ParseIP(host); ip != nil {
		return []net.IPAddr{{IP: ip}}, nil
	}
	addresses, err := net.DefaultResolver.LookupIPAddr(ctx, host)
	if err != nil {
		return nil, err
	}
	if len(addresses) == 0 {
		return nil, errors.New("域名没有 IP 地址")
	}
	return addresses, nil
}

func describeDialError(err error) string {
	var netErr net.Error
	if errors.Is(err, context.DeadlineExceeded) || (errors.As(err, &netErr) && netErr.Timeout()) {
		return "连接超时"
	}
	if errors.Is(err, context.Canceled) {
		return "探测已取消"
	}
	for {
		unwrapped := errors.Unwrap(err)
		if unwrapped == nil {
			return err.Error()
		}
		err = unwrapped
	}
}
