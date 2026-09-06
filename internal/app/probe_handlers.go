package app

import (
	"context"
	"errors"
	"log/slog"
	"net"
	"net/http"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/tuoro/kdae-panel/internal/netprobe"
)

const (
	// 缓存容量按"配置里可能出现过的节点"估,远大于单次 MaxTargets：节点换来
	// 换去时旧条目还留着也无妨，超出后按探测时间淘汰最旧的。
	probeCacheCapacity = 256
	probeMaxCacheAge   = 24 * time.Hour
)

type ProbeService interface {
	Probe(ctx context.Context, targets []netprobe.Target) ([]netprobe.Result, error)
}

type latencyProbeRequest struct {
	Targets []netprobe.Target `json:"targets"`
	// MaxAgeSeconds 给出时，比它更新的缓存结果直接复用，不重新发包。
	// 省略或为 0 表示"现在就测"——编排页那个按钮是用户的显式动作，
	// 必须每次都是真实测量，所以默认行为保持不带缓存。
	MaxAgeSeconds int `json:"maxAgeSeconds,omitempty"`
}

// cachedProbeResult 在探测结果上补出这条结果是什么时候测的、是不是复用的。
// 页面必须能如实写"3 分钟前探测"，而不是把旧值当成实时值展示。
type cachedProbeResult struct {
	netprobe.Result
	ProbedAt time.Time `json:"probedAt"`
	Cached   bool      `json:"cached,omitempty"`
}

type probeCacheEntry struct {
	result   netprobe.Result
	probedAt time.Time
}

// probeCache 让会自动打开的页面（首页概览）复用最近一次探测。探测是面板
// 主动向外发包并计入审计日志的，开销不能随打开的标签页数量翻倍；缓存放在
// 服务端而不是浏览器，正是为了让并发的页面共享同一次探测。
type probeCache struct {
	mu       sync.Mutex
	entries  map[string]probeCacheEntry
	capacity int
}

func newProbeCache() *probeCache {
	return &probeCache{entries: make(map[string]probeCacheEntry), capacity: probeCacheCapacity}
}

func probeCacheKey(host string, port int) string {
	return strings.ToLower(strings.TrimSpace(host)) + ":" + strconv.Itoa(port)
}

// partition 把目标分成"缓存够新"和"需要重新探测"两拨。重复目标只探一次，
// 响应阶段再按 key 映射回每一个入参位置。
func (cache *probeCache) partition(targets []netprobe.Target, maxAge time.Duration, now time.Time) (map[string]probeCacheEntry, []netprobe.Target) {
	cache.mu.Lock()
	defer cache.mu.Unlock()
	hits := make(map[string]probeCacheEntry, len(targets))
	queued := make(map[string]struct{}, len(targets))
	missing := make([]netprobe.Target, 0, len(targets))
	for _, target := range targets {
		key := probeCacheKey(target.Host, target.Port)
		if _, done := queued[key]; done {
			continue
		}
		if _, hit := hits[key]; hit {
			continue
		}
		if maxAge > 0 {
			if entry, ok := cache.entries[key]; ok && now.Sub(entry.probedAt) <= maxAge {
				hits[key] = entry
				continue
			}
		}
		queued[key] = struct{}{}
		missing = append(missing, target)
	}
	return hits, missing
}

func (cache *probeCache) store(results []netprobe.Result, at time.Time) {
	cache.mu.Lock()
	defer cache.mu.Unlock()
	for _, result := range results {
		cache.entries[probeCacheKey(result.Host, result.Port)] = probeCacheEntry{result: result, probedAt: at}
	}
	if len(cache.entries) > cache.capacity {
		cache.evictOldest(len(cache.entries) - cache.capacity)
	}
}

func (cache *probeCache) evictOldest(count int) {
	type candidate struct {
		key      string
		probedAt time.Time
	}
	candidates := make([]candidate, 0, len(cache.entries))
	for key, entry := range cache.entries {
		candidates = append(candidates, candidate{key: key, probedAt: entry.probedAt})
	}
	sort.Slice(candidates, func(left, right int) bool {
		return candidates[left].probedAt.Before(candidates[right].probedAt)
	})
	for _, candidate := range candidates[:count] {
		delete(cache.entries, candidate.key)
	}
}

