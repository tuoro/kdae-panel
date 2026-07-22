package dae

import (
	"context"
	"os"
	"testing"
	"time"
)

func TestUpstreamContract(t *testing.T) {
	binary := os.Getenv("KDAE_CONTRACT_BINARY")
	if binary == "" {
		t.Skip("未设置 KDAE_CONTRACT_BINARY")
	}
	configPath := os.Getenv("KDAE_CONTRACT_CONFIG")
	if configPath == "" {
		t.Fatal("必须设置 KDAE_CONTRACT_CONFIG")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Minute)
	defer cancel()
	client := NewClient(binary)
	report := client.Inspect(ctx)
	if !report.Available || !report.OutlineSupported {
		t.Fatalf("dae 能力探测失败: %+v", report)
	}
	for _, commandName := range []string{"validate", "reload", "suspend", "sysdump", "export"} {
		if !report.Commands[commandName] {
			t.Fatalf("dae 缺少必要命令 %q: %+v", commandName, report.Commands)
		}
	}
	if err := client.Validate(ctx, configPath); err != nil {
		t.Fatalf("上游示例配置校验失败: %v", err)
	}
	dump, err := client.Sysdump(ctx)
	if err != nil {
		t.Fatalf("上游 sysdump 契约失败: %v", err)
	}
	if dump.Filename == "" || len(dump.Content) == 0 {
		t.Fatalf("上游 sysdump 归档无效: filename=%q size=%d", dump.Filename, len(dump.Content))
	}
}
