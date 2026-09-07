package daeconn

import (
	"bufio"
	"context"
	"encoding/binary"
	"encoding/hex"
	"fmt"
	"net/netip"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"time"
)

const (
	tcpEstablished = "01"
	// 缓存主要用于合并并发标签页的扫描，而不是限制采样率：快照端点按秒轮询，
	// 两秒的缓存会让一半的轮询拿到旧样本，采样窗口里的样本数直接减半。
	// 取 800ms，既能让 1 秒轮询基本每次都拿到新样本，多开标签页时每秒也不会
	// 超过约一次 /proc 扫描。
	defaultCacheTTL     = 800 * time.Millisecond
	defaultMaxEndpoints = 200
	// RecentSampleWindow 是同一 dae PID 的离散 socket 样本保留窗口。
	RecentSampleWindow = 30 * time.Second
)

// Snapshot 是 dae 进程在某一时刻持有的 socket 概况。这里只能看到 dae
// 自己持有的 userspace socket，不能据此判断任一客户端连接是否仍然存活。
type Snapshot struct {
	TakenAt        time.Time
	OutboundTCP    int
	UDPSockets     int
	SampledTCPPeak int
	SampledUDPPeak int
	Endpoints      map[string]int
	Truncated      bool
}

type socketObservation struct {
	at        time.Time
	tcp       int
	udp       int
	endpoints map[string]int
}

// Snapshotter 提供可注入的连接快照接口。
type Snapshotter interface {
	Snapshot(ctx context.Context, mainPID int) (Snapshot, error)
}

// ProcSnapshotter 从 Linux procfs 采集 dae 持有的 socket，并短暂缓存结果，
// 避免多个浏览器标签页同时触发完整扫描。
type ProcSnapshotter struct {
	procRoot     string
	cacheTTL     time.Duration
	maxEndpoints int
	now          func() time.Time
	readDir      func(string) ([]os.DirEntry, error)
	readlink     func(string) (string, error)

	mu        sync.Mutex
	cachedAt  time.Time
	cachedPID int
	cached    Snapshot
	cachedErr error
	observed  []socketObservation
}

func NewProcSnapshotter() *ProcSnapshotter {
	return &ProcSnapshotter{
		procRoot:     "/proc",
		cacheTTL:     defaultCacheTTL,
		maxEndpoints: defaultMaxEndpoints,
		now:          time.Now,
		readDir:      os.ReadDir,
		readlink:     os.Readlink,
	}
}

func (snapshotter *ProcSnapshotter) Snapshot(ctx context.Context, mainPID int) (Snapshot, error) {
	snapshotter.mu.Lock()
	defer snapshotter.mu.Unlock()
	now := snapshotter.now()
	if snapshotter.cachedPID != mainPID {
		snapshotter.observed = nil
	}
	cacheAge := now.Sub(snapshotter.cachedAt)
	if snapshotter.cachedPID == mainPID && !snapshotter.cachedAt.IsZero() && cacheAge >= 0 && cacheAge < snapshotter.cacheTTL {
		return snapshotter.withSampledPeaks(snapshotter.cached, now), snapshotter.cachedErr
	}
	snapshot, err := snapshotter.take(ctx, mainPID, now.UTC())
	snapshotter.cachedAt, snapshotter.cachedPID = now, mainPID
	snapshotter.cached, snapshotter.cachedErr = snapshot, err
	if err == nil {
		snapshotter.observed = append(snapshotter.observed, socketObservation{
			at: now, tcp: snapshot.OutboundTCP, udp: snapshot.UDPSockets, endpoints: snapshot.Endpoints,
		})
	}
	return snapshotter.withSampledPeaks(snapshot, now), err
}

func (snapshotter *ProcSnapshotter) withSampledPeaks(snapshot Snapshot, now time.Time) Snapshot {
	cutoff := now.Add(-RecentSampleWindow)
	for len(snapshotter.observed) > 0 && snapshotter.observed[0].at.Before(cutoff) {
		snapshotter.observed = snapshotter.observed[1:]
	}
	// 端点和峰值用同一个窗口累积。单次点采样几乎抓不到 dae 的 socket——直连走
	// eBPF 不产生 userspace socket，代理短连接在两次采样之间生灭——所以只报本次
	// 采样的端点集合，结果长期是空的。取窗口内每个端点的采样峰值才有可能非空。
	// 不修改传入快照自己的 map：它可能是缓存里那一份，会被后续调用复用。
	merged := make(map[string]int, len(snapshot.Endpoints))
	for address, count := range snapshot.Endpoints {
		merged[address] = count
	}
	for _, observation := range snapshotter.observed {
		snapshot.SampledTCPPeak = max(snapshot.SampledTCPPeak, observation.tcp)
		snapshot.SampledUDPPeak = max(snapshot.SampledUDPPeak, observation.udp)
		for address, count := range observation.endpoints {
			if current, exists := merged[address]; exists {
				merged[address] = max(current, count)
				continue
			}
			if len(merged) >= snapshotter.maxEndpoints {
				snapshot.Truncated = true
				continue
			}
			merged[address] = count
		}
	}
	snapshot.Endpoints = merged
	return snapshot
}

