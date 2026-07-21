package app

import "time"

type Config struct {
	ListenAddress  string
	Version        string
	BootstrapToken string
	TrustedProxies string
	DaeBinary      string
	DaeConfigPath  string
	BackupDir      string
	ServiceName    string
	Systemctl      string
	Journalctl     string
	DatabasePath   string
	SessionTTL     time.Duration
	SecureCookie   bool
}

func DefaultConfig() Config {
	return Config{
		ListenAddress:  "127.0.0.1:2023",
		Version:        "dev",
		TrustedProxies: "127.0.0.0/8,::1/128",
		DaeBinary:      "dae",
		DaeConfigPath:  "/etc/dae/config.dae",
		BackupDir:      "/var/lib/kdae-panel/backups",
		ServiceName:    "dae",
		Systemctl:      "systemctl",
		Journalctl:     "journalctl",
		DatabasePath:   "/var/lib/kdae-panel/panel.db",
		SessionTTL:     12 * time.Hour,
	}
}

func (c Config) withDefaults() Config {
	defaults := DefaultConfig()
	if c.ListenAddress == "" {
		c.ListenAddress = defaults.ListenAddress
	}
	if c.Version == "" {
		c.Version = defaults.Version
	}
	if c.TrustedProxies == "" {
		c.TrustedProxies = defaults.TrustedProxies
	}
	if c.DaeBinary == "" {
		c.DaeBinary = defaults.DaeBinary
	}
	if c.DaeConfigPath == "" {
		c.DaeConfigPath = defaults.DaeConfigPath
	}
	if c.BackupDir == "" {
		c.BackupDir = defaults.BackupDir
	}
	if c.ServiceName == "" {
		c.ServiceName = defaults.ServiceName
	}
	if c.Systemctl == "" {
		c.Systemctl = defaults.Systemctl
	}
	if c.Journalctl == "" {
		c.Journalctl = defaults.Journalctl
	}
	if c.DatabasePath == "" {
		c.DatabasePath = defaults.DatabasePath
	}
	if c.SessionTTL <= 0 {
		c.SessionTTL = defaults.SessionTTL
	}
	return c
}
