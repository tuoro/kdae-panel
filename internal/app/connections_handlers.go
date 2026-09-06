package app

import (
	"context"
	"errors"
	"net"
	"net/http"
	"net/netip"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/tuoro/kdae-panel/internal/configstore"
	"github.com/tuoro/kdae-panel/internal/daeconfig"
	"github.com/tuoro/kdae-panel/internal/daeconn"
	"github.com/tuoro/kdae-panel/internal/daeinstall"
	"github.com/tuoro/kdae-panel/internal/host"
	"github.com/tuoro/kdae-panel/internal/upstream"
)

const (
	connectionsMaxEntries    = 2000
	connectionsDefaultWindow = 15 * time.Minute
	connectionsMaxWindow     = 24 * time.Hour
	// 曲线分桶：默认 60 个桶，15 分钟窗口即每桶 15 秒。上限挡住把窗口切碎到
	// 每桶不足一秒的请求——那种精度日志时间戳本身也给不出。
	connectionsDefaultBuckets = 60
	connectionsMaxBuckets     = 240
	connectionFacetLimit      = 200
	kdaeDebugLogRevision      = 1148
	connectionLogLevelRetry   = 30 * time.Second
	minimumCommitIDLength     = 6
)

const (
	connectionInfoLogLevel  = "info"
	connectionDebugLogLevel = "debug"
	kdaeDebugLogCommit      = "502d976ee63539f198be18c40221691701b1cbcb"
)

type connectionsSummary struct {
	OutboundTCP    int `json:"outboundTcp"`
	UDPSockets     int `json:"udpSockets"`
	SampledTCPPeak int `json:"sampledTcpPeak"`
	SampledUDPPeak int `json:"sampledUdpPeak"`
	WindowEvents   int `json:"windowEvents"`
	WindowClients  int `json:"windowClients"`
	WindowTargets  int `json:"windowTargets"`
}

type connectionEndpoint struct {
	Address string `json:"address"`
	Count   int    `json:"count"`
}

// connectionBucket 是一段等长时间区间内的新建连接数。At 是区间的起点，
// 区间长度由窗口除以桶数得到，最后一个桶的终点就是本次响应的 now。
type connectionBucket struct {
	At    time.Time `json:"at"`
	Count int       `json:"count"`
}

type connectionFacet struct {
	ID    string `json:"id"`
	Label string `json:"label"`
	Count int    `json:"count"`
	Note  string `json:"note,omitempty"`
}

type connectionFacets struct {
	Targets []connectionFacet `json:"targets"`
	Clients []connectionFacet `json:"clients"`
	Nodes   []connectionFacet `json:"nodes"`
	Groups  []connectionFacet `json:"groups"`
}

type connectionsResponse struct {
	SnapshotAt          time.Time            `json:"snapshotAt"`
	SnapshotOK          bool                 `json:"snapshotOk"`
	ServiceRunning      bool                 `json:"serviceRunning"`
	SocketWindowSeconds int                  `json:"socketWindowSeconds"`
	LogsOK              bool                 `json:"logsOk"`
	LogLevel            string               `json:"logLevel,omitempty"`
	RequiredLogLevel    string               `json:"requiredLogLevel"`
	Dropped             int                  `json:"dropped,omitempty"`
	Truncated           bool                 `json:"truncated,omitempty"`
	FacetLimited        bool                 `json:"facetLimited,omitempty"`
	Summary             connectionsSummary   `json:"summary"`
	Series              []connectionBucket   `json:"series"`
	SeriesSince         *time.Time           `json:"seriesSince,omitempty"`
	Facets              connectionFacets     `json:"facets"`
	Endpoints           []connectionEndpoint `json:"endpoints"`
	Entries             []daeconn.Event      `json:"entries"`
}

// ConnectionInstallStateService 只暴露连接兼容判断需要的安装来源，不把版本
// 管理器的下载、替换和卸载能力带进只读连接端点。
type ConnectionInstallStateService interface {
	InstalledState() (*daeinstall.State, error)
}

type connectionDaeVersionReader interface {
	Version(context.Context) (string, error)
}

type connectionConfigReader interface {
	Read(context.Context) (configstore.Document, error)
}

