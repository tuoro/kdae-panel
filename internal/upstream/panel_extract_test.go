package upstream

import (
	"archive/tar"
	"bytes"
	"compress/gzip"
	"context"
	"net/http"
	"strings"
	"testing"
	"time"
)

func TestLatestPanelPreviewReleaseSkipsDraft(t *testing.T) {
	client := testHTTPClient(roundTripFunc(func(request *http.Request) (*http.Response, error) {
		if request.URL.Query().Get("per_page") != "20" {
			t.Fatalf("缺少发布列表页大小: %s", request.URL.String())
		}
		return jsonResponse(http.StatusOK, `[
          {"tag_name":"v9.0.0-secret","draft":true},
          {"tag_name":"v1.1.0-rc.2","draft":false},
          {"tag_name":"v1.0.0","draft":false}
        ]`, nil), nil
	}), time.Now)
	tag, err := latestPanelPreviewRelease(context.Background(), client, "owner", "repo")
	if err != nil {
		t.Fatal(err)
	}
	if tag != "v1.1.0-rc.2" {
		t.Fatalf("预发布通道版本 = %q", tag)
	}
}

func tarball(t *testing.T, entries []tar.Header, contents [][]byte) []byte {
	t.Helper()
	var buffer bytes.Buffer
	zipper := gzip.NewWriter(&buffer)
	writer := tar.NewWriter(zipper)
	for index, header := range entries {
		header.Size = int64(len(contents[index]))
		if err := writer.WriteHeader(&header); err != nil {
			t.Fatal(err)
		}
		if _, err := writer.Write(contents[index]); err != nil {
			t.Fatal(err)
		}
	}
	if err := writer.Close(); err != nil {
		t.Fatal(err)
	}
	if err := zipper.Close(); err != nil {
		t.Fatal(err)
	}
	return buffer.Bytes()
}

// 包内布局是 kdae-panel_linux_<arch>/kdae-panel，目录名含架构，
// 因此只能按基名取；同包里还有脚本与文档，不能取错。
func TestExtractPanelBinary(t *testing.T) {
	archive := tarball(t,
		[]tar.Header{
			{Name: "kdae-panel_linux_amd64/", Typeflag: tar.TypeDir},
			{Name: "kdae-panel_linux_amd64/install.sh", Typeflag: tar.TypeReg},
			{Name: "kdae-panel_linux_amd64/kdae-panel", Typeflag: tar.TypeReg},
		},
		[][]byte{nil, []byte("#!/bin/sh\n"), []byte("\x7fELFbinary")},
	)
	content, err := extractPanelBinary(archive)
	if err != nil {
		t.Fatal(err)
	}
	if string(content) != "\x7fELFbinary" {
		t.Fatalf("取到的内容 = %q", content)
	}
}

// 解包逻辑不该假设输入可信：符号链接与目录穿越都可能把写入引到别处。
// 本仓库自己打的包不含它们，但这段代码处理的是从网络取回的字节。
func TestExtractPanelBinaryRejectsSuspiciousEntries(t *testing.T) {
	traversal := tarball(t,
		[]tar.Header{{Name: "../../etc/kdae-panel", Typeflag: tar.TypeReg}},
		[][]byte{[]byte("\x7fELFevil")},
	)
	if _, err := extractPanelBinary(traversal); err == nil || !strings.Contains(err.Error(), "可疑路径") {
		t.Fatalf("目录穿越应被拒绝，err = %v", err)
	}

	// 符号链接不是常规文件，应被跳过而不是当成二进制读出来
	symlink := tarball(t,
		[]tar.Header{{Name: "pkg/kdae-panel", Typeflag: tar.TypeSymlink, Linkname: "/bin/sh"}},
		[][]byte{nil},
	)
	if _, err := extractPanelBinary(symlink); err == nil || !strings.Contains(err.Error(), "没有找到") {
		t.Fatalf("符号链接不应被当作二进制，err = %v", err)
	}
}

func TestExtractPanelBinaryReportsMissing(t *testing.T) {
	archive := tarball(t,
		[]tar.Header{{Name: "pkg/README.md", Typeflag: tar.TypeReg}},
		[][]byte{[]byte("# hi")},
	)
	if _, err := extractPanelBinary(archive); err == nil || !strings.Contains(err.Error(), "没有找到") {
		t.Fatalf("缺少二进制应明确报错，err = %v", err)
	}
	if _, err := extractPanelBinary([]byte("not a gzip stream")); err == nil {
		t.Fatal("非 gzip 内容应报错")
	}
}

// SHA256SUMS 里列着三个架构的包，必须按资产名取对应那一行。
func TestParsePanelDigest(t *testing.T) {
	sums := strings.Join([]string{
		"1111111111111111111111111111111111111111111111111111111111111111  ./kdae-panel_linux_amd64.tar.gz",
		"2222222222222222222222222222222222222222222222222222222222222222  ./kdae-panel_linux_arm64.tar.gz",
		"3333333333333333333333333333333333333333333333333333333333333333  ./kdae-panel_linux_riscv64.tar.gz",
	}, "\n")

	got, err := parsePanelDigest(sums, "kdae-panel_linux_arm64.tar.gz")
	if err != nil {
		t.Fatal(err)
	}
	if got != strings.Repeat("2", 64) {
		t.Fatalf("取到的摘要 = %s，期望 arm64 那一行", got)
	}
	if _, err := parsePanelDigest(sums, "kdae-panel_linux_mips.tar.gz"); err == nil {
		t.Fatal("清单里没有的资产应报错，而不是回退到第一行")
	}
}

func TestPanelAssetName(t *testing.T) {
	for _, arch := range []string{"amd64", "arm64", "riscv64"} {
		name, err := PanelAssetName(arch)
		if err != nil {
			t.Fatal(err)
		}
		if name != "kdae-panel_linux_"+arch+".tar.gz" {
			t.Fatalf("%s 的资产名 = %s", arch, name)
		}
	}
	// 认不出的架构必须报错：装错架构的二进制起不来，而那时面板已经换掉了自己
	if _, err := PanelAssetName("386"); err == nil {
		t.Fatal("未发布的架构应报错")
	}
}
