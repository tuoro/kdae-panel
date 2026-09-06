package app

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/tuoro/kdae-panel/internal/auth"
	"github.com/tuoro/kdae-panel/internal/configstore"
	"github.com/tuoro/kdae-panel/internal/dae"
	"github.com/tuoro/kdae-panel/internal/daeconn"
	"github.com/tuoro/kdae-panel/internal/daeinstall"
	"github.com/tuoro/kdae-panel/internal/host"
	"github.com/tuoro/kdae-panel/internal/upstream"
)

type stubConnectionSnapshotter struct {
	snapshot daeconn.Snapshot
	err      error
	pid      int
}

func (snapshotter *stubConnectionSnapshotter) Snapshot(_ context.Context, pid int) (daeconn.Snapshot, error) {
	snapshotter.pid = pid
	return snapshotter.snapshot, snapshotter.err
}

func TestConnectionsEndpoint(t *testing.T) {
	timestamp := time.Now().UTC().Add(-time.Minute)
	hostService := &stubHostService{
		status: host.Status{MainPID: 42, ActiveState: "active"},
		logs: []host.LogEntry{
			{
				Timestamp: timestamp,
				Message:   `level=info msg="192.0.2.2:1234 <-> example.com:443" ip=203.0.113.1:443 sniffed=Example.COM. network=tcp4 outbound=proxy dialer=tokyo mac=02:00:00:00:00:01`,
			},
			{
				Timestamp: timestamp.Add(-time.Minute),
				Message:   `level=info msg="192.0.2.1:1235 <-> example.com:443" ip=203.0.113.1:443 network=tcp4 outbound=proxy dialer=tokyo mac=02:00:00:00:00:01`,
			},
		},
	}
	snapshotter := &stubConnectionSnapshotter{snapshot: daeconn.Snapshot{
		TakenAt:        timestamp.Add(time.Second),
		OutboundTCP:    2,
		UDPSockets:     1,
		SampledTCPPeak: 4,
		SampledUDPPeak: 2,
		Endpoints:      map[string]int{"203.0.113.9:443": 1, "203.0.113.8:443": 3},
	}}
	application, err := NewWithDependencies(Config{Version: "test"}, slog.New(slog.NewTextHandler(io.Discard, nil)), Dependencies{
		Dae:           stubDaeService{},
		Host:          hostService,
		Configuration: stubConfigurationService{document: configstore.Document{Content: "global { log_level: warn }"}},
		Connections:   snapshotter,
	})
	if err != nil {
		t.Fatal(err)
	}

	request := httptest.NewRequest(http.MethodGet, "/api/v1/connections?limit=100&window=15", nil)
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, request)
	if recorder.Code != http.StatusOK {
		t.Fatalf("状态码 = %d，响应 = %s", recorder.Code, recorder.Body.String())
	}
	var response connectionsResponse
	if err := json.NewDecoder(recorder.Body).Decode(&response); err != nil {
		t.Fatal(err)
	}
	if snapshotter.pid != 42 || !response.SnapshotOK || !response.ServiceRunning ||
		response.SocketWindowSeconds != int(daeconn.RecentSampleWindow/time.Second) || !response.LogsOK || response.LogLevel != "warn" ||
		response.RequiredLogLevel != connectionInfoLogLevel ||
		response.Summary.OutboundTCP != 2 || response.Summary.UDPSockets != 1 ||
		response.Summary.SampledTCPPeak != 4 || response.Summary.SampledUDPPeak != 2 || response.Summary.WindowEvents != 2 ||
		response.Summary.WindowClients != 1 || response.Summary.WindowTargets != 1 {
		t.Fatalf("响应概况异常: %+v, pid=%d", response, snapshotter.pid)
	}
	if len(response.Endpoints) != 2 || response.Endpoints[0].Address != "203.0.113.8:443" || response.Endpoints[0].Count != 3 {
		t.Fatalf("端点分布异常: %+v", response.Endpoints)
	}
	if len(response.Entries) != 2 || response.Entries[0].Outbound != "proxy" {
		t.Fatalf("响应记录异常: %+v", response.Entries)
	}
	if len(response.Facets.Targets) != 1 || response.Facets.Targets[0].Label != "example.com" || response.Facets.Targets[0].Count != 2 {
		t.Fatalf("目标分布异常: %+v", response.Facets.Targets)
	}
	if len(response.Facets.Clients) != 1 || response.Facets.Clients[0].Label != "192.0.2.2" ||
		response.Facets.Clients[0].Note != "02:00:00:00:00:01" || response.Facets.Clients[0].Count != 2 {
		t.Fatalf("客户端未按 MAC 合并或没有保留最新 IP: %+v", response.Facets.Clients)
	}
	if len(response.Facets.Nodes) != 1 || response.Facets.Nodes[0].Label != "tokyo" || response.Facets.Nodes[0].Count != 2 ||
		len(response.Facets.Groups) != 1 || response.Facets.Groups[0].Label != "proxy" || response.Facets.Groups[0].Count != 2 {
		t.Fatalf("路由分布异常: nodes=%+v groups=%+v", response.Facets.Nodes, response.Facets.Groups)
	}
}

