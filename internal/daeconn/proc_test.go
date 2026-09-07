package daeconn

import (
	"context"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

func TestParseHexAddrPort(t *testing.T) {
	for input, want := range map[string]string{
		"0100007F:1F90":                         "127.0.0.1:8080",
		"00000000000000000000000001000000:01BB": "[::1]:443",
		"0000000000000000FFFF00000100007F:0035": "127.0.0.1:53",
	} {
		got, ok := parseHexAddrPort(input)
		if !ok || got.String() != want {
			t.Fatalf("parseHexAddrPort(%q) = %q, %v，期望 %q", input, got, ok, want)
		}
	}
	for _, input := range []string{"", "broken", "0100007F:xxxx", "01:0001"} {
		if got, ok := parseHexAddrPort(input); ok {
			t.Fatalf("非法地址 %q 被解析为 %s", input, got)
		}
	}
}

func TestProcSnapshotterGroupsOutboundEndpointsAndCaches(t *testing.T) {
	root := t.TempDir()
	if err := os.MkdirAll(filepath.Join(root, "42", "fd"), 0o700); err != nil {
		t.Fatal(err)
	}
	if err := os.MkdirAll(filepath.Join(root, "net"), 0o700); err != nil {
		t.Fatal(err)
	}
	links := map[string]string{"1": "socket:[111]", "2": "socket:[112]", "3": "socket:[113]", "4": "socket:[222]"}
	for name := range links {
		if err := os.WriteFile(filepath.Join(root, "42", "fd", name), nil, 0o600); err != nil {
			t.Fatal(err)
		}
	}
	tcp := strings.Join([]string{
		"sl local_address rem_address st tx_queue tr tm->when retrnsmt uid timeout inode",
		"0: 0201A8C0:9C40 08080808:01BB 01 0:0 00:0 0 0 0 111",
		"1: 0201A8C0:9C41 08080808:01BB 01 0:0 00:0 0 0 0 112",
		"2: 0201A8C0:9C42 01010101:0050 01 0:0 00:0 0 0 0 113",
		"3: 0100007F:0001 0100007F:0002 01 0:0 00:0 0 0 0 999",
	}, "\n") + "\n"
	udp := "sl local_address rem_address st tx_queue tr tm->when retrnsmt uid timeout inode\n" +
		"0: 00000000:0035 00000000:0000 07 0:0 00:0 0 0 0 222\n"
	writeProcTable(t, root, "tcp", tcp)
	writeProcTable(t, root, "tcp6", "header\n")
	writeProcTable(t, root, "udp", udp)
	writeProcTable(t, root, "udp6", "header\n")

	now := time.Date(2026, 8, 2, 12, 0, 0, 0, time.UTC)
	snapshotter := NewProcSnapshotter()
	snapshotter.procRoot = root
	snapshotter.now = func() time.Time { return now }
	snapshotter.readlink = func(path string) (string, error) {
		return links[filepath.Base(path)], nil
	}

	snapshot, err := snapshotter.Snapshot(context.Background(), 42)
	if err != nil {
		t.Fatal(err)
	}
	if snapshot.OutboundTCP != 3 || snapshot.UDPSockets != 1 || snapshot.SampledTCPPeak != 3 || snapshot.SampledUDPPeak != 1 ||
		snapshot.Endpoints["8.8.8.8:443"] != 2 || snapshot.Endpoints["1.1.1.1:80"] != 1 {
		t.Fatalf("快照统计异常: %+v", snapshot)
	}

	writeProcTable(t, root, "tcp", "header\n")
	cached, err := snapshotter.Snapshot(context.Background(), 42)
	if err != nil || cached.OutboundTCP != 3 {
		t.Fatalf("缓存未复用: %+v, %v", cached, err)
	}
	now = now.Add(defaultCacheTTL + time.Millisecond)
	refreshed, err := snapshotter.Snapshot(context.Background(), 42)
	if err != nil || refreshed.OutboundTCP != 0 || refreshed.SampledTCPPeak != 3 || refreshed.SampledUDPPeak != 1 {
		t.Fatalf("缓存过期后未重新采集: %+v, %v", refreshed, err)
	}
	writeProcTable(t, root, "udp", "header\n")
	now = now.Add(RecentSampleWindow + time.Millisecond)
	expired, err := snapshotter.Snapshot(context.Background(), 42)
	if err != nil || expired.SampledTCPPeak != 0 || expired.SampledUDPPeak != 0 {
		t.Fatalf("过期采样仍计入峰值: %+v, %v", expired, err)
	}
}

func TestProcSnapshotterCapsEndpointGroupsWithoutLosingSocketCount(t *testing.T) {
	root := t.TempDir()
	if err := os.MkdirAll(filepath.Join(root, "7", "fd"), 0o700); err != nil {
		t.Fatal(err)
	}
	if err := os.MkdirAll(filepath.Join(root, "net"), 0o700); err != nil {
		t.Fatal(err)
	}
	for _, name := range []string{"1", "2"} {
		if err := os.WriteFile(filepath.Join(root, "7", "fd", name), nil, 0o600); err != nil {
			t.Fatal(err)
		}
	}
	writeProcTable(t, root, "tcp", "header\n0: 0100007F:1 01010101:1 01 0:0 0:0 0 0 0 1\n1: 0100007F:2 02020202:2 01 0:0 0:0 0 0 0 2\n")
	for _, name := range []string{"tcp6", "udp", "udp6"} {
		writeProcTable(t, root, name, "header\n")
	}
	snapshotter := NewProcSnapshotter()
	snapshotter.procRoot = root
	snapshotter.maxEndpoints = 1
	snapshotter.readlink = func(path string) (string, error) { return "socket:[" + filepath.Base(path) + "]", nil }
	snapshot, err := snapshotter.Snapshot(context.Background(), 7)
	if err != nil {
		t.Fatal(err)
	}
	if snapshot.OutboundTCP != 2 || len(snapshot.Endpoints) != 1 || !snapshot.Truncated {
		t.Fatalf("端点上限未正确执行: %+v", snapshot)
	}
}

func TestProcSnapshotterClearsSampledPeakWhenPIDChanges(t *testing.T) {
	now := time.Date(2026, 8, 2, 12, 0, 0, 0, time.UTC)
	snapshotter := NewProcSnapshotter()
	snapshotter.now = func() time.Time { return now }
	snapshotter.cachedPID = 42
	snapshotter.observed = []socketObservation{{at: now, tcp: 8, udp: 3}}

	snapshot, err := snapshotter.Snapshot(context.Background(), 0)
	if err != nil {
		t.Fatal(err)
	}
	if snapshot.SampledTCPPeak != 0 || snapshot.SampledUDPPeak != 0 {
		t.Fatalf("旧 dae PID 的峰值泄漏到停止状态: %+v", snapshot)
	}
}

func writeProcTable(t *testing.T, root, name, content string) {
	t.Helper()
	if err := os.WriteFile(filepath.Join(root, "net", name), []byte(content), 0o600); err != nil {
		t.Fatal(err)
	}
}

// 端点必须跨采样窗口累积。单次点采样几乎抓不到 dae 的 socket，只报本次采样
// 的端点集合会让端点列表长期为空——那不是"没有出站"，是"这一瞬没抓到"。
func TestProcSnapshotterMergesEndpointsAcrossSampleWindow(t *testing.T) {
	now := time.Date(2026, 9, 7, 12, 0, 0, 0, time.UTC)
	snapshotter := NewProcSnapshotter()
	snapshotter.now = func() time.Time { return now }
	snapshotter.cachedPID = 42
	// observed 由 Snapshot 按时间追加，最旧的在头部——淘汰循环依赖这个不变量
	snapshotter.observed = []socketObservation{
		// 早于 30 秒窗口，必须被淘汰
		{at: now.Add(-90 * time.Second), tcp: 9, udp: 9, endpoints: map[string]int{"198.51.100.9:443": 9}},
		{at: now.Add(-20 * time.Second), tcp: 3, udp: 0, endpoints: map[string]int{"203.0.113.1:443": 3}},
		{at: now.Add(-10 * time.Second), tcp: 1, udp: 0, endpoints: map[string]int{"203.0.113.1:443": 1, "203.0.113.2:443": 1}},
	}

	merged := snapshotter.withSampledPeaks(Snapshot{Endpoints: map[string]int{}}, now)
	if len(merged.Endpoints) != 2 {
		t.Fatalf("端点数 = %d，want 2（窗口外的那个应被淘汰）: %+v", len(merged.Endpoints), merged.Endpoints)
	}
	// 同一端点取窗口内的采样峰值，与 SampledTCPPeak 同一口径
	if merged.Endpoints["203.0.113.1:443"] != 3 {
		t.Fatalf("同一端点应取采样峰值，得到 %d", merged.Endpoints["203.0.113.1:443"])
	}
	if _, leaked := merged.Endpoints["198.51.100.9:443"]; leaked {
		t.Fatal("窗口外的端点泄漏进了结果")
	}
	if merged.SampledTCPPeak != 3 {
		t.Fatalf("TCP 峰值 = %d，want 3", merged.SampledTCPPeak)
	}
}

// 合并不能改动传入快照自己的 map：它可能是缓存里那一份，会被后续调用复用。
func TestProcSnapshotterMergeDoesNotMutateInput(t *testing.T) {
	now := time.Date(2026, 9, 7, 12, 0, 0, 0, time.UTC)
	snapshotter := NewProcSnapshotter()
	snapshotter.now = func() time.Time { return now }
	snapshotter.observed = []socketObservation{
		{at: now, tcp: 1, endpoints: map[string]int{"203.0.113.2:443": 1}},
	}
	original := map[string]int{"203.0.113.1:443": 2}
	snapshotter.withSampledPeaks(Snapshot{Endpoints: original}, now)
	if len(original) != 1 {
		t.Fatalf("传入的端点 map 被改动了: %+v", original)
	}
}
