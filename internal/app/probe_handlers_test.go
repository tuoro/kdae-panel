package app

import (
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/tuoro/kdae-panel/internal/netprobe"
)

type probeResponse struct {
	Results []struct {
		Host      string    `json:"host"`
		Port      int       `json:"port"`
		LatencyMs float64   `json:"latencyMs"`
		Error     string    `json:"error"`
		ProbedAt  time.Time `json:"probedAt"`
		Cached    bool      `json:"cached"`
	} `json:"results"`
}

func newProbeApplication(t *testing.T, prober ProbeService) *App {
	t.Helper()
	application, err := NewWithDependencies(
		Config{Version: "test-panel"},
		slog.New(slog.NewTextHandler(io.Discard, nil)),
		Dependencies{Dae: stubDaeService{}, Probe: prober},
	)
	if err != nil {
		t.Fatal(err)
	}
	return application
}

func postProbe(t *testing.T, application *App, body string) probeResponse {
	t.Helper()
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, httptest.NewRequest(http.MethodPost, "/api/v1/net/latency", strings.NewReader(body)))
	if recorder.Code != http.StatusOK {
		t.Fatalf("状态码 = %d，响应 = %s", recorder.Code, recorder.Body.String())
	}
	var response probeResponse
	if err := json.NewDecoder(recorder.Body).Decode(&response); err != nil {
		t.Fatal(err)
	}
	return response
}

// 编排页那个"测试入口延迟"按钮是用户的显式动作，不带 maxAgeSeconds，
// 必须每次都真实发包——缓存绝不能悄悄接管它。
func TestLatencyProbeWithoutMaxAgeAlwaysProbes(t *testing.T) {
	prober := &stubProbeService{results: []netprobe.Result{{Host: "hk1.example.com", Port: 443, Reachable: true, LatencyMs: 42}}}
	application := newProbeApplication(t, prober)
	body := `{"targets":[{"host":"hk1.example.com","port":443}]}`
	for round := 1; round <= 3; round++ {
		response := postProbe(t, application, body)
		if len(response.Results) != 1 || response.Results[0].Cached {
			t.Fatalf("第 %d 次不该命中缓存: %+v", round, response.Results)
		}
		if prober.calls != round {
			t.Fatalf("第 %d 次后实际探测次数 = %d，want %d", round, prober.calls, round)
		}
	}
}

func TestLatencyProbeReusesResultWithinMaxAge(t *testing.T) {
	prober := &stubProbeService{results: []netprobe.Result{{Host: "hk1.example.com", Port: 443, Reachable: true, LatencyMs: 42}}}
	application := newProbeApplication(t, prober)
	body := `{"targets":[{"host":"hk1.example.com","port":443}],"maxAgeSeconds":300}`

	first := postProbe(t, application, body)
	if first.Results[0].Cached || first.Results[0].LatencyMs != 42 {
		t.Fatalf("首次应当是实测: %+v", first.Results)
	}
	if first.Results[0].ProbedAt.IsZero() {
		t.Fatal("必须给出探测时刻，否则页面无法如实显示这个值多旧")
	}

	second := postProbe(t, application, body)
	if !second.Results[0].Cached || second.Results[0].LatencyMs != 42 {
		t.Fatalf("窗口内第二次应当复用缓存: %+v", second.Results)
	}
	if !second.Results[0].ProbedAt.Equal(first.Results[0].ProbedAt) {
		t.Fatal("复用缓存时探测时刻必须是原来那次的，不能刷成现在")
	}
	if prober.calls != 1 {
		t.Fatalf("实际探测次数 = %d，want 1", prober.calls)
	}
}

// dae 在 min_moving_avg 下会自己切节点。换了节点就是换了目标，必须重新探，
// 否则会把旧节点的延迟安在新节点头上。
func TestLatencyProbeChangedTargetBypassesCache(t *testing.T) {
	prober := &stubProbeService{results: []netprobe.Result{{Host: "hk1.example.com", Port: 443, LatencyMs: 42, Reachable: true}}}
	application := newProbeApplication(t, prober)
	postProbe(t, application, `{"targets":[{"host":"hk1.example.com","port":443}],"maxAgeSeconds":300}`)

	prober.results = []netprobe.Result{{Host: "jp2.example.com", Port: 443, LatencyMs: 118, Reachable: true}}
	switched := postProbe(t, application, `{"targets":[{"host":"jp2.example.com","port":443}],"maxAgeSeconds":300}`)
	if switched.Results[0].Cached || switched.Results[0].LatencyMs != 118 {
		t.Fatalf("换节点后必须重新探测: %+v", switched.Results)
	}
	if prober.calls != 2 {
		t.Fatalf("实际探测次数 = %d，want 2", prober.calls)
	}
}