func probeCacheMaxAge(seconds int) (time.Duration, error) {
	if seconds == 0 {
		return 0, nil
	}
	maxAge := time.Duration(seconds) * time.Second
	if seconds < 0 || maxAge > probeMaxCacheAge {
		return 0, errors.New("探测结果最大缓存秒数必须是 1 到 86400 之间的整数")
	}
	return maxAge, nil
}

func registerProbeRoutes(router *http.ServeMux, prober ProbeService, logger *slog.Logger) {
	cache := newProbeCache()
	router.HandleFunc("POST /api/v1/net/latency", func(writer http.ResponseWriter, request *http.Request) {
		if prober == nil {
			writeAPIError(writer, http.StatusServiceUnavailable, "probe_unavailable", "延迟探测服务尚未初始化")
			return
		}
		var payload latencyProbeRequest
		if !decodeSmallJSONBody(writer, request, &payload) {
			return
		}
		maxAge, err := probeCacheMaxAge(payload.MaxAgeSeconds)
		if err != nil {
			writeAPIError(writer, http.StatusBadRequest, "invalid_probe_request", err.Error())
			return
		}
		// 数量校验要在查缓存之前做，否则整批命中缓存时会绕过 MaxTargets 上限。
		if err := netprobe.ValidateBatch(payload.Targets); err != nil {
			logger.Warn("节点延迟探测被拒绝", "count", len(payload.Targets), "error", err)
			writeAPIError(writer, http.StatusBadRequest, "invalid_probe_request", err.Error())
			return
		}

		now := time.Now().UTC()
		hits, missing := cache.partition(payload.Targets, maxAge, now)
		fresh := make(map[string]probeCacheEntry, len(missing))
		if len(missing) > 0 {
			// 该端点会让面板主动向外建连，因此把目标记入审计日志。
			// 目标本就来自仅 root 可读的 dae 配置，面板日志同样如此，不扩大暴露面。
			// 只记真正发出去的那些：命中缓存没有产生任何出站连接，记进来会让
			// 审计日志谎报面板的对外行为。
			logger.Info("节点延迟探测", "count", len(missing), "targets", describeTargets(missing), "reused", len(hits))
			results, probeErr := prober.Probe(request.Context(), missing)
			if probeErr != nil {
				logger.Warn("节点延迟探测被拒绝", "count", len(missing), "error", probeErr)
				writeAPIError(writer, http.StatusBadRequest, "invalid_probe_request", probeErr.Error())
				return
			}
			cache.store(results, now)
			for _, result := range results {
				fresh[probeCacheKey(result.Host, result.Port)] = probeCacheEntry{result: result, probedAt: now}
			}
		}

		// 按入参顺序回填，重复目标共享同一条结果。
		results := make([]cachedProbeResult, 0, len(payload.Targets))
		for _, target := range payload.Targets {
			key := probeCacheKey(target.Host, target.Port)
			if entry, ok := fresh[key]; ok {
				results = append(results, cachedProbeResult{Result: entry.result, ProbedAt: entry.probedAt})
				continue
			}
			if entry, ok := hits[key]; ok {
				results = append(results, cachedProbeResult{Result: entry.result, ProbedAt: entry.probedAt, Cached: true})
				continue
			}
			// 正常不会走到这里：Probe 保证按入参逐条返回。真的缺了也要占住位置，
			// 否则响应与请求错位，前端会把某个节点的延迟安到另一个节点头上。
			results = append(results, cachedProbeResult{
				Result:   netprobe.Result{Host: target.Host, Port: target.Port, Error: "探测结果缺失"},
				ProbedAt: now,
			})
		}
		writeJSON(writer, http.StatusOK, map[string]any{"results": results})
	})
}

func describeTargets(targets []netprobe.Target) string {
	endpoints := make([]string, len(targets))
	for index, target := range targets {
		endpoints[index] = net.JoinHostPort(target.Host, strconv.Itoa(target.Port))
	}
	return strings.Join(endpoints, ", ")
}