func TestConnectionsEndpointAcceptsCurrentKdaeDebugEvents(t *testing.T) {
	timestamp := time.Now().UTC().Add(-time.Minute)
	hostService := &stubHostService{
		status: host.Status{MainPID: 42, ActiveState: "active"},
		logs: []host.LogEntry{
			{
				Timestamp: timestamp,
				PID:       "42",
				Message:   `level=debug msg="192.0.2.2:1234 <-> example.com:443" ip=203.0.113.1:443 network=tcp4 outbound=proxy dialer=tokyo`,
			},
			{
				Timestamp: timestamp.Add(-time.Second),
				PID:       "41",
				Message:   `level=debug msg="192.0.2.3:1235 <-> stale.example:443" ip=203.0.113.2:443 network=tcp4 outbound=proxy dialer=tokyo`,
			},
		},
	}
	application, err := NewWithDependencies(Config{}, slog.New(slog.NewTextHandler(io.Discard, nil)), Dependencies{
		Dae: stubDaeService{report: dae.Report{
			Available: true,
			Version:   "dae version unstable-20260825.r1148.502d97",
		}},
		Host:          hostService,
		Configuration: stubConfigurationService{document: configstore.Document{Content: "global { log_level: info }"}},
		Connections:   &stubConnectionSnapshotter{snapshot: daeconn.Snapshot{Endpoints: map[string]int{}}},
	})
	if err != nil {
		t.Fatal(err)
	}
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, httptest.NewRequest(http.MethodGet, "/api/v1/connections", nil))
	if recorder.Code != http.StatusOK {
		t.Fatalf("状态码 = %d，响应 = %s", recorder.Code, recorder.Body.String())
	}
	var response connectionsResponse
	if err := json.NewDecoder(recorder.Body).Decode(&response); err != nil {
		t.Fatal(err)
	}
	if response.RequiredLogLevel != connectionDebugLogLevel || len(response.Entries) != 1 ||
		response.Entries[0].Target != "example.com:443" {
		t.Fatalf("新版 kdae debug 连接流水处理异常: %+v", response)
	}
}

func TestConnectionLogLevelFor(t *testing.T) {
	matchingVersion := "dae version unstable-20260830.r1155.ea50cdf"
	tests := []struct {
		name      string
		version   string
		state     *daeinstall.State
		wantLevel string
	}{
		{name: "官方稳定版", version: "dae version v0.10.0", wantLevel: connectionInfoLogLevel},
		{
			name: "旧版 kdae", version: "dae version unstable-20260824.r1147.bba4dca",
			state:     &daeinstall.State{Source: upstream.SourceKdae, Version: "dae version unstable-20260824.r1147.bba4dca"},
			wantLevel: connectionInfoLogLevel,
		},
		{
			name: "首个变更提交无需旧账本", version: "dae version unstable-20260825.r1148.502d97",
			wantLevel: connectionDebugLogLevel,
		},
		{
			name: "面板管理的后续 kdae", version: matchingVersion,
			state:     &daeinstall.State{Source: upstream.SourceKdae, Version: matchingVersion},
			wantLevel: connectionDebugLogLevel,
		},
		{
			name: "后续 kdae 可按提交核对", version: matchingVersion,
			state:     &daeinstall.State{Source: upstream.SourceKdae, Label: "ea50cdf"},
			wantLevel: connectionDebugLogLevel,
		},
		{name: "无来源账本的后续构建", version: matchingVersion, wantLevel: connectionInfoLogLevel},
		{
			name: "官方来源不能凭 revision 开启", version: matchingVersion,
			state:     &daeinstall.State{Source: upstream.SourceOfficial, Version: matchingVersion},
			wantLevel: connectionInfoLogLevel,
		},
		{
			name: "运行版本与账本不一致", version: matchingVersion,
			state:     &daeinstall.State{Source: upstream.SourceKdae, Version: "dae version unstable-20260829.r1154.deadbee", Label: "deadbee"},
			wantLevel: connectionInfoLogLevel,
		},
		{name: "畸形版本", version: "dae version unstable-r1155.not-hex", wantLevel: connectionInfoLogLevel},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			level := connectionLogLevelFor(test.version, test.state)
			if level != test.wantLevel {
				t.Fatalf("级别 = %q, want %q", level, test.wantLevel)
			}
		})
	}
}

