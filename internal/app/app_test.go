package app

import (
	"context"
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"strconv"
	"strings"
	"testing"
	"time"

	"github.com/tuoro/kdae-panel/internal/auth"
	"github.com/tuoro/kdae-panel/internal/configstore"
	"github.com/tuoro/kdae-panel/internal/dae"
	"github.com/tuoro/kdae-panel/internal/host"
)

type stubDaeService struct {
	report  dae.Report
	outline dae.Outline
	err     error
}

type stubConfigurationService struct {
	document configstore.Document
	saveErr  error
}

func (s stubConfigurationService) Read(_ context.Context) (configstore.Document, error) {
	return s.document, nil
}

func (s stubConfigurationService) Validate(_ context.Context, _ string) error {
	return nil
}

func (s stubConfigurationService) Save(_ context.Context, _, _ string, _ bool) (configstore.SaveResult, error) {
	return configstore.SaveResult{}, s.saveErr
}

func (s stubConfigurationService) ListBackups(_ context.Context) ([]configstore.Backup, error) {
	return []configstore.Backup{}, nil
}

func (s stubConfigurationService) Restore(_ context.Context, _, _ string, _ bool) (configstore.SaveResult, error) {
	return configstore.SaveResult{}, nil
}

func (s stubDaeService) Inspect(_ context.Context) dae.Report {
	return s.report
}

func (s stubDaeService) Outline(_ context.Context) (dae.Outline, error) {
	return s.outline, s.err
}

func (s stubDaeService) Reload(_ context.Context) error {
	return s.err
}

func (s stubDaeService) Suspend(_ context.Context, _ bool) error {
	return s.err
}

func (s stubDaeService) Sysdump(_ context.Context) (dae.Sysdump, error) {
	return dae.Sysdump{Filename: "dae-sysdump.test.tar.gz", Content: []byte("test dump")}, s.err
}

type stubHostService struct {
	status  host.Status
	actions []host.Action
	err     error
}

type stubAuthenticationService struct {
	initialized bool
	session     auth.Session
	err         error
	setupCalls  int
}

func (s *stubAuthenticationService) Initialized(_ context.Context) (bool, error) {
	return s.initialized, s.err
}

func (s *stubAuthenticationService) Setup(_ context.Context, _, _ string) (auth.Session, error) {
	s.setupCalls++
	return s.session, s.err
}

func (s *stubAuthenticationService) Login(_ context.Context, _, _ string) (auth.Session, error) {
	return s.session, s.err
}

func (s *stubAuthenticationService) GetSession(_ context.Context, token string) (auth.Session, error) {
	if s.err != nil || token != s.session.Token {
		return auth.Session{}, auth.ErrInvalidSession
	}
	return s.session, nil
}

func (s *stubAuthenticationService) Logout(_ context.Context, _ string) error {
	return s.err
}

func (s *stubAuthenticationService) ChangePassword(_ context.Context, _ int64, _, _ string) (auth.Session, error) {
	return s.session, s.err
}

func (s *stubHostService) Status(_ context.Context) (host.Status, error) {
	return s.status, s.err
}

func (s *stubHostService) Action(_ context.Context, action host.Action) error {
	s.actions = append(s.actions, action)
	return s.err
}

func (s *stubHostService) Logs(_ context.Context, _ int) ([]host.LogEntry, error) {
	return []host.LogEntry{}, s.err
}

func TestHealth(t *testing.T) {
	application, err := NewWithDae(
		Config{Version: "test-version"},
		slog.New(slog.NewTextHandler(io.Discard, nil)),
		stubDaeService{},
	)
	if err != nil {
		t.Fatalf("初始化应用失败: %v", err)
	}

	request := httptest.NewRequest(http.MethodGet, "/api/v1/health", nil)
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("状态码 = %d，期望 %d", recorder.Code, http.StatusOK)
	}
	var response struct {
		Status  string `json:"status"`
		Version string `json:"version"`
	}
	if err := json.NewDecoder(recorder.Body).Decode(&response); err != nil {
		t.Fatalf("解析响应失败: %v", err)
	}
	if response.Status != "ok" || response.Version != "test-version" {
		t.Fatalf("响应内容异常: %+v", response)
	}
}

