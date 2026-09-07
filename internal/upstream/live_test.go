package upstream

import (
	"bytes"
	"context"
	"os"
	"strings"
	"testing"
	"time"
)

// liveGitHubToken 让这些测试走认证额度。匿名调用 GitHub API 是每出口 IP
// 每小时 60 次，而 Actions runner 的出口 IP 是共享的——这批测试一次要打
// 四路上游（官方 dae、kdae、Loyalsoldier、v2fly）加面板自身，撞上限只是
// 早晚问题，与当天有没有改代码无关。CI 传的是 Actions 自带的 GITHUB_TOKEN。
type liveGitHubToken struct{}

func (liveGitHubToken) GitHubToken() string { return os.Getenv("KDAE_PANEL_GITHUB_TOKEN") }

// TestLiveUpstream 用真实上游验证版本发现与资产解析的契约。
// 需要外网，默认跳过；CI 的上游契约作业会设置该环境变量来启用。
func TestLiveUpstream(t *testing.T) {
	if os.Getenv("KDAE_UPSTREAM_LIVE") == "" {
		t.Skip("未设置 KDAE_UPSTREAM_LIVE")
	}
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()

	registry := NewDefaultRegistryWithGitHubToken(liveGitHubToken{})
	platform := Platform{Architecture: "x86_64", Name: "x86_64"}

	for _, source := range []Source{SourceOfficial, SourceKdae} {
		versions, err := registry.List(ctx, source, 5)
		if err != nil {
			t.Fatalf("%s: 列出版本失败: %v", source, err)
		}
		if len(versions) == 0 {
			t.Fatalf("%s: 未返回任何版本", source)
		}
		var installable *Version
		for index := range versions {
			if versions[index].Installable {
				installable = &versions[index]
				break
			}
		}
		if installable == nil {
			t.Fatalf("%s: 没有可安装的版本", source)
		}

		asset, err := registry.Resolve(ctx, source, installable.Ref, platform)
		if err != nil {
			t.Fatalf("%s: 解析 %s 的资产失败: %v", source, installable.Ref, err)
		}
		// 没有校验和就不该放行，这是整个信任链的根。
		if len(asset.SHA256) != 64 {
			t.Fatalf("%s: 资产校验和异常 %q", source, asset.SHA256)
		}
		if asset.Platform == "" || asset.URL == "" || asset.Filename == "" {
			t.Fatalf("%s: 资产信息不完整 %+v", source, asset)
		}
		t.Logf("%s %s -> %s (%d 字节, sha256 %s…)",
			source, installable.Label, asset.Filename, asset.Size, asset.SHA256[:12])

		// 必须真的下载并解包：只验证到 Resolve 会漏掉发布包内部结构的变化，
		// 例如可执行文件在包里的实际命名。
		bundle, err := registry.FetchBundle(ctx, asset)
		if err != nil {
			t.Fatalf("%s: 下载并解包 %s 失败: %v", source, installable.Ref, err)
		}
		if len(bundle.Binary) < 4 || string(bundle.Binary[:4]) != "\x7fELF" {
			t.Fatalf("%s: 取出的内容不是 ELF 可执行文件（前 4 字节 %q，共 %d 字节）",
				source, bundle.Binary[:min(4, len(bundle.Binary))], len(bundle.Binary))
		}
		if bundle.Platform != asset.Platform {
			t.Fatalf("%s: 解包后实际构建由 %q 变成 %q", source, asset.Platform, bundle.Platform)
		}
		t.Logf("%s %s 解包出 %d 字节的 ELF 可执行文件；unit=%d geoip=%d geosite=%d",
			source, installable.Label, len(bundle.Binary),
			len(bundle.Unit), len(bundle.GeoIP), len(bundle.GeoSite))

		// 首次安装依赖包内自带这些物料；缺失说明上游打包方式变了，必须及早发现。
		if len(bundle.Unit) == 0 {
			t.Errorf("%s: 发布包内没有 dae.service，首次安装将无法创建服务单元", source)
		}
		if len(bundle.GeoIP) == 0 || len(bundle.GeoSite) == 0 {
			t.Errorf("%s: 发布包内没有 geo 数据文件，用到 geosite/geoip 的配置将无法启动", source)
		}
	}
}

// TestLiveGeoUpstream 验证 geo 数据来源的契约：资产命名、校验和文件的存在与格式。
// 这是唯一能发现上游改名或改格式的地方——一旦改了，一键更新会当场失效。
func TestLiveGeoUpstream(t *testing.T) {
	if os.Getenv("KDAE_UPSTREAM_LIVE") == "" {
		t.Skip("未设置 KDAE_UPSTREAM_LIVE")
	}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)
	defer cancel()

	registry := NewGeoRegistryWithGitHubToken(liveGitHubToken{})
	for _, info := range registry.Sources() {
		t.Run(string(info.Source), func(t *testing.T) {
			release, err := registry.Latest(ctx, info.Source)
			if err != nil {
				t.Fatalf("解析 %v 的最新 geo 发布失败: %v", info.Repositories, err)
			}
			if len(release.Files) != 2 {
				t.Fatalf("应解析出两个 geo 文件，实际 %d 个: %+v", len(release.Files), release.Files)
			}
			t.Logf("%s %s（%s）", info.Source, release.Tag, release.PublishedAt.Format(time.RFC3339))

			data, err := registry.Fetch(ctx, release)
			if err != nil {
				t.Fatalf("下载并校验 geo 数据失败: %v", err)
			}
			for _, name := range []string{GeoIPName, GeoSiteName} {
				content, ok := data.Files[name]
				if !ok {
					t.Fatalf("缺少 %s", name)
				}
				// V2Ray dat 是 protobuf，没有魔数可验；退而检查它不是 HTML 错误页
				// 或空文件——上游改动路径时最典型的表现就是拿回一个 404 页面。
				if len(content) < 1<<20 {
					t.Errorf("%s 只有 %d 字节，不像是真实的 geo 数据", name, len(content))
				}
				if bytes.HasPrefix(bytes.TrimSpace(content), []byte("<")) {
					t.Errorf("%s 看起来是 HTML 而不是 geo 数据", name)
				}
				t.Logf("%s（上游 %s）: %d 字节", name, release.Files[name].Asset, len(content))
			}
		})
	}
}

// TestLivePanelRelease 验证面板自身新版本检查的契约：releases/latest 的
// 响应形状与 tag 命名。tag 不是 vX.Y.Z 时，前端的升级提醒会静默失效。
func TestLivePanelRelease(t *testing.T) {
	if os.Getenv("KDAE_UPSTREAM_LIVE") == "" {
		t.Skip("未设置 KDAE_UPSTREAM_LIVE")
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
	defer cancel()

	// 走内部构造而不是 LatestPanelRelease：后者固定用匿名客户端，在 CI 的共享
	// 出口 IP 上会先撞限流。被验证的契约是响应形状与 tag 命名，与是否带凭据无关。
	client := newHTTPClientWithTokenSource(liveGitHubToken{})
	tag, err := latestPanelRelease(ctx, client, PanelRepoOwner, PanelRepoName)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.HasPrefix(tag, "v") || strings.Count(tag, ".") != 2 {
		t.Fatalf("最新发布 tag = %q，不符合 vX.Y.Z 约定", tag)
	}
}
