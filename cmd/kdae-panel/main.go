package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/tuoro/kdae-panel/internal/app"
)

var version = "dev"

func main() {
	if err := run(); err != nil {
		slog.Error("程序退出", "error", err)
		os.Exit(1)
	}
}

func run() error {
	cfg := app.DefaultConfig()
	listen := flag.String("listen", envOr("KDAE_PANEL_LISTEN", cfg.ListenAddress), "HTTP 监听地址")
	daeBinary := flag.String("dae-binary", envOr("KDAE_PANEL_DAE_BINARY", cfg.DaeBinary), "dae 可执行文件路径")
	daeConfig := flag.String("dae-config", envOr("KDAE_PANEL_DAE_CONFIG", cfg.DaeConfigPath), "dae 入口配置文件路径")
	backupDir := flag.String("backup-dir", envOr("KDAE_PANEL_BACKUP_DIR", cfg.BackupDir), "配置备份目录")
	serviceName := flag.String("service-name", envOr("KDAE_PANEL_SERVICE_NAME", cfg.ServiceName), "dae systemd 服务名")
	systemctl := flag.String("systemctl", envOr("KDAE_PANEL_SYSTEMCTL", cfg.Systemctl), "systemctl 可执行文件路径")
	journalctl := flag.String("journalctl", envOr("KDAE_PANEL_JOURNALCTL", cfg.Journalctl), "journalctl 可执行文件路径")
	showVersion := flag.Bool("version", false, "显示版本")
	flag.Parse()

	if *showVersion {
		fmt.Println(version)
		return nil
	}
	cfg.ListenAddress = *listen
	cfg.DaeBinary = *daeBinary
	cfg.DaeConfigPath = *daeConfig
	cfg.BackupDir = *backupDir
	cfg.ServiceName = *serviceName
	cfg.Systemctl = *systemctl
	cfg.Journalctl = *journalctl
	cfg.Version = version

	logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo}))
	slog.SetDefault(logger)

	application, err := app.New(cfg, logger)
	if err != nil {
		return fmt.Errorf("初始化应用: %w", err)
	}

	server := &http.Server{
		Addr:              cfg.ListenAddress,
		Handler:           application.Handler(),
		ReadHeaderTimeout: 10 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	serverErr := make(chan error, 1)
	go func() {
		logger.Info("面板服务已启动", "listen", cfg.ListenAddress, "version", cfg.Version)
		serverErr <- server.ListenAndServe()
	}()

	select {
	case err := <-serverErr:
		if !errors.Is(err, http.ErrServerClosed) {
			return fmt.Errorf("HTTP 服务: %w", err)
		}
		return nil
	case <-ctx.Done():
	}

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := server.Shutdown(shutdownCtx); err != nil {
		return fmt.Errorf("关闭 HTTP 服务: %w", err)
	}
	logger.Info("面板服务已停止")
	return nil
}

func envOr(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