func TestUnknownAPIUsesJSONNotFound(t *testing.T) {
	application, err := NewWithDae(
		Config{Version: "test-version"},
		slog.New(slog.NewTextHandler(io.Discard, nil)),
		stubDaeService{},
	)
	if err != nil {
		t.Fatal(err)
	}

	request := httptest.NewRequest(http.MethodGet, "/api/v1/unknown", nil)
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, request)
	if recorder.Code != http.StatusNotFound {
		t.Fatalf("状态码 = %d，响应 = %s", recorder.Code, recorder.Body.String())
	}
	if contentType := recorder.Header().Get("Content-Type"); !strings.Contains(contentType, "application/json") {
		t.Fatalf("Content-Type = %q", contentType)
	}
}

func TestDaeCapabilities(t *testing.T) {
	service := stubDaeService{report: dae.Report{
		Available:  true,
		Version:    "test-dae",
		DetectedAt: time.Unix(1, 0).UTC(),
		Commands:   map[string]bool{"reload": true},
	}}
	application, err := NewWithDae(
		Config{Version: "test-panel"},
		slog.New(slog.NewTextHandler(io.Discard, nil)),
		service,
	)
	if err != nil {
		t.Fatalf("初始化应用失败: %v", err)
	}

	request := httptest.NewRequest(http.MethodGet, "/api/v1/dae/capabilities", nil)
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("状态码 = %d，期望 %d", recorder.Code, http.StatusOK)
	}
	var response dae.Report
	if err := json.NewDecoder(recorder.Body).Decode(&response); err != nil {
		t.Fatalf("解析响应失败: %v", err)
	}
	if !response.Available || response.Version != "test-dae" || !response.Commands["reload"] {
		t.Fatalf("响应内容异常: %+v", response)
	}
}

func TestConfigurationConflictResponse(t *testing.T) {
	application, err := NewWithDependencies(
		Config{Version: "test-panel"},
		slog.New(slog.NewTextHandler(io.Discard, nil)),
		Dependencies{
			Dae:           stubDaeService{},
			Configuration: stubConfigurationService{saveErr: configstore.ErrConflict},
		},
	)
	if err != nil {
		t.Fatalf("初始化应用失败: %v", err)
	}

	request := httptest.NewRequest(
		http.MethodPut,
		"/api/v1/config",
		strings.NewReader(`{"content":"test","expectedHash":"stale"}`),
	)
	request.Header.Set("Content-Type", "application/json")
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, request)

	if recorder.Code != http.StatusConflict {
		t.Fatalf("状态码 = %d，期望 %d，响应 = %s", recorder.Code, http.StatusConflict, recorder.Body.String())
	}
	var response struct {
		Error struct {
			Code string `json:"code"`
		} `json:"error"`
	}
	if err := json.NewDecoder(recorder.Body).Decode(&response); err != nil {
		t.Fatalf("解析响应失败: %v", err)
	}
	if response.Error.Code != "configuration_conflict" {
		t.Fatalf("错误码 = %q", response.Error.Code)
	}
}

func TestServiceRestartAction(t *testing.T) {
	hostService := &stubHostService{}
	application, err := NewWithDependencies(
		Config{Version: "test-panel"},
		slog.New(slog.NewTextHandler(io.Discard, nil)),
		Dependencies{Dae: stubDaeService{}, Host: hostService},
	)
	if err != nil {
		t.Fatalf("初始化应用失败: %v", err)
	}

	request := httptest.NewRequest(http.MethodPost, "/api/v1/service/actions/restart", nil)
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("状态码 = %d，响应 = %s", recorder.Code, recorder.Body.String())
	}
	if len(hostService.actions) != 1 || hostService.actions[0] != host.ActionRestart {
		t.Fatalf("服务动作异常: %v", hostService.actions)
	}
}

func TestControlOperationRejectsConcurrentAction(t *testing.T) {
	application, err := NewWithDependencies(
		Config{Version: "test-panel"},
		slog.New(slog.NewTextHandler(io.Discard, nil)),
		Dependencies{Dae: stubDaeService{}, Host: &stubHostService{}},
	)
	if err != nil {
		t.Fatal(err)
	}
	application.operations.Lock()
	defer application.operations.Unlock()

	request := httptest.NewRequest(http.MethodPost, "/api/v1/service/actions/restart", nil)
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, request)
	if recorder.Code != http.StatusConflict {
		t.Fatalf("并发控制操作状态码 = %d，响应 = %s", recorder.Code, recorder.Body.String())
	}
}