func (snapshotter *ProcSnapshotter) take(ctx context.Context, mainPID int, takenAt time.Time) (Snapshot, error) {
	snapshot := Snapshot{TakenAt: takenAt, Endpoints: make(map[string]int)}
	if mainPID <= 0 {
		return snapshot, nil
	}
	inodes, err := snapshotter.socketInodes(mainPID)
	if err != nil {
		return Snapshot{}, fmt.Errorf("枚举 dae 进程 socket: %w", err)
	}
	for _, name := range []string{"tcp", "tcp6"} {
		err := snapshotter.scanTable(ctx, name, func(fields []string) {
			if fields[3] != tcpEstablished {
				return
			}
			if _, held := inodes[fields[9]]; !held {
				return
			}
			snapshot.OutboundTCP++
			remote, valid := parseHexAddrPort(fields[2])
			if !valid {
				return
			}
			endpoint := remote.String()
			if _, exists := snapshot.Endpoints[endpoint]; !exists && len(snapshot.Endpoints) >= snapshotter.maxEndpoints {
				snapshot.Truncated = true
				return
			}
			snapshot.Endpoints[endpoint]++
		})
		if err != nil && !os.IsNotExist(err) {
			return Snapshot{}, err
		}
	}
	for _, name := range []string{"udp", "udp6"} {
		err := snapshotter.scanTable(ctx, name, func(fields []string) {
			if _, held := inodes[fields[9]]; held {
				snapshot.UDPSockets++
			}
		})
		if err != nil && !os.IsNotExist(err) {
			return Snapshot{}, err
		}
	}
	return snapshot, nil
}

func (snapshotter *ProcSnapshotter) socketInodes(pid int) (map[string]struct{}, error) {
	directory := filepath.Join(snapshotter.procRoot, strconv.Itoa(pid), "fd")
	entries, err := snapshotter.readDir(directory)
	if err != nil {
		return nil, err
	}
	inodes := make(map[string]struct{}, len(entries))
	for _, entry := range entries {
		target, err := snapshotter.readlink(filepath.Join(directory, entry.Name()))
		if err != nil {
			continue
		}
		if inode, socket := strings.CutPrefix(target, "socket:["); socket && strings.HasSuffix(inode, "]") {
			inodes[strings.TrimSuffix(inode, "]")] = struct{}{}
		}
	}
	return inodes, nil
}

// scanTable 流式扫描一张 /proc/net socket 表。只有至少十列的行才交给回调，
// 调用方可先按 inode 过滤，再承担地址解析成本。
func (snapshotter *ProcSnapshotter) scanTable(ctx context.Context, name string, visit func([]string)) error {
	path := filepath.Join(snapshotter.procRoot, "net", name)
	file, err := os.Open(path)
	if err != nil {
		return err
	}
	defer func() { _ = file.Close() }()
	scanner := bufio.NewScanner(file)
	scanner.Buffer(make([]byte, 64*1024), 1<<20)
	for line := 0; scanner.Scan(); line++ {
		if line == 0 {
			continue
		}
		if line%256 == 0 {
			if err := ctx.Err(); err != nil {
				return err
			}
		}
		fields := strings.Fields(scanner.Text())
		if len(fields) >= 10 {
			visit(fields)
		}
	}
	if err := scanner.Err(); err != nil {
		return fmt.Errorf("读取 %s: %w", path, err)
	}
	return ctx.Err()
}

func parseHexAddrPort(value string) (netip.AddrPort, bool) {
	addressPart, portPart, found := strings.Cut(value, ":")
	if !found {
		return netip.AddrPort{}, false
	}
	port, err := strconv.ParseUint(portPart, 16, 16)
	if err != nil {
		return netip.AddrPort{}, false
	}
	raw, err := hex.DecodeString(addressPart)
	if err != nil || len(raw) != 4 && len(raw) != 16 {
		return netip.AddrPort{}, false
	}
	for offset := 0; offset < len(raw); offset += 4 {
		binary.BigEndian.PutUint32(raw[offset:offset+4], binary.NativeEndian.Uint32(raw[offset:offset+4]))
	}
	address, ok := netip.AddrFromSlice(raw)
	if !ok {
		return netip.AddrPort{}, false
	}
	return netip.AddrPortFrom(address.Unmap(), uint16(port)), true
}
