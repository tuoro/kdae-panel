package upstream

import (
	"archive/tar"
	"bytes"
	"compress/gzip"
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"path"
	"runtime"
	"strings"
)

// maxPanelBytes 限制面板发布包的下载量。实测包在 5MB 上下，
// 32MB 留足增长余量的同时挡住无限响应体。
const maxPanelBytes = 32 << 20

// PanelRepoOwner / PanelRepoName 是面板自身的仓库坐标，
// 新版本检查、自升级与一键部署脚本都指向这里。
const (
	PanelRepoOwner = "tuoro"
	PanelRepoName  = "kdae-panel"
)

// LatestPanelRelease 查询面板自身仓库的最新正式发布 tag。
// 用 releases/latest 而不是列表接口：它天然排除预发布与草稿，
// 与一键部署脚本取版本的语义完全一致——提示的正是用户重装会得到的那一版。
func LatestPanelRelease(ctx context.Context, owner, repo string) (string, error) {
	return latestPanelRelease(ctx, newHTTPClient(), owner, repo)
}

// LatestPanelPreviewRelease 查询最近发布的非草稿版本，包含 prerelease。
// GitHub 的 releases 列表按创建时间倒序；预发布通道因此跟随发布者刚发布的测试版，
// 正式版发布后也会自然回到更新的正式版。
func LatestPanelPreviewRelease(ctx context.Context, owner, repo string) (string, error) {
	return latestPanelPreviewRelease(ctx, newHTTPClient(), owner, repo)
}

func latestPanelRelease(ctx context.Context, client *httpClient, owner, repo string) (string, error) {
	var release struct {
		TagName string `json:"tag_name"`
	}
	target := fmt.Sprintf("https://api.github.com/repos/%s/%s/releases/latest", owner, repo)
	if err := client.getJSON(ctx, target, &release); err != nil {
		return "", err
	}
	if release.TagName == "" {
		return "", errors.New("上游响应缺少 tag_name")
	}
	return release.TagName, nil
}

func latestPanelPreviewRelease(ctx context.Context, client *httpClient, owner, repo string) (string, error) {
	var releases []struct {
		TagName string `json:"tag_name"`
		Draft   bool   `json:"draft"`
	}
	target := fmt.Sprintf("https://api.github.com/repos/%s/%s/releases?per_page=20", owner, repo)
	if err := client.getJSON(ctx, target, &releases); err != nil {
		return "", err
	}
	for _, release := range releases {
		if !release.Draft && release.TagName != "" {
			return release.TagName, nil
		}
	}
	return "", errors.New("上游响应中没有可用的非草稿 Release")
}

// PanelFetcher 是面板自升级用的默认上游实现，固定指向本仓库。
type PanelFetcher struct {
	owner  string
	repo   string
	client *httpClient
}

func NewPanelFetcher() *PanelFetcher {
	return NewPanelFetcherWithGitHubToken(emptyGitHubTokenSource{})

}

func NewPanelFetcherWithGitHubToken(source GitHubTokenSource) *PanelFetcher {
	return &PanelFetcher{
		owner: PanelRepoOwner, repo: PanelRepoName,
		client: newHTTPClientWithTokenSource(source),
	}
}

func (f *PanelFetcher) LatestVersion(ctx context.Context) (string, error) {
	return latestPanelRelease(ctx, f.client, f.owner, f.repo)
}

func (f *PanelFetcher) LatestPreviewVersion(ctx context.Context) (string, error) {
	return latestPanelPreviewRelease(ctx, f.client, f.owner, f.repo)
}

func (f *PanelFetcher) Binary(ctx context.Context, version string) (PanelBinary, error) {
	return FetchPanelBinary(ctx, f.owner, f.repo, version)
}

// PanelAssetName 返回本机架构对应的发布包名。
// 认不出架构就报错，绝不猜一个装上去——装错架构的二进制起不来，
// 而那时面板已经把自己换掉了。
func PanelAssetName(goarch string) (string, error) {
	switch goarch {
	case "amd64", "arm64", "riscv64":
		return fmt.Sprintf("kdae-panel_linux_%s.tar.gz", goarch), nil
	default:
		return "", fmt.Errorf("发布包不含 %s 架构（只有 amd64 / arm64 / riscv64）", goarch)
	}
}

// PanelBinary 是校验通过后从发布包里取出的面板可执行文件。
type PanelBinary struct {
	Version string
	Asset   string
	Digest  string
	Content []byte
}