func TestConnectionsEndpointDistinguishesStoppedServiceFromEmptySnapshot(t *testing.T) {
	snapshotter := &stubConnectionSnapshotter{snapshot: daeconn.Snapshot{Endpoints: map[string]int{}}}
	application, err := NewWithDependencies(Config{}, slog.New(slog.NewTextHandler(io.Discard, nil)), Dependencies{
		Dae: stubDaeService{}, Host: &stubHostService{status: host.Status{}}, Connections: snapshotter,
	})
	if err != nil {
		t.Fatal(err)
	}
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, httptest.NewRequest(http.MethodGet, "/api/v1/connections", nil))
	var response connectionsResponse
	if err := json.NewDecoder(recorder.Body).Decode(&response); err != nil {
		t.Fatal(err)
	}
	if recorder.Code != http.StatusOK || response.ServiceRunning || !response.SnapshotOK || snapshotter.pid != 0 {
		t.Fatalf("停止状态被误报为实时零连接: status=%d response=%+v pid=%d", recorder.Code, response, snapshotter.pid)
	}
}

func TestConnectionsEndpointRejectsInvalidLimit(t *testing.T) {
	application, err := NewWithDependencies(Config{}, slog.New(slog.NewTextHandler(io.Discard, nil)), Dependencies{
		Dae:  stubDaeService{},
		Host: &stubHostService{},
	})
	if err != nil {
		t.Fatal(err)
	}
	for _, value := range []string{"0", "2001", "invalid"} {
		request := httptest.NewRequest(http.MethodGet, "/api/v1/connections?limit="+value, nil)
		recorder := httptest.NewRecorder()
		application.Handler().ServeHTTP(recorder, request)
		if recorder.Code != http.StatusBadRequest {
			t.Fatalf("limit=%q 状态码 = %d，响应 = %s", value, recorder.Code, recorder.Body.String())
		}
	}
	for _, value := range []string{"0", "1441", "999999999999999999", "invalid"} {
		request := httptest.NewRequest(http.MethodGet, "/api/v1/connections?window="+value, nil)
		recorder := httptest.NewRecorder()
		application.Handler().ServeHTTP(recorder, request)
		if recorder.Code != http.StatusBadRequest {
			t.Fatalf("window=%q 状态码 = %d，响应 = %s", value, recorder.Code, recorder.Body.String())
		}
	}
}

func TestConnectionsEndpointAppliesWindowBeforeFacetsAndLimit(t *testing.T) {
	now := time.Now().UTC()
	hostService := &stubHostService{logs: []host.LogEntry{
		{Timestamp: now.Add(-time.Minute), Message: `level=info msg="192.0.2.1:1 <-> recent.example:443" ip=203.0.113.1:443 network=tcp4 outbound=proxy`},
		{Timestamp: now.Add(-20 * time.Minute), Message: `level=info msg="192.0.2.2:2 <-> old.example:443" ip=203.0.113.2:443 network=tcp4 outbound=direct`},
	}}
	application, err := NewWithDependencies(Config{}, slog.New(slog.NewTextHandler(io.Discard, nil)), Dependencies{
		Dae: stubDaeService{}, Host: hostService,
	})
	if err != nil {
		t.Fatal(err)
	}
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, httptest.NewRequest(http.MethodGet, "/api/v1/connections?window=5&limit=1", nil))
	if recorder.Code != http.StatusOK {
		t.Fatalf("状态码 = %d，响应 = %s", recorder.Code, recorder.Body.String())
	}
	var response connectionsResponse
	if err := json.NewDecoder(recorder.Body).Decode(&response); err != nil {
		t.Fatal(err)
	}
	if response.Summary.WindowEvents != 1 || len(response.Entries) != 1 || len(response.Facets.Targets) != 1 ||
		response.Facets.Targets[0].Label != "recent.example" || len(response.Facets.Groups) != 1 || response.Facets.Groups[0].Label != "proxy" {
		t.Fatalf("时间窗没有在分布和列表之前生效: %+v", response)
	}
}