// 混合命中：只有没缓存的那些应该进入 Probe，审计日志也只该记这些。
func TestLatencyProbeOnlyProbesUncachedTargets(t *testing.T) {
	prober := &stubProbeService{results: []netprobe.Result{{Host: "hk1.example.com", Port: 443, LatencyMs: 42, Reachable: true}}}
	var logs strings.Builder
	application, err := NewWithDependencies(
		Config{Version: "test-panel"},
		slog.New(slog.NewTextHandler(&logs, nil)),
		Dependencies{Dae: stubDaeService{}, Probe: prober},
	)
	if err != nil {
		t.Fatal(err)
	}
	postProbe(t, application, `{"targets":[{"host":"hk1.example.com","port":443}],"maxAgeSeconds":300}`)

	prober.results = []netprobe.Result{{Host: "jp2.example.com", Port: 443, LatencyMs: 118, Reachable: true}}
	logs.Reset()
	mixed := postProbe(t, application, `{"targets":[{"host":"hk1.example.com","port":443},{"host":"jp2.example.com","port":443}],"maxAgeSeconds":300}`)
	if len(mixed.Results) != 2 {
		t.Fatalf("结果条数 = %d，want 2", len(mixed.Results))
	}
	if !mixed.Results[0].Cached || mixed.Results[0].Host != "hk1.example.com" {
		t.Fatalf("第一条应当命中缓存并保持入参顺序: %+v", mixed.Results)
	}
	if mixed.Results[1].Cached || mixed.Results[1].Host != "jp2.example.com" || mixed.Results[1].LatencyMs != 118 {
		t.Fatalf("第二条应当是新探测的: %+v", mixed.Results)
	}
	if len(prober.targets) != 1 || prober.targets[0].Host != "jp2.example.com" {
		t.Fatalf("只该探没缓存的那个，实际 = %+v", prober.targets)
	}
	// 命中缓存没有产生任何出站连接，不能记进审计日志谎报面板的对外行为。
	if audit := logs.String(); strings.Contains(audit, "hk1.example.com") {
		t.Fatalf("审计日志记录了没有真正探测的目标: %s", audit)
	}
}

func TestLatencyProbeCachePreservesInputOrderWithDuplicates(t *testing.T) {
	prober := &stubProbeService{results: []netprobe.Result{{Host: "hk1.example.com", Port: 443, LatencyMs: 42, Reachable: true}}}
	application := newProbeApplication(t, prober)
	response := postProbe(t, application,
		`{"targets":[{"host":"hk1.example.com","port":443},{"host":"hk1.example.com","port":443}],"maxAgeSeconds":300}`)
	if len(response.Results) != 2 {
		t.Fatalf("重复目标也要逐条回填，条数 = %d", len(response.Results))
	}
	if response.Results[0].LatencyMs != 42 || response.Results[1].LatencyMs != 42 {
		t.Fatalf("重复目标应共享同一条结果: %+v", response.Results)
	}
	if len(prober.targets) != 1 {
		t.Fatalf("重复目标只该探一次，实际 = %+v", prober.targets)
	}
}

func TestLatencyProbeRejectsInvalidMaxAge(t *testing.T) {
	application := newProbeApplication(t, &stubProbeService{})
	for _, body := range []string{
		`{"targets":[{"host":"a.example.com","port":443}],"maxAgeSeconds":-1}`,
		`{"targets":[{"host":"a.example.com","port":443}],"maxAgeSeconds":86401}`,
	} {
		recorder := httptest.NewRecorder()
		application.Handler().ServeHTTP(recorder, httptest.NewRequest(http.MethodPost, "/api/v1/net/latency", strings.NewReader(body)))
		if recorder.Code != http.StatusBadRequest {
			t.Fatalf("body=%s 状态码 = %d，响应 = %s", body, recorder.Code, recorder.Body.String())
		}
	}
}

// 整批命中缓存时也不能绕过数量上限，否则缓存成了限额的后门。
func TestLatencyProbeEnforcesMaxTargetsBeforeCache(t *testing.T) {
	application := newProbeApplication(t, &stubProbeService{})
	targets := make([]string, netprobe.MaxTargets+1)
	for index := range targets {
		targets[index] = `{"host":"node.example.com","port":443}`
	}
	body := `{"targets":[` + strings.Join(targets, ",") + `],"maxAgeSeconds":300}`
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, httptest.NewRequest(http.MethodPost, "/api/v1/net/latency", strings.NewReader(body)))
	if recorder.Code != http.StatusBadRequest {
		t.Fatalf("状态码 = %d，响应 = %s", recorder.Code, recorder.Body.String())
	}
}

func TestProbeCacheEvictsOldestBeyondCapacity(t *testing.T) {
	cache := &probeCache{entries: make(map[string]probeCacheEntry), capacity: 2}
	base := time.Date(2026, 9, 7, 12, 0, 0, 0, time.UTC)
	cache.store([]netprobe.Result{{Host: "old.example.com", Port: 443}}, base)
	cache.store([]netprobe.Result{{Host: "mid.example.com", Port: 443}}, base.Add(time.Minute))
	cache.store([]netprobe.Result{{Host: "new.example.com", Port: 443}}, base.Add(2*time.Minute))
	if len(cache.entries) != 2 {
		t.Fatalf("容量 2 时条目数 = %d", len(cache.entries))
	}
	if _, ok := cache.entries[probeCacheKey("old.example.com", 443)]; ok {
		t.Fatal("应当淘汰最旧的条目")
	}
}

func TestProbeCacheKeyIsHostCaseInsensitive(t *testing.T) {
	if probeCacheKey("HK1.Example.COM", 443) != probeCacheKey("hk1.example.com", 443) {
		t.Fatal("主机名应当大小写不敏感，否则同一个节点会被重复探测")
	}
}