type connectionHostReader interface {
	Status(context.Context) (host.Status, error)
	Logs(context.Context, int) ([]host.LogEntry, error)
}

type connectionLogLevelCache struct {
	pid       int
	level     string
	known     bool
	checkedAt time.Time
}

type connectionTracker struct {
	dae           connectionDaeVersionReader
	host          connectionHostReader
	configuration connectionConfigReader
	installation  ConnectionInstallStateService
	snapshotter   daeconn.Snapshotter
	store         *daeconn.Store
	levelMu       sync.Mutex
	levelCache    connectionLogLevelCache
}

func registerConnectionRoutes(
	router *http.ServeMux,
	daeService connectionDaeVersionReader,
	hostService connectionHostReader,
	configuration connectionConfigReader,
	installation ConnectionInstallStateService,
	snapshotter daeconn.Snapshotter,
) {
	if snapshotter == nil {
		snapshotter = daeconn.NewProcSnapshotter()
	}
	tracker := &connectionTracker{
		dae: daeService, host: hostService, configuration: configuration, installation: installation,
		snapshotter: snapshotter, store: daeconn.NewStore(),
	}
	router.HandleFunc("GET /api/v1/connections", tracker.handle)
}

// handle 分别采集历史流水和实时出站端点。任一来源临时不可用时保留另一边，
// 由 LogsOK / SnapshotOK 明确告诉前端，避免一处故障让整页失效。
func (tracker *connectionTracker) handle(writer http.ResponseWriter, request *http.Request) {
	if tracker.host == nil {
		writeAPIError(writer, http.StatusServiceUnavailable, "host_service_unavailable", "主机服务管理尚未初始化")
		return
	}
	limit, err := connectionLimit(request)
	if err != nil {
		writeAPIError(writer, http.StatusBadRequest, "invalid_connection_limit", err.Error())
		return
	}
	window, err := connectionWindow(request)
	if err != nil {
		writeAPIError(writer, http.StatusBadRequest, "invalid_connection_window", err.Error())
		return
	}
	buckets, err := connectionBucketCount(request)
	if err != nil {
		writeAPIError(writer, http.StatusBadRequest, "invalid_connection_buckets", err.Error())
		return
	}

	var status host.Status
	statusOK := false
	if current, statusErr := tracker.host.Status(request.Context()); statusErr == nil {
		status, statusOK = current, true
	}
	requiredLogLevel := tracker.connectionLogLevel(request.Context(), status.MainPID)

	logs, logErr := tracker.host.Logs(request.Context(), host.MaxLogLines)
	lines := make([]daeconn.LogLine, len(logs))
	for index, entry := range logs {
		lines[index] = daeconn.LogLine{Timestamp: entry.Timestamp, Message: entry.Message, PID: entry.PID}
	}
	events, dropped := daeconn.Parse(lines, daeconn.ParseOptions{
		AcceptDebug: requiredLogLevel == connectionDebugLogLevel,
		CurrentPID:  strconv.Itoa(status.MainPID),
	})
	merged, storeTruncated := tracker.store.Merge(events)
	now := time.Now().UTC()
	windowed := connectionEventsSince(merged, now.Add(-window))
	facets, clientCount, targetCount, facetLimited := buildConnectionFacets(windowed)
	// 覆盖起点按整个存储算，不是按窗口内的事件：存储里若留着比窗口更早的事件，
	// 就证明这段窗口从头到尾都在面板的观测范围内。
	series := buildConnectionSeries(windowed, now, window, buckets)
	seriesSince := connectionSeriesSince(merged)

	var snapshot daeconn.Snapshot
	snapshotOK := false
	serviceRunning := statusOK && status.MainPID > 0
	if statusOK {
		if taken, snapshotErr := tracker.snapshotter.Snapshot(request.Context(), status.MainPID); snapshotErr == nil {
			snapshot, snapshotOK = taken, true
		}
	}

	listed, responseTruncated := windowed, false
	if len(listed) > limit {
		listed, responseTruncated = listed[:limit], true
	}
	snapshotAt := snapshot.TakenAt
	if snapshotAt.IsZero() {
		snapshotAt = now
	}
	logLevel := ""
	if tracker.configuration != nil {
		if document, configErr := tracker.configuration.Read(request.Context()); configErr == nil {
			logLevel = daeconfig.LogLevel(document.Content)
		}
	}
	writeJSON(writer, http.StatusOK, connectionsResponse{
		SnapshotAt:          snapshotAt,
		SnapshotOK:          snapshotOK,
		ServiceRunning:      serviceRunning,
		SocketWindowSeconds: int(daeconn.RecentSampleWindow / time.Second),
		LogsOK:              logErr == nil,
		LogLevel:            logLevel,
		RequiredLogLevel:    requiredLogLevel,
		Dropped:             dropped,
		Truncated:           storeTruncated || snapshot.Truncated || responseTruncated,
		FacetLimited:        facetLimited,
		Summary: connectionsSummary{
			OutboundTCP:    snapshot.OutboundTCP,
			UDPSockets:     snapshot.UDPSockets,
			SampledTCPPeak: snapshot.SampledTCPPeak,
			SampledUDPPeak: snapshot.SampledUDPPeak,
			WindowEvents:   len(windowed),
			WindowClients:  clientCount,
			WindowTargets:  targetCount,
		},
		Series:      series,
		SeriesSince: seriesSince,
		Facets:      facets,
		Endpoints:   sortedConnectionEndpoints(snapshot.Endpoints),
		Entries:     listed,
	})
}