func TestSysdumpDownload(t *testing.T) {
	application, err := NewWithDae(
		Config{Version: "test-panel"},
		slog.New(slog.NewTextHandler(io.Discard, nil)),
		stubDaeService{},
	)
	if err != nil {
		t.Fatal(err)
	}

	request := httptest.NewRequest(http.MethodGet, "/api/v1/diagnostics/sysdump", nil)
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, request)

	if recorder.Code != http.StatusOK || recorder.Body.String() != "test dump" {
		t.Fatalf("sysdump 响应异常: status=%d body=%q", recorder.Code, recorder.Body.String())
	}
	if recorder.Header().Get("Content-Type") != "application/gzip" {
		t.Fatalf("Content-Type = %q", recorder.Header().Get("Content-Type"))
	}
	if !strings.Contains(recorder.Header().Get("Content-Disposition"), "dae-sysdump.test.tar.gz") {
		t.Fatalf("Content-Disposition = %q", recorder.Header().Get("Content-Disposition"))
	}
}

func TestAuthenticationProtectsAPIAndChecksCSRF(t *testing.T) {
	session := auth.Session{
		Token:     "session-token",
		CSRFToken: "csrf-token",
		ExpiresAt: time.Now().Add(time.Hour),
		User:      auth.User{ID: 1, Username: "admin"},
	}
	authService := &stubAuthenticationService{initialized: true, session: session}
	configuration := stubConfigurationService{}
	application, err := NewWithDependencies(
		Config{Version: "test-panel"},
		slog.New(slog.NewTextHandler(io.Discard, nil)),
		Dependencies{
			Dae:            stubDaeService{},
			Configuration:  configuration,
			Authentication: authService,
		},
	)
	if err != nil {
		t.Fatal(err)
	}

	unauthorized := httptest.NewRecorder()
	application.Handler().ServeHTTP(unauthorized, httptest.NewRequest(http.MethodGet, "/api/v1/config", nil))
	if unauthorized.Code != http.StatusUnauthorized {
		t.Fatalf("未登录状态码 = %d", unauthorized.Code)
	}

	withoutCSRFRequest := httptest.NewRequest(http.MethodPut, "/api/v1/config", strings.NewReader(`{"content":"test"}`))
	withoutCSRFRequest.AddCookie(&http.Cookie{Name: sessionCookieName, Value: session.Token})
	withoutCSRF := httptest.NewRecorder()
	application.Handler().ServeHTTP(withoutCSRF, withoutCSRFRequest)
	if withoutCSRF.Code != http.StatusForbidden {
		t.Fatalf("缺少 CSRF 状态码 = %d，响应 = %s", withoutCSRF.Code, withoutCSRF.Body.String())
	}

	validRequest := httptest.NewRequest(http.MethodPut, "/api/v1/config", strings.NewReader(`{"content":"test"}`))
	validRequest.Host = "panel.example"
	validRequest.Header.Set("Origin", "http://panel.example")
	validRequest.Header.Set("X-CSRF-Token", session.CSRFToken)
	validRequest.AddCookie(&http.Cookie{Name: sessionCookieName, Value: session.Token})
	validResponse := httptest.NewRecorder()
	application.Handler().ServeHTTP(validResponse, validRequest)
	if validResponse.Code != http.StatusOK {
		t.Fatalf("有效请求状态码 = %d，响应 = %s", validResponse.Code, validResponse.Body.String())
	}
}

func TestSetupRequiresBootstrapTokenAndClosesAfterInitialization(t *testing.T) {
	session := auth.Session{Token: "session", CSRFToken: "csrf", ExpiresAt: time.Now().Add(time.Hour), User: auth.User{ID: 1, Username: "admin"}}
	authService := &stubAuthenticationService{session: session}
	application, err := NewWithDependencies(
		Config{Version: "test", BootstrapToken: "bootstrap-secret"},
		slog.New(slog.NewTextHandler(io.Discard, nil)),
		Dependencies{Dae: stubDaeService{}, Authentication: authService},
	)
	if err != nil {
		t.Fatal(err)
	}

	rejected := httptest.NewRecorder()
	rejectedRequest := httptest.NewRequest(http.MethodPost, "/api/v1/auth/setup", strings.NewReader(`{"username":"admin","password":"a secure test password","bootstrapToken":"wrong"}`))
	application.Handler().ServeHTTP(rejected, rejectedRequest)
	if rejected.Code != http.StatusForbidden || authService.setupCalls != 0 {
		t.Fatalf("错误 token 响应: status=%d calls=%d", rejected.Code, authService.setupCalls)
	}

	accepted := httptest.NewRecorder()
	acceptedRequest := httptest.NewRequest(http.MethodPost, "/api/v1/auth/setup", strings.NewReader(`{"username":"admin","password":"a secure test password","bootstrapToken":"bootstrap-secret"}`))
	application.Handler().ServeHTTP(accepted, acceptedRequest)
	if accepted.Code != http.StatusCreated || authService.setupCalls != 1 {
		t.Fatalf("正确 token 响应: status=%d body=%s calls=%d", accepted.Code, accepted.Body, authService.setupCalls)
	}

	authService.initialized = true
	closed := httptest.NewRecorder()
	closedRequest := httptest.NewRequest(http.MethodPost, "/api/v1/auth/setup", strings.NewReader(`{"username":"admin","password":"short"}`))
	application.Handler().ServeHTTP(closed, closedRequest)
	if closed.Code != http.StatusConflict || authService.setupCalls != 1 {
		t.Fatalf("已初始化响应: status=%d calls=%d", closed.Code, authService.setupCalls)
	}
}