func TestConnectionHostAndMACNormalization(t *testing.T) {
	for input, expected := range map[string]string{
		"example.com:443":  "example.com",
		"[2001:db8::1]:53": "2001:db8::1",
		"2001:db8::1":      "2001:db8::1",
		"[2001:db8::2]":    "2001:db8::2",
	} {
		if actual := connectionHost(input); actual != expected {
			t.Errorf("connectionHost(%q) = %q, want %q", input, actual, expected)
		}
	}
	if actual := connectionMAC("02-00-00-00-00-01"); actual != "02:00:00:00:00:01" {
		t.Fatalf("正常 MAC = %q", actual)
	}
	for _, invalid := range []string{"", "00:00:00:00:00:00", "ff:ff:ff:ff:ff:ff", "invalid"} {
		if actual := connectionMAC(invalid); actual != "" {
			t.Errorf("无效 MAC %q = %q", invalid, actual)
		}
	}
}

func TestBuildConnectionFacetsLimitsOnlyPayload(t *testing.T) {
	events := make([]daeconn.Event, connectionFacetLimit+1)
	for index := range events {
		events[index] = daeconn.Event{Target: fmt.Sprintf("target-%03d.example:443", index)}
	}
	facets, clientCount, targetCount, limited := buildConnectionFacets(events)
	if !limited || len(facets.Targets) != connectionFacetLimit || targetCount != connectionFacetLimit+1 || clientCount != 0 {
		t.Fatalf("分布上限误伤摘要计数: limited=%v targets=%d/%d clients=%d", limited, len(facets.Targets), targetCount, clientCount)
	}
}

func TestConnectionsEndpointDegradesWhenSnapshotFails(t *testing.T) {
	hostService := &stubHostService{
		status: host.Status{MainPID: 42},
		logs:   []host.LogEntry{{Message: `level=info msg="192.0.2.1:1 <-> example.com:443" ip=203.0.113.1:443 network=tcp4 outbound=proxy`}},
	}
	application, err := NewWithDependencies(Config{}, slog.New(slog.NewTextHandler(io.Discard, nil)), Dependencies{
		Dae:         stubDaeService{},
		Host:        hostService,
		Connections: &stubConnectionSnapshotter{err: errors.New("procfs 不可读")},
	})
	if err != nil {
		t.Fatal(err)
	}
	request := httptest.NewRequest(http.MethodGet, "/api/v1/connections", nil)
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, request)
	if recorder.Code != http.StatusOK {
		t.Fatalf("状态码 = %d，响应 = %s", recorder.Code, recorder.Body.String())
	}
	var response connectionsResponse
	if err := json.NewDecoder(recorder.Body).Decode(&response); err != nil {
		t.Fatal(err)
	}
	if response.SnapshotOK || !response.LogsOK || len(response.Entries) != 1 || len(response.Endpoints) != 0 {
		t.Fatalf("快照失败影响了日志流水或伪造了端点: %+v", response)
	}
}

func TestConnectionsEndpointKeepsSnapshotWhenLogsFail(t *testing.T) {
	timestamp := time.Date(2026, 8, 2, 12, 0, 0, 0, time.UTC)
	application, err := NewWithDependencies(Config{}, slog.New(slog.NewTextHandler(io.Discard, nil)), Dependencies{
		Dae:  stubDaeService{},
		Host: &stubHostService{status: host.Status{MainPID: 42}, logsErr: errors.New("journald 不可读")},
		Connections: &stubConnectionSnapshotter{snapshot: daeconn.Snapshot{
			TakenAt: timestamp, OutboundTCP: 4, Endpoints: map[string]int{"203.0.113.8:443": 4},
		}},
	})
	if err != nil {
		t.Fatal(err)
	}
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, httptest.NewRequest(http.MethodGet, "/api/v1/connections", nil))
	if recorder.Code != http.StatusOK {
		t.Fatalf("状态码 = %d，响应 = %s", recorder.Code, recorder.Body.String())
	}
	var response connectionsResponse
	if err := json.NewDecoder(recorder.Body).Decode(&response); err != nil {
		t.Fatal(err)
	}
	if response.LogsOK || !response.SnapshotOK || response.Summary.OutboundTCP != 4 || len(response.Endpoints) != 1 {
		t.Fatalf("日志失败时未保留 socket 快照: %+v", response)
	}
}

