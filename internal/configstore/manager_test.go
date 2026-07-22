package configstore

import (
	"context"
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

type fakeController struct {
	validatedContent []string
	reloadCount      int
	validateErr      error
	reloadErr        error
	onValidate       func()
}

func (c *fakeController) Validate(_ context.Context, configPath string) error {
	content, err := os.ReadFile(configPath)
	if err != nil {
		return err
	}
	c.validatedContent = append(c.validatedContent, string(content))
	if c.onValidate != nil {
		c.onValidate()
	}
	if c.validateErr != nil || strings.Contains(string(content), "invalid") {
		if c.validateErr != nil {
			return c.validateErr
		}
		return errors.New("invalid test config")
	}
	return nil
}

func (c *fakeController) Reload(_ context.Context) error {
	c.reloadCount++
	return c.reloadErr
}

func newTestManager(t *testing.T, initial string, controller *fakeController) (*Manager, string) {
	t.Helper()
	dir := t.TempDir()
	entryPath := filepath.Join(dir, "config.dae")
	if initial != "" {
		if err := os.WriteFile(entryPath, []byte(initial), 0600); err != nil {
			t.Fatalf("写入初始配置失败: %v", err)
		}
	}
	manager, err := NewManager(entryPath, filepath.Join(dir, "backups"), controller)
	if err != nil {
		t.Fatalf("创建配置管理器失败: %v", err)
	}
	manager.now = func() time.Time { return time.Date(2026, 7, 21, 1, 2, 3, 4, time.UTC) }
	return manager, entryPath
}

func TestSaveValidatesBacksUpAndReloads(t *testing.T) {
	controller := &fakeController{}
	manager, entryPath := newTestManager(t, "old config", controller)
	oldDocument, err := manager.Read(context.Background())
	if err != nil {
		t.Fatalf("读取初始配置失败: %v", err)
	}

	result, err := manager.Save(context.Background(), "new config", oldDocument.Hash, true)
	if err != nil {
		t.Fatalf("保存配置失败: %v", err)
	}
	if !result.Applied || result.BackupID == "" || controller.reloadCount != 1 {
		t.Fatalf("保存结果异常: result=%+v reload=%d", result, controller.reloadCount)
	}
	content, err := os.ReadFile(entryPath)
	if err != nil {
		t.Fatalf("读取新配置失败: %v", err)
	}
	if string(content) != "new config" {
		t.Fatalf("新配置内容 = %q", content)
	}
	backup, err := os.ReadFile(filepath.Join(manager.backupDir, result.BackupID))
	if err != nil {
		t.Fatalf("读取备份失败: %v", err)
	}
	if string(backup) != "old config" {
		t.Fatalf("备份内容 = %q", backup)
	}
}

func TestSaveRejectsStaleHash(t *testing.T) {
	manager, _ := newTestManager(t, "current", &fakeController{})
	_, err := manager.Save(context.Background(), "new", "stale-hash", false)
	if !errors.Is(err, ErrConflict) {
		t.Fatalf("错误 = %v，期望配置冲突", err)
	}
}

func TestSaveRequiresHashForExistingConfig(t *testing.T) {
	manager, _ := newTestManager(t, "current", &fakeController{})
	_, err := manager.Save(context.Background(), "new", "", false)
	if !errors.Is(err, ErrConflict) {
		t.Fatalf("错误 = %v，期望配置冲突", err)
	}
}

func TestSaveDetectsExternalChangeDuringValidation(t *testing.T) {
	controller := &fakeController{}
	manager, entryPath := newTestManager(t, "current", controller)
	document, err := manager.Read(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	controller.onValidate = func() {
		if err := os.WriteFile(entryPath, []byte("external change"), 0600); err != nil {
			t.Fatalf("写入外部变更失败: %v", err)
		}
	}

	_, err = manager.Save(context.Background(), "candidate", document.Hash, true)
	if !errors.Is(err, ErrConflict) {
		t.Fatalf("错误 = %v，期望配置冲突", err)
	}
	content, _ := os.ReadFile(entryPath)
	if string(content) != "external change" {
		t.Fatalf("外部变更被覆盖为 %q", content)
	}
}

func TestValidationFailureDoesNotChangeConfig(t *testing.T) {
	manager, entryPath := newTestManager(t, "current", &fakeController{})
	document, err := manager.Read(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	_, err = manager.Save(context.Background(), "invalid", document.Hash, true)
	var validationErr *ValidationError
	if !errors.As(err, &validationErr) {
		t.Fatalf("错误 = %v，期望校验错误", err)
	}
	content, _ := os.ReadFile(entryPath)
	if string(content) != "current" {
		t.Fatalf("校验失败后配置被修改为 %q", content)
	}
}

func TestReloadFailureRollsBackDiskConfig(t *testing.T) {
	controller := &fakeController{reloadErr: errors.New("reload failed")}
	manager, entryPath := newTestManager(t, "current", controller)
	document, err := manager.Read(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	result, err := manager.Save(context.Background(), "candidate", document.Hash, true)
	var applyErr *ApplyError
	if !errors.As(err, &applyErr) || !applyErr.RolledBack || !result.RolledBack {
		t.Fatalf("错误或回滚状态异常: result=%+v err=%v", result, err)
	}
	content, _ := os.ReadFile(entryPath)
	if string(content) != "current" {
		t.Fatalf("重载失败后配置 = %q", content)
	}
}

func TestListAndRestoreBackup(t *testing.T) {
	controller := &fakeController{}
	manager, _ := newTestManager(t, "version one", controller)
	first, _ := manager.Read(context.Background())
	saved, err := manager.Save(context.Background(), "version two", first.Hash, false)
	if err != nil {
		t.Fatal(err)
	}
	backups, err := manager.ListBackups(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if len(backups) != 1 || backups[0].ID != saved.BackupID {
		t.Fatalf("备份列表异常: %+v", backups)
	}
	current, _ := manager.Read(context.Background())
	if _, err := manager.Restore(context.Background(), saved.BackupID, current.Hash, false); err != nil {
		t.Fatalf("恢复备份失败: %v", err)
	}
	restored, _ := manager.Read(context.Background())
	if restored.Content != "version one" {
		t.Fatalf("恢复后内容 = %q", restored.Content)
	}
}

func TestBackupRetentionRemovesOldestBackup(t *testing.T) {
	controller := &fakeController{}
	dir := t.TempDir()
	entryPath := filepath.Join(dir, "config.dae")
	if err := os.WriteFile(entryPath, []byte("version one"), 0600); err != nil {
		t.Fatal(err)
	}
	manager, err := NewManagerWithBackupLimits(entryPath, filepath.Join(dir, "backups"), controller, 2, MaxConfigBytes)
	if err != nil {
		t.Fatal(err)
	}
	base := time.Date(2026, 7, 21, 1, 2, 3, 0, time.UTC)
	manager.now = func() time.Time { return base }

	for _, content := range []string{"version two", "version three", "version four"} {
		current, err := manager.Read(context.Background())
		if err != nil {
			t.Fatal(err)
		}
		if _, err := manager.Save(context.Background(), content, current.Hash, false); err != nil {
			t.Fatal(err)
		}
	}
	backups, err := manager.ListBackups(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if len(backups) != 2 {
		t.Fatalf("备份数量 = %d，期望 2", len(backups))
	}
	for _, backup := range backups {
		content, err := os.ReadFile(filepath.Join(manager.backupDir, backup.ID))
		if err != nil {
			t.Fatal(err)
		}
		if string(content) == "version one" {
			t.Fatal("最旧备份没有被清理")
		}
	}
}

func TestRestoreRejectsTraversal(t *testing.T) {
	manager, _ := newTestManager(t, "current", &fakeController{})
	_, err := manager.Restore(context.Background(), "../config.dae", "", false)
	if !errors.Is(err, ErrNotFound) {
		t.Fatalf("错误 = %v，期望不存在", err)
	}
}