func TestLoginLimiterBlocksRepeatedFailures(t *testing.T) {
	limiter := newLoginLimiter()
	now := time.Date(2026, 7, 21, 0, 0, 0, 0, time.UTC)
	limiter.now = func() time.Time { return now }
	for range 5 {
		limiter.Failure("address\x00127.0.0.1")
	}
	retryAfter, allowed := limiter.Allow("address\x00127.0.0.1")
	if allowed || retryAfter != 15*time.Minute {
		t.Fatalf("限速结果异常: allowed=%v retryAfter=%v", allowed, retryAfter)
	}
	limiter.Success("address\x00127.0.0.1")
	if _, allowed := limiter.Allow("address\x00127.0.0.1"); !allowed {
		t.Fatal("成功登录后应该清除限速状态")
	}
}

func TestLoginLimiterBoundsState(t *testing.T) {
	limiter := newLoginLimiter()
	limiter.now = func() time.Time { return time.Date(2026, 7, 21, 0, 0, 0, 0, time.UTC) }
	for index := 0; index < maxLoginAttempts+100; index++ {
		limiter.Failure("address\x00" + strconv.Itoa(index))
	}
	if len(limiter.attempts) != maxLoginAttempts {
		t.Fatalf("限速状态数量 = %d", len(limiter.attempts))
	}
}

func TestProxyTrustUsesForwardedClientAndScheme(t *testing.T) {
	trust, err := parseProxyTrust("127.0.0.0/8,::1/128")
	if err != nil {
		t.Fatal(err)
	}
	request := httptest.NewRequest(http.MethodPost, "http://panel.example/api/v1/auth/login", nil)
	request.RemoteAddr = "127.0.0.1:12345"
	request.Host = "panel.example"
	request.Header.Set("X-Forwarded-For", "198.51.100.10, 127.0.0.2")
	request.Header.Set("X-Forwarded-Proto", "https")
	request.Header.Set("Origin", "https://panel.example")

	keys := loginKeys(request, trust)
	if len(keys) != 1 || keys[0] != "address\x00198.51.100.10" {
		t.Fatalf("登录限速键 = %q", keys)
	}
	if !sameOrigin(request, trust) {
		t.Fatal("可信代理的 HTTPS 同源请求应该通过")
	}
}

func TestUntrustedForwardedHeadersIgnored(t *testing.T) {
	trust, err := parseProxyTrust("127.0.0.0/8")
	if err != nil {
		t.Fatal(err)
	}
	request := httptest.NewRequest(http.MethodPost, "http://panel.example/api/v1/auth/login", nil)
	request.RemoteAddr = "198.51.100.20:12345"
	request.Host = "panel.example"
	request.Header.Set("X-Forwarded-For", "203.0.113.9")
	request.Header.Set("X-Forwarded-Proto", "https")
	request.Header.Set("Origin", "https://panel.example")

	if got := trust.clientAddress(request); got != "198.51.100.20" {
		t.Fatalf("客户端地址 = %q", got)
	}
	if sameOrigin(request, trust) {
		t.Fatal("不可信来源不能伪造 HTTPS 同源请求")
	}
}

func TestSecurityHeadersHonorTrustedHTTPSProxy(t *testing.T) {
	trust, _ := parseProxyTrust("127.0.0.0/8")
	handler := securityHeaders(http.HandlerFunc(func(writer http.ResponseWriter, _ *http.Request) {
		writer.WriteHeader(http.StatusNoContent)
	}), trust)
	request := httptest.NewRequest(http.MethodGet, "http://panel.example/", nil)
	request.RemoteAddr = "127.0.0.1:12345"
	request.Header.Set("X-Forwarded-Proto", "https")
	recorder := httptest.NewRecorder()
	handler.ServeHTTP(recorder, request)
	if recorder.Header().Get("Strict-Transport-Security") == "" {
		t.Fatal("可信 HTTPS 代理后应发送 HSTS")
	}
}
