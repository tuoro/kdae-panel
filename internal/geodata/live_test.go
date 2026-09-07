package geodata

import (
	"context"
	"io"
	"log/slog"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/tuoro/kdae-panel/internal/upstream"
)

// liveGitHubToken 与 upstream 包里的同名类型一样，让这些测试走认证额度而不是
// 每出口 IP 每小时 60 次的匿名上限。CI 传的是 Actions 自带的 GITHUB_TOKEN。
type liveGitHubToken struct{}

func (liveGitHubToken) GitHubToken() string { return os.Getenv("KDAE_PANEL_GITHUB_TOKEN") }

// TestLiveGeoUpdate 用真实上游走一遍完整的更新事务：下载、校验、落盘、reload，
// 以及 reload 失败时的还原。需要外网，默认跳过。
//
// 与 upstream 包里的契约测试互补：那边验证"能不能取到并校验通过"，
// 这边验证"取到之后落盘与回滚是否真的正确"。
func TestLiveGeoUpdate(t *testing.T) {
	if os.Getenv("KDAE_UPSTREAM_LIVE") == "" {
		t.Skip("未设置 KDAE_UPSTREAM_LIVE")
	}
	for _, testCase := range []struct {
		name       string
		source     upstream.GeoSource
		reloadFail bool
	}{
		// 两个来源都要跑：v2fly 把两个文件放在两个仓库里，geosite 在上游还叫
		// dlc.dat，这些差异只有对真实上游跑一遍才验证得到。
		{"loyalsoldier 正常路径", upstream.GeoSourceLoyalsoldier, false},
		{"v2fly 正常路径", upstream.GeoSourceV2fly, false},
		{"reload 失败应还原旧数据", upstream.GeoSourceLoyalsoldier, true},
	} {
		t.Run(testCase.name, func(t *testing.T) {
			// 不用 t.TempDir()：它的清理失败会算作测试失败，而这里刚写下 28MB
			// geo 数据又立刻删除，在 Windows 上常因杀软仍持有句柄而清不干净。
			// 清理不是本测试的断言对象，失败只记一行日志。
			directory, err := os.MkdirTemp("", "kdae-geo-live-*")
			if err != nil {
				t.Fatal(err)
			}
			t.Cleanup(func() {
				if err := os.RemoveAll(directory); err != nil {
					t.Logf("清理临时目录失败（不影响断言）: %v", err)
				}
			})
			// 先放一份"旧数据"，用于验证回滚确实能把它放回来
			const old = "OLD-GEO-DATA"
			for _, name := range Names {
				if err := os.WriteFile(filepath.Join(directory, name), []byte(old), 0o644); err != nil {
					t.Fatal(err)
				}
			}
			reloader := &fakeReloader{failFirst: testCase.reloadFail}
			manager, err := New(Options{
				ConfigPath: filepath.Join(directory, "config.dae"),
				StatePath:  filepath.Join(directory, "state.json"),
				Fetcher:    upstream.NewGeoRegistryWithGitHubToken(liveGitHubToken{}),
				Reloader:   reloader,
				Logger:     slog.New(slog.NewTextHandler(io.Discard, nil)),
			})
			if err != nil {
				t.Fatal(err)
			}

			ctx, cancel := context.WithTimeout(context.Background(), 6*time.Minute)
			defer cancel()

			data, err := manager.Download(ctx, testCase.source)
			if err != nil {
				t.Fatalf("下载失败: %v", err)
			}
			t.Logf("已下载并校验 tag=%s geoip=%d geosite=%d", data.Release.Tag,
				len(data.Files[upstream.GeoIPName]), len(data.Files[upstream.GeoSiteName]))

			status, applyErr := manager.Apply(ctx, data)
			if testCase.reloadFail {
				if applyErr == nil {
					t.Fatal("reload 失败时应报错")
				}
				for _, name := range Names {
					content, err := os.ReadFile(filepath.Join(directory, name))
					if err != nil {
						t.Fatal(err)
					}
					if string(content) != old {
						t.Fatalf("%s 未还原，实际 %d 字节", name, len(content))
					}
				}
				if reloader.calls != 2 {
					t.Fatalf("应在还原后再 reload 一次，实际共 %d 次", reloader.calls)
				}
			} else {
				if applyErr != nil {
					t.Fatalf("更新失败: %v", applyErr)
				}
				for _, name := range Names {
					content, err := os.ReadFile(filepath.Join(directory, name))
					if err != nil {
						t.Fatal(err)
					}
					if len(content) != len(data.Files[name]) {
						t.Fatalf("%s 落盘 %d 字节，期望 %d", name, len(content), len(data.Files[name]))
					}
				}
				if status.Managed == nil || status.Managed.Tag != data.Release.Tag {
					t.Fatalf("状态记录异常: %+v", status.Managed)
				}
			}

			// 几十兆的暂存文件与回滚点都不该留在磁盘上
			leftovers, _ := filepath.Glob(filepath.Join(directory, "*.kdae-panel-previous"))
			staged, _ := filepath.Glob(filepath.Join(directory, ".kdae-panel-*"))
			if len(leftovers)+len(staged) != 0 {
				t.Fatalf("留下了临时文件: %v %v", leftovers, staged)
			}
		})
	}
}
