package app

import (
	"context"
	"encoding/json"
	"log/slog"
	"net/http"
	"time"

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

func New(cfg Config, logger *slog.Logger) (*App, error) {
	return NewWithDae(cfg, logger, dae.NewClient(cfg.DaeBinary))
}

func NewWithDae(cfg Config, logger *slog.Logger, daeService DaeService) (*App, error) {
	router := http.NewServeMux()
	router.HandleFunc("GET /api/v1/health", func(writer http.ResponseWriter, request *http.Request) {
		writeJSON(writer, http.StatusOK, map[string]any{
			"status":  "ok",
			"version": cfg.Version,
		})
	})
	router.HandleFunc("GET /api/v1/dae/capabilities", func(writer http.ResponseWriter, request *http.Request) {
		writeJSON(writer, http.StatusOK, daeService.Inspect(request.Context()))
	})
	router.HandleFunc("GET /api/v1/dae/outline", func(writer http.ResponseWriter, request *http.Request) {
		outline, err := daeService.Outline(request.Context())
		if err != nil {
			writeAPIError(writer, http.StatusServiceUnavailable, "dae_outline_unavailable", err.Error())
			return
		}
		writeJSON(writer, http.StatusOK, outline)
	})
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