// connectionLogLevel 每个 dae PID 只探测一次运行版本。版本切换会重启 dae，
// 新 PID 使缓存自然失效；探测临时失败则短暂退回 info 后重试。
func (tracker *connectionTracker) connectionLogLevel(ctx context.Context, pid int) string {
	if pid <= 0 || tracker.dae == nil {
		return connectionInfoLogLevel
	}

	tracker.levelMu.Lock()
	defer tracker.levelMu.Unlock()
	now := time.Now().UTC()
	cache := tracker.levelCache
	if cache.pid == pid && (cache.known || now.Sub(cache.checkedAt) < connectionLogLevelRetry) {
		return cache.level
	}

	version, err := tracker.dae.Version(ctx)
	if err != nil || strings.TrimSpace(version) == "" {
		tracker.levelCache = connectionLogLevelCache{pid: pid, level: connectionInfoLogLevel, checkedAt: now}
		return connectionInfoLogLevel
	}
	var state *daeinstall.State
	if tracker.installation != nil {
		state, err = tracker.installation.InstalledState()
		if err != nil {
			tracker.levelCache = connectionLogLevelCache{pid: pid, level: connectionInfoLogLevel, checkedAt: now}
			return connectionInfoLogLevel
		}
	}
	level := connectionLogLevelFor(version, state)
	tracker.levelCache = connectionLogLevelCache{
		pid: pid, level: level, known: true, checkedAt: now,
	}
	return level
}

func connectionLogLevelFor(version string, state *daeinstall.State) string {
	revision, commit, ok := unstableDaeRevision(version)
	if !ok {
		return connectionInfoLogLevel
	}
	// 精确命中首个变更提交时，即使旧安装没有面板账本也能恢复连接流水。
	if sameCommit(commit, kdaeDebugLogCommit) {
		return connectionDebugLogLevel
	}
	if state == nil || state.Source != upstream.SourceKdae || revision < kdaeDebugLogRevision {
		return connectionInfoLogLevel
	}
	// 后续提交必须由面板账本证明来自受信任的 kdae 构建，并与运行版本一致；
	// 不能仅凭递增 revision 把未来官方 dae 误判为这个分支。
	if strings.TrimSpace(state.Version) != strings.TrimSpace(version) && !sameCommit(commit, state.Label) {
		return connectionInfoLogLevel
	}
	return connectionDebugLogLevel
}

func unstableDaeRevision(version string) (revision int, commit string, ok bool) {
	for _, field := range strings.Fields(version) {
		if !strings.HasPrefix(field, "unstable-") {
			continue
		}
		parts := strings.Split(field, ".")
		if len(parts) != 3 || !strings.HasPrefix(parts[1], "r") || !validCommitID(parts[2]) {
			return 0, "", false
		}
		parsed, err := strconv.Atoi(strings.TrimPrefix(parts[1], "r"))
		if err != nil || parsed < 1 {
			return 0, "", false
		}
		return parsed, strings.ToLower(parts[2]), true
	}
	return 0, "", false
}

