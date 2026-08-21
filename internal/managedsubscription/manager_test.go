package managedsubscription

import (
	"context"
	"encoding/base64"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"sync/atomic"
	"testing"
	"time"
)

func TestPrepareActivateAndReloadState(t *testing.T) {
	var requests atomic.Int32
	server := httptest.NewServer(http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		requests.Add(1)
		if got := request.Header.Get("User-Agent"); got != "Shadowrocket" {
			http.Error(writer, "unexpected ua", http.StatusForbidden)
			return
		}
		_, _ = writer.Write([]byte(base64.StdEncoding.EncodeToString(
			[]byte("ss://method:password@example.com:443#managed-node\n"))))
	}))
	defer server.Close()

	directory := t.TempDir()
	statePath := filepath.Join(directory, "state", "subscriptions.json")
	manager, err := Open(statePath, filepath.Join(directory, "config.dae"), slog.New(slog.NewTextHandler(io.Discard, nil)))
	if err != nil {
		t.Fatal(err)
	}
	definition := Definition{Tag: "main", URL: server.URL + "/secret-token", UserAgent: "Shadowrocket"}
	prepared, err := manager.Prepare(context.Background(), definition)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.HasPrefix(prepared.LocalURL, "file://managed.d/main-") {
		t.Fatalf("LocalURL = %q", prepared.LocalURL)
	}
	cachePath := filepath.Join(directory, "managed.d", strings.TrimPrefix(prepared.LocalURL, "file://managed.d/"))
	info, err := os.Stat(cachePath)
	if err != nil {
		t.Fatal(err)
	}
	if runtime.GOOS != "windows" && info.Mode().Perm() != 0o600 {
		t.Fatalf("cache mode = %o", info.Mode().Perm())
	}
	if _, err := manager.Activate([]Definition{definition}); err != nil {
		t.Fatal(err)
	}
	if requests.Load() != 1 {
		t.Fatalf("requests = %d", requests.Load())
	}

	reopened, err := Open(statePath, filepath.Join(directory, "config.dae"), nil)
	if err != nil {
		t.Fatal(err)
	}
	items, err := reopened.List(context.Background())
	if err != nil || len(items) != 1 || items[0].Definition != definition || items[0].LocalURL != prepared.LocalURL {
		t.Fatalf("items = %+v, err = %v", items, err)
	}
}

func TestRefreshKeepsLastGoodCache(t *testing.T) {
	var fail atomic.Bool
	server := httptest.NewServer(http.HandlerFunc(func(writer http.ResponseWriter, _ *http.Request) {
		if fail.Load() {
			http.Error(writer, "temporary", http.StatusServiceUnavailable)
			return
		}
		_, _ = writer.Write([]byte(base64.StdEncoding.EncodeToString(
			[]byte("trojan://password@example.com:443#stable-node\n"))))
	}))
	defer server.Close()

	directory := t.TempDir()
	manager, err := Open(filepath.Join(directory, "state.json"), filepath.Join(directory, "config.dae"), nil)
	if err != nil {
		t.Fatal(err)
	}
	definition := Definition{Tag: "stable", URL: server.URL, UserAgent: "FlClash"}
	prepared, err := manager.Prepare(context.Background(), definition)
	if err != nil {
		t.Fatal(err)
	}
	if _, err := manager.Activate([]Definition{definition}); err != nil {
		t.Fatal(err)
	}
	path := filepath.Join(directory, "managed.d", strings.TrimPrefix(prepared.LocalURL, "file://managed.d/"))
	before, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	item := manager.items[definition.Tag]
	item.UpdatedAt = time.Now().Add(-time.Minute)
	manager.items[definition.Tag] = item
	fail.Store(true)
	if err := manager.Refresh(context.Background()); err != nil {
		t.Fatalf("Refresh() = %v", err)
	}
	after, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	if string(after) != string(before) {
		t.Fatal("refresh failure replaced the last good cache")
	}
	items, _ := manager.List(context.Background())
	if len(items) != 1 || !strings.Contains(items[0].LastError, "HTTP 503") {
		t.Fatalf("items = %+v", items)
	}
}

func TestPrepareRejectsUnrecognizedContentAndDoesNotExposeURL(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(writer http.ResponseWriter, _ *http.Request) {
		_, _ = writer.Write([]byte("<html>login required</html>"))
	}))
	defer server.Close()
	directory := t.TempDir()
	manager, err := Open(filepath.Join(directory, "state.json"), filepath.Join(directory, "config.dae"), nil)
	if err != nil {
		t.Fatal(err)
	}
	_, err = manager.Prepare(context.Background(), Definition{
		Tag: "bad", URL: server.URL + "/subscription?token=secret", UserAgent: "Shadowrocket",
	})
	if err == nil || !strings.Contains(err.Error(), "无法被 dae 识别") {
		t.Fatalf("Prepare() = %v", err)
	}

	_, err = manager.Prepare(context.Background(), Definition{
		Tag: "offline", URL: "http://127.0.0.1:1/subscription?token=secret", UserAgent: "Shadowrocket",
	})
	if err == nil {
		t.Fatal("Prepare() unexpectedly succeeded")
	}
	if strings.Contains(err.Error(), "secret") || strings.Contains(err.Error(), "/subscription") {
		t.Fatalf("network error exposed subscription URL: %v", err)
	}
}

func TestPrepareNormalizesClashResponseSelectedByUserAgent(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		if request.Header.Get("User-Agent") != "Clash Verge" {
			http.Error(writer, "unsupported client", http.StatusForbidden)
			return
		}
		_, _ = writer.Write([]byte(`proxies:
  - name: provider-node
    type: trojan
    server: node.example.com
    port: 443
    password: secret
    sni: edge.example.com
`))
	}))
	defer server.Close()

	directory := t.TempDir()
	manager, err := Open(filepath.Join(directory, "state.json"), filepath.Join(directory, "config.dae"), nil)
	if err != nil {
		t.Fatal(err)
	}
	prepared, err := manager.Prepare(context.Background(), Definition{
		Tag: "provider", URL: server.URL, UserAgent: "Clash Verge",
	})
	if err != nil {
		t.Fatal(err)
	}
	path := filepath.Join(directory, "managed.d", strings.TrimPrefix(prepared.LocalURL, "file://managed.d/"))
	content, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	decoded, err := base64.StdEncoding.DecodeString(string(content))
	if err != nil || !strings.Contains(string(decoded), "trojan://") || !strings.Contains(string(decoded), "#provider-node") {
		t.Fatalf("缓存未标准化: content=%q err=%v", content, err)
	}
}