func TestConnectionsEndpointRequiresHostService(t *testing.T) {
	application, err := NewWithDependencies(Config{}, slog.New(slog.NewTextHandler(io.Discard, nil)), Dependencies{Dae: stubDaeService{}})
	if err != nil {
		t.Fatal(err)
	}
	request := httptest.NewRequest(http.MethodGet, "/api/v1/connections", nil)
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, request)
	if recorder.Code != http.StatusServiceUnavailable {
		t.Fatalf("状态码 = %d，响应 = %s", recorder.Code, recorder.Body.String())
	}
}

func TestConnectionsEndpointRequiresAuthentication(t *testing.T) {
	session := auth.Session{
		Token: "session", CSRFToken: "csrf", ExpiresAt: time.Now().Add(time.Hour),
		User: auth.User{ID: 1, Username: "admin"},
	}
	application, err := NewWithDependencies(Config{}, slog.New(slog.NewTextHandler(io.Discard, nil)), Dependencies{
		Dae:            stubDaeService{},
		Host:           &stubHostService{},
		Connections:    &stubConnectionSnapshotter{},
		Authentication: &stubAuthenticationService{initialized: true, session: session},
	})
	if err != nil {
		t.Fatal(err)
	}

	anonymous := httptest.NewRecorder()
	application.Handler().ServeHTTP(anonymous, httptest.NewRequest(http.MethodGet, "/api/v1/connections", nil))
	if anonymous.Code != http.StatusUnauthorized {
		t.Fatalf("未登录状态码 = %d", anonymous.Code)
	}

	request := httptest.NewRequest(http.MethodGet, "/api/v1/connections", nil)
	request.AddCookie(&http.Cookie{Name: sessionCookieName, Value: session.Token})
	authorized := httptest.NewRecorder()
	application.Handler().ServeHTTP(authorized, request)
	if authorized.Code != http.StatusOK {
		t.Fatalf("已登录状态码 = %d，响应 = %s", authorized.Code, authorized.Body.String())
	}
}

func TestBuildConnectionSeriesKeepsEmptyBuckets(t *testing.T) {
	end := time.Date(2026, 9, 7, 12, 0, 0, 0, time.UTC)
	window := 10 * time.Minute
	events := []daeconn.Event{
		{Timestamp: end.Add(-10 * time.Minute)}, // 窗口起点，落进第一个桶
		{Timestamp: end.Add(-9 * time.Minute)},  // 同样在第一个桶
		{Timestamp: end.Add(-time.Minute)},      // 最后一个桶
		{Timestamp: end.Add(-11 * time.Minute)}, // 早于窗口，忽略
		{Timestamp: end},                        // 窗口右端开区间，忽略
	}
	series := buildConnectionSeries(events, end, window, 5)
	if len(series) != 5 {
		t.Fatalf("桶数 = %d，want 5", len(series))
	}
	counts := make([]int, len(series))
	for index, bucket := range series {
		counts[index] = bucket.Count
		expectedAt := end.Add(-window + time.Duration(index)*(window/5))
		if !bucket.At.Equal(expectedAt) {
			t.Fatalf("第 %d 个桶起点 = %s，want %s", index, bucket.At, expectedAt)
		}
	}
	// 中间三个桶必须留下来且为 0：省略它们会让折线把安静期连成斜坡。
	if counts[0] != 2 || counts[1] != 0 || counts[2] != 0 || counts[3] != 0 || counts[4] != 1 {
		t.Fatalf("分桶计数 = %v，want [2 0 0 0 1]", counts)
	}
}