func validCommitID(value string) bool {
	// kdae 的版本串来自构建时 Git 缩写；历史构建中实际出现过 6 位缩写。
	if len(value) < minimumCommitIDLength || len(value) > 40 {
		return false
	}
	for _, char := range value {
		if (char < '0' || char > '9') && (char < 'a' || char > 'f') && (char < 'A' || char > 'F') {
			return false
		}
	}
	return true
}

func sameCommit(left, right string) bool {
	left, right = strings.ToLower(strings.TrimSpace(left)), strings.ToLower(strings.TrimSpace(right))
	if !validCommitID(left) || !validCommitID(right) {
		return false
	}
	return strings.HasPrefix(left, right) || strings.HasPrefix(right, left)
}

func connectionWindow(request *http.Request) (time.Duration, error) {
	raw := request.URL.Query().Get("window")
	if raw == "" {
		return connectionsDefaultWindow, nil
	}
	minutes, err := strconv.Atoi(raw)
	if err != nil || minutes < 1 || minutes > int(connectionsMaxWindow/time.Minute) {
		return 0, errors.New("连接时间窗必须是 1 到 1440 之间的分钟数")
	}
	return time.Duration(minutes) * time.Minute, nil
}

func connectionEventsSince(events []daeconn.Event, cutoff time.Time) []daeconn.Event {
	filtered := make([]daeconn.Event, 0, len(events))
	for _, event := range events {
		if !event.Timestamp.Before(cutoff) {
			filtered = append(filtered, event)
		}
	}
	return filtered
}

func buildConnectionFacets(events []daeconn.Event) (connectionFacets, int, int, bool) {
	targets := countConnectionFacets(events, targetFacet)
	clients := countConnectionFacets(events, clientFacet)
	nodes := countConnectionFacets(events, func(event daeconn.Event) (string, string, string) {
		return event.Dialer, event.Dialer, ""
	})
	groups := countConnectionFacets(events, func(event daeconn.Event) (string, string, string) {
		return event.Outbound, event.Outbound, ""
	})
	limited := len(targets) > connectionFacetLimit || len(clients) > connectionFacetLimit ||
		len(nodes) > connectionFacetLimit || len(groups) > connectionFacetLimit
	return connectionFacets{
		Targets: limitConnectionFacets(targets),
		Clients: limitConnectionFacets(clients),
		Nodes:   limitConnectionFacets(nodes),
		Groups:  limitConnectionFacets(groups),
	}, len(clients), len(targets), limited
}

func countConnectionFacets(events []daeconn.Event, identify func(daeconn.Event) (string, string, string)) []connectionFacet {
	counts := make(map[string]*connectionFacet)
	for _, event := range events {
		id, label, note := identify(event)
		if id == "" || label == "" {
			continue
		}
		facet, exists := counts[id]
		if !exists {
			// Store 按时间倒序返回事件，因此首次出现的标签就是这个身份的最新地址。
			facet = &connectionFacet{ID: id, Label: label, Note: note}
			counts[id] = facet
		}
		facet.Count++
	}
	facets := make([]connectionFacet, 0, len(counts))
	for _, facet := range counts {
		facets = append(facets, *facet)
	}
	sort.Slice(facets, func(left, right int) bool {
		if facets[left].Count != facets[right].Count {
			return facets[left].Count > facets[right].Count
		}
		return facets[left].Label < facets[right].Label
	})
	return facets
}

func targetFacet(event daeconn.Event) (string, string, string) {
	target := event.Sniffed
	if target == "" {
		target = event.Target
	}
	target = strings.ToLower(strings.TrimSuffix(connectionHost(target), "."))
	return target, target, ""
}

func clientFacet(event daeconn.Event) (string, string, string) {
	host := connectionHost(event.Src)
	if host == "" {
		return "", "", ""
	}
	if mac := connectionMAC(event.Mac); mac != "" {
		return "mac:" + mac, host, mac
	}
	return "ip:" + strings.ToLower(host), host, ""
}

