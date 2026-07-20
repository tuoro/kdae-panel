package app

type Config struct {
	ListenAddress string
	Version       string
}

func DefaultConfig() Config {
	return Config{
		ListenAddress: "127.0.0.1:2023",
		Version:       "dev",
	}
}