func TestBuildConnectionSeriesClampsIndivisibleWindow(t *testing.T) {
	end := time.Date(2026, 9, 7, 12, 0, 0, 0, time.UTC)
	// 7 纳秒分 3 个桶：每桶 2 纳秒，末尾 1 纳秒除不尽，必须被夹进最后一个桶。
	series := buildConnectionSeries([]daeconn.Event{{Timestamp: end.Add(-1)}}, end, 7, 3)
	if len(series) != 3 {
		t.Fatalf("桶数 = %d，want 3", len(series))
	}
	if series[2].Count != 1 {
		t.Fatalf("除不尽的尾部没有夹进最后一个桶: %+v", series)
	}
}

func TestBuildConnectionSeriesRejectsUnusableShape(t *testing.T) {
	end := time.Now().UTC()
	if series := buildConnectionSeries(nil, end, 0, 60); series != nil {
		t.Fatalf("零窗口应返回 nil，得到 %+v", series)
	}
	if series := buildConnectionSeries(nil, end, time.Minute, 0); series != nil {
		t.Fatalf("零桶数应返回 nil，得到 %+v", series)
	}
}

func TestConnectionSeriesSinceReportsOldestKnownEvent(t *testing.T) {
	if since := connectionSeriesSince(nil); since != nil {
		t.Fatalf("存储为空时应返回 nil，得到 %s", since)
	}
	oldest := time.Date(2026, 9, 7, 11, 0, 0, 0, time.UTC)
	events := []daeconn.Event{
		{Timestamp: oldest.Add(time.Hour)},
		{Timestamp: oldest},
		{Timestamp: oldest.Add(time.Minute)},
	}
	since := connectionSeriesSince(events)
	if since == nil || !since.Equal(oldest) {
		t.Fatalf("覆盖起点 = %v，want %s", since, oldest)
	}
}

func TestConnectionsEndpointReturnsSeriesCoveringWindow(t *testing.T) {
	now := time.Now().UTC()
	hostService := &stubHostService{logs: []host.LogEntry{
		{Timestamp: now.Add(-time.Minute), Message: `level=info msg="192.0.2.1:1 <-> a.example:443" ip=203.0.113.1:443 network=tcp4 outbound=proxy`},
		{Timestamp: now.Add(-2 * time.Minute), Message: `level=info msg="192.0.2.2:2 <-> b.example:443" ip=203.0.113.2:443 network=tcp4 outbound=proxy`},
	}}
	application, err := NewWithDependencies(Config{}, slog.New(slog.NewTextHandler(io.Discard, nil)), Dependencies{
		Dae: stubDaeService{}, Host: hostService,
	})
	if err != nil {
		t.Fatal(err)
	}
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, httptest.NewRequest(http.MethodGet, "/api/v1/connections?window=15&buckets=15", nil))
	if recorder.Code != http.StatusOK {
		t.Fatalf("状态码 = %d，响应 = %s", recorder.Code, recorder.Body.String())
	}
	var response connectionsResponse
	if err := json.NewDecoder(recorder.Body).Decode(&response); err != nil {
		t.Fatal(err)
	}
	if len(response.Series) != 15 {
		t.Fatalf("桶数 = %d，want 15", len(response.Series))
	}
	total := 0
	for _, bucket := range response.Series {
		total += bucket.Count
	}
	// 曲线的总量必须和摘要一致，否则页面上两个数会互相打架。
	if total != response.Summary.WindowEvents {
		t.Fatalf("曲线总量 %d 与 windowEvents %d 不一致", total, response.Summary.WindowEvents)
	}
	if response.SeriesSince == nil {
		t.Fatal("有事件时必须给出覆盖起点，否则前端无法区分未覆盖与真的没流量")
	}
}

func TestConnectionsEndpointRejectsInvalidBuckets(t *testing.T) {
	application, err := NewWithDependencies(Config{}, slog.New(slog.NewTextHandler(io.Discard, nil)), Dependencies{
		Dae: stubDaeService{}, Host: &stubHostService{},
	})
	if err != nil {
		t.Fatal(err)
	}
	for _, value := range []string{"0", "241", "-1", "invalid"} {
		request := httptest.NewRequest(http.MethodGet, "/api/v1/connections?buckets="+value, nil)
		recorder := httptest.NewRecorder()
		application.Handler().ServeHTTP(recorder, request)
		if recorder.Code != http.StatusBadRequest {
			t.Fatalf("buckets=%q 状态码 = %d，响应 = %s", value, recorder.Code, recorder.Body.String())
		}
	}
}
