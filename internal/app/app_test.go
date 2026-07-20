package app

import (
	"context"
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/tuoro/kdae-panel/internal/configstore"
	"github.com/tuoro/kdae-panel/internal/dae"
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

func TestHealth(t *testing.T) {
	application, err := New(Config{Version: "test-version"}, slog.New(slog.NewTextHandler(io.Discard, nil)))
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
