package app

type Config struct {
	ListenAddress string
	Version       string
	DaeBinary     string
	DaeConfigPath string
	BackupDir     string
}

func DefaultConfig() Config {
	return Config{
		ListenAddress: "127.0.0.1:2023",
		Version:       "dev",
		DaeBinary:     "dae",
		DaeConfigPath: "/etc/dae/config.dae",
		BackupDir:     "/var/lib/kdae-panel/backups",
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
	if c.DaeBinary == "" {
		c.DaeBinary = defaults.DaeBinary
	}
	if c.DaeConfigPath == "" {
		c.DaeConfigPath = defaults.DaeConfigPath
	}
	if c.BackupDir == "" {
		c.BackupDir = defaults.BackupDir
	}
	return c
}
