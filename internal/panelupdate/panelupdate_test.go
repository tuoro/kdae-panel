package panelupdate

import (
	"context"
	"errors"
	"io"
	"log/slog"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/tuoro/kdae-panel/internal/upstream"
)

type fakeFetcher struct {
	latest  string
	binary  upstream.PanelBinary
	err     error
	asked   string
	askedMu sync.Mutex
}

func (f *fakeFetcher) LatestVersion(context.Context) (string, error) {
	return f.latest, nil
}

func (f *fakeFetcher) Binary(_ context.Context, version string) (upstream.PanelBinary, error) {
	f.askedMu.Lock()
	f.asked = version
	f.askedMu.Unlock()
	if f.err != nil {
		return upstream.PanelBinary{}, f.err
	}
	binary := f.binary
	binary.Version = version
	return binary, nil
}

func (f *fakeFetcher) requested() string {
	f.askedMu.Lock()
	defer f.askedMu.Unlock()
	return f.asked
}

type fakeService struct {
	mu       sync.Mutex
	restarts int
	err      error
}

func (s *fakeService) RestartSelf(context.Context) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.restarts++
	return s.err
}

func (s *fakeService) count() int {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.restarts
}

func elfBytes(marker string) []byte {
	return append([]byte(elfMagic), []byte(marker)...)
}

