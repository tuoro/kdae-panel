package app

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"github.com/tuoro/kdae-panel/internal/configstore"
	"github.com/tuoro/kdae-panel/internal/dae"
	"github.com/tuoro/kdae-panel/internal/webui"
)

type App struct {
	handler http.Handler
}

type DaeService interface {
	Inspect(ctx context.Context) dae.Report
	Outline(ctx context.Context) (dae.Outline, error)
}

type ConfigurationService interface {
	Read(ctx context.Context) (configstore.Document, error)
	Validate(ctx context.Context, content string) error
	Save(ctx context.Context, content, expectedHash string, apply bool) (configstore.SaveResult, error)
	ListBackups(ctx context.Context) ([]configstore.Backup, error)
	Restore(ctx context.Context, backupID, expectedHash string, apply bool) (configstore.SaveResult, error)
}

type Dependencies struct {
	Dae           DaeService
	Configuration ConfigurationService
}

func New(cfg Config, logger *slog.Logger) (*App, error) {
	cfg = cfg.withDefaults()
	daeClient := dae.NewClient(cfg.DaeBinary)
	configuration, err := configstore.NewManager(cfg.DaeConfigPath, cfg.BackupDir, daeClient)
	if err != nil {
		return nil, fmt.Errorf("初始化配置管理器: %w", err)
	}
	return NewWithDependencies(cfg, logger, Dependencies{
		Dae:           daeClient,
		Configuration: configuration,
	})
}

func NewWithDae(cfg Config, logger *slog.Logger, daeService DaeService) (*App, error) {
	return NewWithDependencies(cfg, logger, Dependencies{Dae: daeService})
}

func NewWithDependencies(cfg Config, logger *slog.Logger, dependencies Dependencies) (*App, error) {
	if dependencies.Dae == nil {
		return nil, errors.New("dae 服务不能为空")
	}
	router := http.NewServeMux()
	router.HandleFunc("GET /api/v1/health", func(writer http.ResponseWriter, request *http.Request) {
		writeJSON(writer, http.StatusOK, map[string]any{
			"status":  "ok",
			"version": cfg.Version,
		})
	})
	router.HandleFunc("GET /api/v1/dae/capabilities", func(writer http.ResponseWriter, request *http.Request) {
		writeJSON(writer, http.StatusOK, dependencies.Dae.Inspect(request.Context()))
	})
	router.HandleFunc("GET /api/v1/dae/outline", func(writer http.ResponseWriter, request *http.Request) {
		outline, err := dependencies.Dae.Outline(request.Context())
		if err != nil {
			writeAPIError(writer, http.StatusServiceUnavailable, "dae_outline_unavailable", err.Error())
			return
		}
		writeJSON(writer, http.StatusOK, outline)
	})
	registerConfigurationRoutes(router, dependencies.Configuration)
	router.Handle("/", webui.Handler())

	return &App{handler: recoverer(requestLogger(logger)(router), logger)}, nil
}

func writeAPIError(writer http.ResponseWriter, status int, code, message string) {
	writeJSON(writer, status, map[string]any{
		"error": map[string]string{
			"code":    code,
			"message": message,
		},
	})
}

func (a *App) Handler() http.Handler {
	return a.handler
}

func writeJSON(writer http.ResponseWriter, status int, value any) {
	writer.Header().Set("Content-Type", "application/json; charset=utf-8")
	writer.WriteHeader(status)
	_ = json.NewEncoder(writer).Encode(value)
}

func requestLogger(logger *slog.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
			startedAt := time.Now()
			next.ServeHTTP(writer, request)
			logger.Info("HTTP 请求",
				"method", request.Method,
				"path", request.URL.Path,
				"duration", time.Since(startedAt),
			)
		})
	}
}

func recoverer(next http.Handler, logger *slog.Logger) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		defer func() {
			if recovered := recover(); recovered != nil {
				logger.Error("HTTP 处理发生异常", "panic", recovered, "path", request.URL.Path)
				http.Error(writer, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			}
		}()
		next.ServeHTTP(writer, request)
	})
}
