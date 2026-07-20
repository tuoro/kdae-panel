package app

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"time"

	"github.com/tuoro/kdae-panel/internal/webui"
)

type App struct {
	handler http.Handler
}

func New(cfg Config, logger *slog.Logger) (*App, error) {
	router := http.NewServeMux()
	router.HandleFunc("GET /api/v1/health", func(writer http.ResponseWriter, request *http.Request) {
		writeJSON(writer, http.StatusOK, map[string]any{
			"status":  "ok",
			"version": cfg.Version,
		})
	})
	router.Handle("/", webui.Handler())

	return &App{handler: recoverer(requestLogger(logger)(router), logger)}, nil
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