func newTestManager(t *testing.T, fetcher *fakeFetcher, service *fakeService) (*Manager, string) {
	t.Helper()
	directory := t.TempDir()
	binaryPath := filepath.Join(directory, "bin", "kdae-panel")
	if err := os.MkdirAll(filepath.Dir(binaryPath), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(binaryPath, elfBytes("old"), 0o755); err != nil {
		t.Fatal(err)
	}
	manager, err := New(Options{
		Version:    "v0.1.0",
		BinaryPath: binaryPath,
		BackupPath: filepath.Join(directory, "state", "kdae-panel.previous"),
		Enabled:    true,
		Fetcher:    fetcher,
		Service:    service,
		Logger:     slog.New(slog.NewTextHandler(io.Discard, nil)),
	})
	if err != nil {
		t.Fatal(err)
	}
	// 默认让自证通过并报出被写入文件的版本，测试各自按需覆盖
	manager.probe = func(_ context.Context, path string) (string, error) {
		content, err := os.ReadFile(path)
		if err != nil {
			return "", err
		}
		return strings.TrimPrefix(string(content), elfMagic), nil
	}
	return manager, binaryPath
}

func TestPreferencePersistsAcrossManagerRestart(t *testing.T) {
	manager, binaryPath := newTestManager(t, &fakeFetcher{}, &fakeService{})
	if err := os.MkdirAll(filepath.Dir(manager.backupPath), 0o700); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(manager.backupPath, elfBytes("previous"), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := manager.SetEnabled(false); err != nil {
		t.Fatal(err)
	}
	if err := manager.SetChannel(ChannelPreview); err != nil {
		t.Fatal(err)
	}
	if status := manager.Status(context.Background()); status.Enabled || status.Updatable || status.PreviousPath != manager.backupPath || status.Channel != ChannelPreview {
		t.Fatalf("关闭后的状态 = %+v", status)
	}

	reloaded, err := New(Options{
		Version:        "v0.1.0",
		BinaryPath:     binaryPath,
		BackupPath:     manager.backupPath,
		PreferencePath: manager.preferencePath,
		Enabled:        true,
		Fetcher:        &fakeFetcher{},
		Service:        &fakeService{},
		Logger:         slog.New(slog.NewTextHandler(io.Discard, nil)),
	})
	if err != nil {
		t.Fatal(err)
	}
	if status := reloaded.Status(context.Background()); status.Enabled || status.Updatable || status.PreviousPath != manager.backupPath || status.Channel != ChannelPreview {
		t.Fatalf("重启后没有保持关闭状态: %+v", status)
	}
	if err := reloaded.SetEnabled(true); err != nil {
		t.Fatal(err)
	}
	if status := reloaded.Status(context.Background()); !status.Enabled || !status.Updatable || status.Channel != ChannelPreview {
		t.Fatalf("重新开启后的状态 = %+v", status)
	}
}

func TestBrokenPreferenceFallsBackToDeploymentDefault(t *testing.T) {
	directory := t.TempDir()
	preferencePath := filepath.Join(directory, "self-update.json")
	if err := os.WriteFile(preferencePath, []byte(`{"enabled":`), 0o600); err != nil {
		t.Fatal(err)
	}
	binaryPath := filepath.Join(directory, "kdae-panel")
	if err := os.WriteFile(binaryPath, elfBytes("old"), 0o755); err != nil {
		t.Fatal(err)
	}
	manager, err := New(Options{
		Version:        "v0.1.0",
		BinaryPath:     binaryPath,
		BackupPath:     filepath.Join(directory, "kdae-panel.previous"),
		PreferencePath: preferencePath,
		Enabled:        true,
		Fetcher:        &fakeFetcher{},
		Service:        &fakeService{},
		Logger:         slog.New(slog.NewTextHandler(io.Discard, nil)),
	})
	if err != nil {
		t.Fatal(err)
	}
	if status := manager.Status(context.Background()); !status.Enabled || !status.Updatable {
		t.Fatalf("损坏偏好不应覆盖部署默认值: %+v", status)
	}
}

func TestPreferenceWriteFailureDoesNotChangeMemoryState(t *testing.T) {
	manager, _ := newTestManager(t, &fakeFetcher{}, &fakeService{})
	manager.preferencePath = t.TempDir() // 目录不能被原子文件替换。
	if err := manager.SetEnabled(false); err == nil {
		t.Fatal("偏好写入失败时应返回错误")
	}
	if status := manager.Status(context.Background()); !status.Enabled || !status.Updatable {
		t.Fatalf("持久化失败后不应改变内存状态: %+v", status)
	}
}

// 等待 Apply 里那个延后发出的重启请求。
func waitRestart(t *testing.T, service *fakeService, want int) {
	t.Helper()
	deadline := time.Now().Add(5 * time.Second)
	for time.Now().Before(deadline) {
		if service.count() >= want {
			return
		}
		time.Sleep(20 * time.Millisecond)
	}
	t.Fatalf("等待重启请求超时，实际 %d 次，期望 %d 次", service.count(), want)
}

func TestApplyReplacesBinaryBacksUpAndRestarts(t *testing.T) {
	fetcher := &fakeFetcher{latest: "v0.2.0", binary: upstream.PanelBinary{Content: elfBytes("v0.2.0")}}
	service := &fakeService{}
	manager, binaryPath := newTestManager(t, fetcher, service)

	binary, err := manager.Download(context.Background(), "")
	if err != nil {
		t.Fatal(err)
	}
	if fetcher.requested() != "v0.2.0" {
		t.Fatalf("未指定版本时应取最新，实际请求 %q", fetcher.requested())
	}
	if err := manager.Apply(context.Background(), binary); err != nil {
		t.Fatal(err)
	}

	content, err := os.ReadFile(binaryPath)
	if err != nil {
		t.Fatal(err)
	}
	if string(content) != string(elfBytes("v0.2.0")) {
		t.Fatalf("二进制未被替换：%q", content)
	}
	// 自升级没有自动回滚，上一版副本是唯一退路，必须存在且是替换前那一份
	backup, err := os.ReadFile(manager.backupPath)
	if err != nil {
		t.Fatalf("应保留上一版副本: %v", err)
	}
	if string(backup) != string(elfBytes("old")) {
		t.Fatalf("副本内容 = %q，期望替换前的旧版本", backup)
	}
	waitRestart(t, service, 1)
}

// 自证失败必须在替换之前中止：换完再重启就是拿自己做实验，无从补救。
func TestApplyAbortsWhenNewBinaryCannotRun(t *testing.T) {
	fetcher := &fakeFetcher{latest: "v0.2.0", binary: upstream.PanelBinary{Content: elfBytes("v0.2.0")}}
	service := &fakeService{}
	manager, binaryPath := newTestManager(t, fetcher, service)
	manager.probe = func(context.Context, string) (string, error) {
		return "", errors.New("exec format error")
	}

	binary, err := manager.Download(context.Background(), "v0.2.0")
	if err != nil {
		t.Fatal(err)
	}
	err = manager.Apply(context.Background(), binary)
	if err == nil || !strings.Contains(err.Error(), "无法在本机运行") {
		t.Fatalf("应因自证失败而中止，err = %v", err)
	}

	content, _ := os.ReadFile(binaryPath)
	if string(content) != string(elfBytes("old")) {
		t.Fatal("中止后原二进制必须原样保留")
	}
	if _, err := os.Stat(manager.backupPath); !os.IsNotExist(err) {
		t.Fatal("没有替换就不该留下副本")
	}
	if service.count() != 0 {
		t.Fatal("中止后不得重启")
	}
}

// 自证报出的版本与预期不符，说明下载或解包取错了东西，同样必须中止。
func TestApplyAbortsOnVersionMismatch(t *testing.T) {
	fetcher := &fakeFetcher{latest: "v0.2.0", binary: upstream.PanelBinary{Content: elfBytes("v9.9.9")}}
	service := &fakeService{}
	manager, binaryPath := newTestManager(t, fetcher, service)

	binary, err := manager.Download(context.Background(), "v0.2.0")
	if err != nil {
		t.Fatal(err)
	}
	err = manager.Apply(context.Background(), binary)
	if err == nil || !strings.Contains(err.Error(), "与预期的") {
		t.Fatalf("版本不符应中止，err = %v", err)
	}
	content, _ := os.ReadFile(binaryPath)
	if string(content) != string(elfBytes("old")) {
		t.Fatal("中止后原二进制必须原样保留")
	}
	if service.count() != 0 {
		t.Fatal("中止后不得重启")
	}
}

func TestDownloadRejectsSameVersionAndNonELF(t *testing.T) {
	fetcher := &fakeFetcher{latest: "v0.1.0", binary: upstream.PanelBinary{Content: elfBytes("v0.1.0")}}
	manager, _ := newTestManager(t, fetcher, &fakeService{})

	if _, err := manager.Download(context.Background(), "v0.1.0"); err == nil ||
		!strings.Contains(err.Error(), "无需升级") {
		t.Fatalf("升级到当前版本应被拒绝，err = %v", err)
	}

	fetcher.binary = upstream.PanelBinary{Content: []byte("#!/bin/sh\necho hi\n")}
	if _, err := manager.Download(context.Background(), "v0.2.0"); err == nil ||
		!strings.Contains(err.Error(), "不是 Linux 可执行文件") {
		t.Fatalf("非 ELF 内容应被拒绝，err = %v", err)
	}
}

// 目录不可写时必须在状态里说清楚，而不是等到替换那一刻才失败。
func TestStatusReportsUnwritableBinaryDir(t *testing.T) {
	manager, binaryPath := newTestManager(t, &fakeFetcher{}, &fakeService{})
	// 祖先是普通文件而非目录：这条路径永远建不出来
	blocker := filepath.Join(filepath.Dir(filepath.Dir(binaryPath)), "a-file")
	if err := os.WriteFile(blocker, []byte("not a directory"), 0o644); err != nil {
		t.Fatal(err)
	}
	manager.binaryPath = filepath.Join(blocker, "bin", "kdae-panel")

	status := manager.Status(context.Background())
	if status.Updatable {
		t.Fatal("目录不可写时不应报告可升级")
	}
	if !strings.Contains(status.Problem, "ReadWritePaths") {
		t.Fatalf("应指明需要加入 ReadWritePaths: %s", status.Problem)
	}
}

// 重启请求失败时二进制已经替换，不能假装整次任务成功；
// 错误必须明确要求手动重启，同时保留磁盘上的新版本。
func TestApplyReportsRestartFailureAfterReplacement(t *testing.T) {
	fetcher := &fakeFetcher{latest: "v0.2.0", binary: upstream.PanelBinary{Content: elfBytes("v0.2.0")}}
	service := &fakeService{err: errors.New("systemctl 不可用")}
	manager, binaryPath := newTestManager(t, fetcher, service)

	binary, err := manager.Download(context.Background(), "v0.2.0")
	if err != nil {
		t.Fatal(err)
	}
	err = manager.Apply(context.Background(), binary)
	if err == nil || !strings.Contains(err.Error(), "手动重启") {
		t.Fatalf("重启失败应如实返回并给出恢复动作: %v", err)
	}
	content, _ := os.ReadFile(binaryPath)
	if string(content) != string(elfBytes("v0.2.0")) {
		t.Fatal("二进制应已替换")
	}
	if service.count() != 1 {
		t.Fatalf("重启请求次数 = %d，期望 1", service.count())
	}
	status := manager.Status(context.Background())
	if status.Updatable || !strings.Contains(status.Problem, "必须先手动重启") {
		t.Fatalf("重启失败后不得再次升级并覆盖旧版副本: %+v", status)
	}
}

func TestNewRejectsBackupAtBinaryPath(t *testing.T) {
	directory := t.TempDir()
	binaryPath := filepath.Join(directory, "kdae-panel")
	_, err := New(Options{
		Version:    "v0.1.0",
		BinaryPath: binaryPath,
		BackupPath: filepath.Join(directory, ".", "kdae-panel"),
		Fetcher:    &fakeFetcher{},
		Service:    &fakeService{},
	})
	if err == nil || !strings.Contains(err.Error(), "不能使用同一个路径") {
		t.Fatalf("回滚副本覆盖主二进制时应拒绝启动: %v", err)
	}
}

func TestNewRejectsBackupThroughSymlinkedParent(t *testing.T) {
	directory := t.TempDir()
	binaryDir := filepath.Join(directory, "bin")
	if err := os.MkdirAll(binaryDir, 0o755); err != nil {
		t.Fatal(err)
	}
	alias := filepath.Join(directory, "alias")
	if err := os.Symlink(binaryDir, alias); err != nil {
		t.Skipf("当前环境不能创建目录符号链接: %v", err)
	}
	_, err := New(Options{
		Version:    "v0.1.0",
		BinaryPath: filepath.Join(binaryDir, "kdae-panel"),
		BackupPath: filepath.Join(alias, "kdae-panel"),
		Fetcher:    &fakeFetcher{},
		Service:    &fakeService{},
	})
	if err == nil || !strings.Contains(err.Error(), "不能使用同一个路径") {
		t.Fatalf("经符号链接覆盖主二进制时应拒绝启动: %v", err)
	}
}

func TestNewRejectsBackupThroughDanglingSymlink(t *testing.T) {
	directory := t.TempDir()
	binaryDir := filepath.Join(directory, "bin")
	if err := os.MkdirAll(binaryDir, 0o755); err != nil {
		t.Fatal(err)
	}
	dangling := filepath.Join(directory, "dangling")
	if err := os.Symlink(filepath.Join(directory, "missing"), dangling); err != nil {
		t.Skipf("当前环境不能创建目录符号链接: %v", err)
	}
	_, err := New(Options{
		Version:    "v0.1.0",
		BinaryPath: filepath.Join(binaryDir, "kdae-panel"),
		BackupPath: filepath.Join(dangling, "kdae-panel.previous"),
		Fetcher:    &fakeFetcher{},
		Service:    &fakeService{},
	})
	if err == nil || !strings.Contains(err.Error(), "悬空符号链接") {
		t.Fatalf("回滚路径经过悬空符号链接时应拒绝启动: %v", err)
	}
}

func TestStatusRejectsNonRegularBackupTarget(t *testing.T) {
	manager, _ := newTestManager(t, &fakeFetcher{}, &fakeService{})
	if err := os.MkdirAll(manager.backupPath, 0o700); err != nil {
		t.Fatal(err)
	}
	status := manager.Status(context.Background())
	if status.Updatable || !strings.Contains(status.Problem, "不是普通文件") {
		t.Fatalf("目录不能作为回滚副本: %+v", status)
	}
}