func connectionHost(value string) string {
	value = strings.TrimSpace(value)
	if value == "" {
		return ""
	}
	if host, _, err := net.SplitHostPort(value); err == nil {
		return strings.Trim(host, "[]")
	}
	trimmed := strings.Trim(value, "[]")
	if address, err := netip.ParseAddr(trimmed); err == nil {
		return address.Unmap().String()
	}
	return value
}

func connectionMAC(value string) string {
	hardware, err := net.ParseMAC(strings.TrimSpace(value))
	if err != nil || len(hardware) == 0 || hardware[0]&1 != 0 {
		return ""
	}
	for _, octet := range hardware {
		if octet != 0 {
			return hardware.String()
		}
	}
	return ""
}

func limitConnectionFacets(facets []connectionFacet) []connectionFacet {
	if len(facets) > connectionFacetLimit {
		return facets[:connectionFacetLimit]
	}
	return facets
}

func connectionLimit(request *http.Request) (int, error) {
	raw := request.URL.Query().Get("limit")
	if raw == "" {
		return host.MaxLogLines, nil
	}
	limit, err := strconv.Atoi(raw)
	if err != nil || limit < 1 || limit > connectionsMaxEntries {
		return 0, errors.New("连接条数必须是 1 到 2000 之间的整数")
	}
	return limit, nil
}

func connectionBucketCount(request *http.Request) (int, error) {
	raw := request.URL.Query().Get("buckets")
	if raw == "" {
		return connectionsDefaultBuckets, nil
	}
	buckets, err := strconv.Atoi(raw)
	if err != nil || buckets < 1 || buckets > connectionsMaxBuckets {
		return 0, errors.New("曲线桶数必须是 1 到 240 之间的整数")
	}
	return buckets, nil
}

// buildConnectionSeries 把窗口内的事件聚合成等长的桶。空桶必须保留：曲线上
// 的缺口代表"这段时间确实没有新建连接"，靠省略点让折线自己连过去会把安静期
// 画成斜坡。事件已按时间倒序，这里只做一次线性分配。
func buildConnectionSeries(events []daeconn.Event, end time.Time, window time.Duration, buckets int) []connectionBucket {
	if buckets < 1 || window <= 0 {
		return nil
	}
	start := end.Add(-window)
	width := window / time.Duration(buckets)
	if width <= 0 {
		return nil
	}
	series := make([]connectionBucket, buckets)
	for index := range series {
		series[index] = connectionBucket{At: start.Add(time.Duration(index) * width)}
	}
	for _, event := range events {
		if event.Timestamp.Before(start) || !event.Timestamp.Before(end) {
			continue
		}
		index := int(event.Timestamp.Sub(start) / width)
		// 整除的边界情况：窗口不能被桶数整除时，末尾几纳秒会落到 buckets 之外。
		if index >= buckets {
			index = buckets - 1
		}
		series[index].Count++
	}
	return series
}

// connectionSeriesSince 给出曲线可信区间的起点：面板的事件存储只从它开始
// 轮询时积累，容量满后还会淘汰最旧的事件。早于这个时刻的桶是"面板不知道"，
// 不是"当时没有流量"，前端必须区分这两者——与 socket 快照的"未捕获"同理。
// 取存储中最旧事件的时间是保守估计：安静期开头也会被算作未覆盖，宁可少声称
// 知道，也不把无知报成零。存储为空时返回 nil，代表整个窗口都无从判断。
func connectionSeriesSince(events []daeconn.Event) *time.Time {
	oldest := time.Time{}
	for _, event := range events {
		if oldest.IsZero() || event.Timestamp.Before(oldest) {
			oldest = event.Timestamp
		}
	}
	if oldest.IsZero() {
		return nil
	}
	return &oldest
}

func sortedConnectionEndpoints(counts map[string]int) []connectionEndpoint {
	endpoints := make([]connectionEndpoint, 0, len(counts))
	for address, count := range counts {
		endpoints = append(endpoints, connectionEndpoint{Address: address, Count: count})
	}
	sort.Slice(endpoints, func(left, right int) bool {
		if endpoints[left].Count != endpoints[right].Count {
			return endpoints[left].Count > endpoints[right].Count
		}
		return endpoints[left].Address < endpoints[right].Address
	})
	return endpoints
}