// FetchPanelBinary 下载指定版本的面板发布包，用同一 Release 里的 SHA256SUMS
// 校验，再从中取出可执行文件。
//
// 信任边界与一键部署脚本完全一致：校验和与发布包同处一个 Release，
// 防的是传输损坏与不完整下载，防不住发布者本身。
func FetchPanelBinary(ctx context.Context, owner, repo, version string) (PanelBinary, error) {
	asset, err := PanelAssetName(runtime.GOARCH)
	if err != nil {
		return PanelBinary{}, err
	}
	client := newHTTPClient()
	base := fmt.Sprintf("https://github.com/%s/%s/releases/download/%s", owner, repo, version)

	sums, err := client.getText(ctx, base+"/SHA256SUMS")
	if err != nil {
		return PanelBinary{}, fmt.Errorf("读取 %s 的校验和: %w", version, err)
	}
	expected, err := parsePanelDigest(sums, asset)
	if err != nil {
		return PanelBinary{}, err
	}

	archive, err := client.download(ctx, base+"/"+asset, maxPanelBytes)
	if err != nil {
		return PanelBinary{}, fmt.Errorf("下载 %s: %w", asset, err)
	}
	actual := hex.EncodeToString(sha256Sum(archive))
	if actual != expected {
		return PanelBinary{}, fmt.Errorf("%s 校验和不匹配：期望 %s，实际 %s", asset, expected, actual)
	}

	binary, err := extractPanelBinary(archive)
	if err != nil {
		return PanelBinary{}, err
	}
	return PanelBinary{Version: version, Asset: asset, Digest: actual, Content: binary}, nil
}

func sha256Sum(content []byte) []byte {
	sum := sha256.Sum256(content)
	return sum[:]
}

// parsePanelDigest 从 SHA256SUMS 里取出指定资产那一行的摘要。
//
// 必须按资产名匹配而不是取第一行：清单里列着全部三个架构的包，
// 取错行会让校验对着另一个架构的摘要失败，报错也指不到真正的原因。
func parsePanelDigest(content, asset string) (string, error) {
	for line := range strings.Lines(content) {
		fields := strings.Fields(line)
		if len(fields) < 2 {
			continue
		}
		digest := strings.ToLower(fields[0])
		if len(digest) != 64 || strings.Trim(digest, "0123456789abcdef") != "" {
			continue
		}
		// coreutils 的清单里文件名常带 ./ 前缀，按基名比对
		if path.Base(strings.TrimPrefix(fields[1], "*")) == asset {
			return digest, nil
		}
	}
	return "", fmt.Errorf("SHA256SUMS 里没有 %s 的条目", asset)
}

// extractPanelBinary 从发布包里取出可执行文件。
//
// 包内布局由 build-release.sh 保证：kdae-panel_linux_<arch>/kdae-panel。
// 这里只认基名，不认目录名——目录名含架构，写死等于每加一个架构就要改代码。
//
// 逐项校验条目类型与路径：tar 里的符号链接、目录穿越（../）都可能把解包
// 引到archive 之外，即便本仓库自己打的包不含它们，解包逻辑也不该假设输入可信。
func extractPanelBinary(archive []byte) ([]byte, error) {
	reader, err := gzip.NewReader(bytes.NewReader(archive))
	if err != nil {
		return nil, fmt.Errorf("解压发布包: %w", err)
	}
	defer reader.Close()

	tarReader := tar.NewReader(reader)
	for {
		header, err := tarReader.Next()
		if errors.Is(err, io.EOF) {
			break
		}
		if err != nil {
			return nil, fmt.Errorf("读取发布包: %w", err)
		}
		if header.Typeflag != tar.TypeReg {
			continue
		}
		name := path.Clean(header.Name)
		if strings.HasPrefix(name, "../") || path.IsAbs(name) {
			return nil, fmt.Errorf("发布包内含可疑路径 %q", header.Name)
		}
		if path.Base(name) != "kdae-panel" {
			continue
		}
		content, err := io.ReadAll(io.LimitReader(tarReader, maxPanelBytes+1))
		if err != nil {
			return nil, fmt.Errorf("读取发布包内的可执行文件: %w", err)
		}
		if len(content) > maxPanelBytes {
			return nil, fmt.Errorf("发布包内的可执行文件超过 %d 字节限制", maxPanelBytes)
		}
		return content, nil
	}
	return nil, errors.New("发布包内没有找到 kdae-panel 可执行文件")
}
