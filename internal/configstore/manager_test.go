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

func TestInactiveServiceDefersReloadWithoutRollingBack(t *testing.T) {
	controller := &fakeController{reloadErr: ErrReloadDeferred}
	manager, entryPath := newTestManager(t, "current", controller)
	document, err := manager.Read(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	result, err := manager.Save(context.Background(), "next start", document.Hash, true)
	if err != nil {
		t.Fatalf("停止状态保存不应失败: %v", err)
	}
	if !result.Applied || !result.Deferred || result.RolledBack {
		t.Fatalf("延后生效状态异常: %+v", result)
	}
	content, err := os.ReadFile(entryPath)
	if err != nil || string(content) != "next start" {
		t.Fatalf("延后生效不应回滚磁盘配置: content=%q err=%v", content, err)
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

func TestPreviewBackupValidatesAndShowsDiffWithoutChangingConfiguration(t *testing.T) {
	controller := &fakeController{}
	manager, entryPath := newTestManager(t, "global {\n  log_level: info\n}\n", controller)
	backup, err := manager.CreateBackup(context.Background(), "当前", "")
	if err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(entryPath, []byte("global {\n  log_level: warn\n}\n"), 0o600); err != nil {
		t.Fatal(err)
	}

	preview, err := manager.PreviewBackup(context.Background(), backup.ID)
	if err != nil {
		t.Fatal(err)
	}
	if !preview.Valid || preview.Same || !preview.CurrentPresent || preview.CurrentHash == "" {
		t.Fatalf("预览状态异常: %+v", preview)
	}
	var added, removed bool
	for _, line := range preview.Diff {
		added = added || line.Kind == "add" && strings.Contains(line.Text, "info")
		removed = removed || line.Kind == "remove" && strings.Contains(line.Text, "warn")
	}
	if !added || !removed {
		t.Fatalf("差异方向应为当前配置到存档配置: %+v", preview.Diff)
	}
	content, err := os.ReadFile(entryPath)
	if err != nil || !strings.Contains(string(content), "warn") {
		t.Fatalf("预览不应改动当前配置: %q, %v", content, err)
	}
	if len(controller.validatedContent) == 0 || controller.reloadCount != 0 {
		t.Fatalf("预览应校验但不重载: validate=%v reload=%d", controller.validatedContent, controller.reloadCount)
	}
}

func TestPreviewBackupReportsValidationFailure(t *testing.T) {
	controller := &fakeController{}
	manager, _ := newTestManager(t, "legacy backup", controller)
	backup, err := manager.CreateBackup(context.Background(), "不可用", "")
	if err != nil {
		t.Fatal(err)
	}
	controller.validateErr = errors.New("unknown field legacy_option")

	preview, err := manager.PreviewBackup(context.Background(), backup.ID)
	if err != nil {
		t.Fatal(err)
	}
	if preview.Valid || !strings.Contains(preview.ValidationError, "legacy_option") {
		t.Fatalf("应把校验失败作为预览结果返回: %+v", preview)
	}
}

func TestCompareConfigLinesBoundsHugeLineCount(t *testing.T) {
	content := []byte(strings.Repeat("\n", maxDiffInputLines+1))
	lines, truncated := compareConfigLines(content, []byte("global {}\n"))
	if !truncated || len(lines) != 1 || lines[0].Kind != "skip" {
		t.Fatalf("超大差异应受限: truncated=%t lines=%+v", truncated, lines)
	}
}

func TestNamedBackupCanBeEditedRestoredAndDeleted(t *testing.T) {
	controller := &fakeController{}
	manager, _ := newTestManager(t, "stable config", controller)

	backup, err := manager.CreateBackup(context.Background(), " 稳定线路 ", " 切换前保留 ")
	if err != nil {
		t.Fatal(err)
	}
	if backup.Name != "稳定线路" || backup.Note != "切换前保留" {
		t.Fatalf("存档信息未规范化: %+v", backup)
	}
	content, err := os.ReadFile(filepath.Join(manager.backupDir, backup.ID))
	if err != nil || string(content) != "stable config" {
		t.Fatalf("存档内容异常: content=%q err=%v", content, err)
	}

	updated, err := manager.UpdateBackup(context.Background(), backup.ID, "日常配置", "确认可用")
	if err != nil {
		t.Fatal(err)
	}
	if updated.Name != "日常配置" || updated.Note != "确认可用" {
		t.Fatalf("编辑后的信息异常: %+v", updated)
	}
	exported, err := manager.ExportBackup(context.Background(), backup.ID)
	if err != nil || exported.Backup.Name != "日常配置" || string(exported.Content) != "stable config" {
		t.Fatalf("导出存档异常: export=%+v err=%v", exported, err)
	}
	if _, err := manager.ExportBackup(context.Background(), "../config.dae"); !errors.Is(err, ErrNotFound) {
		t.Fatalf("导出路径穿越错误 = %v", err)
	}
	listed, err := manager.ListBackups(context.Background())
	if err != nil || len(listed) != 1 || listed[0].Name != "日常配置" {
		t.Fatalf("列表未读回元数据: backups=%+v err=%v", listed, err)
	}

	manager.now = func() time.Time { return time.Date(2026, 7, 21, 1, 2, 4, 4, time.UTC) }
	document, _ := manager.Read(context.Background())
	if _, err := manager.Save(context.Background(), "temporary config", document.Hash, false); err != nil {
		t.Fatal(err)
	}
	current, _ := manager.Read(context.Background())
	if _, err := manager.Restore(context.Background(), backup.ID, current.Hash, false); err != nil {
		t.Fatal(err)
	}
	restored, _ := manager.Read(context.Background())
	if restored.Content != "stable config" {
		t.Fatalf("恢复内容 = %q", restored.Content)
	}

	if err := manager.DeleteBackup(context.Background(), backup.ID); err != nil {
		t.Fatal(err)
	}
	if _, err := os.Stat(filepath.Join(manager.backupDir, backup.ID)); !os.IsNotExist(err) {
		t.Fatalf("存档内容未删除: %v", err)
	}
	if _, err := os.Stat(manager.backupMetadataPath(backup.ID)); !os.IsNotExist(err) {
		t.Fatalf("存档元数据未删除: %v", err)
	}
}

func TestBackupMetadataValidationAndTraversal(t *testing.T) {
	manager, _ := newTestManager(t, "current", &fakeController{})
	if _, err := manager.CreateBackup(context.Background(), "   ", ""); !errors.Is(err, ErrInvalid) {
		t.Fatalf("空名称错误 = %v", err)
	}
	if _, err := manager.CreateBackup(context.Background(), strings.Repeat("字", maxBackupNameRunes+1), ""); !errors.Is(err, ErrInvalid) {
		t.Fatalf("过长名称错误 = %v", err)
	}
	if _, err := manager.UpdateBackup(context.Background(), "../config.dae", "名称", ""); !errors.Is(err, ErrNotFound) {
		t.Fatalf("编辑路径穿越错误 = %v", err)
	}
	if err := manager.DeleteBackup(context.Background(), "../config.dae"); !errors.Is(err, ErrNotFound) {
		t.Fatalf("删除路径穿越错误 = %v", err)
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

func TestBackupRetentionRemovesMetadataWithOldestBackup(t *testing.T) {
	controller := &fakeController{}
	dir := t.TempDir()
	entryPath := filepath.Join(dir, "config.dae")
	if err := os.WriteFile(entryPath, []byte("one"), 0o600); err != nil {
		t.Fatal(err)
	}
	manager, err := NewManagerWithBackupLimits(entryPath, filepath.Join(dir, "backups"), controller, 1, MaxConfigBytes)
	if err != nil {
		t.Fatal(err)
	}
	manager.now = func() time.Time { return time.Date(2026, 7, 21, 1, 2, 3, 0, time.UTC) }
	first, err := manager.CreateBackup(context.Background(), "第一份", "")
	if err != nil {
		t.Fatal(err)
	}
	if _, err := manager.Save(context.Background(), "two", hashBytes([]byte("one")), false); err != nil {
		t.Fatal(err)
	}
	if _, err := os.Stat(manager.backupMetadataPath(first.ID)); !os.IsNotExist(err) {
		t.Fatalf("旧存档元数据应随内容清理: %v", err)
	}
}

func TestRestoreRejectsTraversal(t *testing.T) {
	manager, _ := newTestManager(t, "current", &fakeController{})
	_, err := manager.Restore(context.Background(), "../config.dae", "", false)
	if !errors.Is(err, ErrNotFound) {
		t.Fatalf("错误 = %v，期望不存在", err)
	}
}

func TestSectionVersionsAreScopedAndDeduplicated(t *testing.T) {
	manager, _ := newTestManager(t, "global {}", &fakeController{})
	dns, err := manager.CreateSectionVersion(context.Background(), SectionDNS, " 家庭网络 ", "  upstream {}")
	if err != nil {
		t.Fatal(err)
	}
	if dns.Name != "家庭网络" || dns.Kind != SectionDNS || dns.Hash == "" {
		t.Fatalf("DNS 版本异常: %+v", dns)
	}
	if _, err := manager.CreateSectionVersion(context.Background(), SectionDNS, "重复内容", dns.Content); !errors.Is(err, ErrConflict) {
		t.Fatalf("重复内容错误 = %v", err)
	}
	routing, err := manager.CreateSectionVersion(context.Background(), SectionRouting, "家庭网络", "  fallback: direct")
	if err != nil {
		t.Fatal(err)
	}
	updated, err := manager.UpdateSectionVersion(context.Background(), routing.ID, "公司网络", "  fallback: proxy")
	if err != nil || updated.Name != "公司网络" || updated.Content != "  fallback: proxy" {
		t.Fatalf("更新路由版本异常: version=%+v err=%v", updated, err)
	}
	if err := manager.DeleteSectionVersion(context.Background(), dns.ID); err != nil {
		t.Fatal(err)
	}
	listed, err := manager.ListSectionVersions(context.Background())
	if err != nil || len(listed.Versions) != 1 || listed.Versions[0].ID != routing.ID {
		t.Fatalf("版本列表异常: versions=%+v err=%v", listed, err)
	}
}

func TestBackupRestoresBoundSectionVersions(t *testing.T) {
	manager, _ := newTestManager(t, "global {}", &fakeController{})
	dns, err := manager.CreateSectionVersion(context.Background(), SectionDNS, "家庭网络", "  upstream { home: '1.1.1.1' }")
	if err != nil {
		t.Fatal(err)
	}
	backup, err := manager.CreateBackup(context.Background(), "家庭配置", "")
	if err != nil {
		t.Fatal(err)
	}
	if backup.DNSVersions != 1 || backup.RoutingVersions != 0 {
		t.Fatalf("备份版本计数异常: %+v", backup)
	}
	if _, err := manager.UpdateSectionVersion(context.Background(), dns.ID, "公司网络", "  upstream { office: '8.8.8.8' }"); err != nil {
		t.Fatal(err)
	}
	if _, err := manager.CreateSectionVersion(context.Background(), SectionRouting, "公司网络", "  fallback: proxy"); err != nil {
		t.Fatal(err)
	}
	manager.now = func() time.Time { return time.Date(2026, 7, 21, 1, 2, 4, 4, time.UTC) }
	current, _ := manager.Read(context.Background())
	if _, err := manager.Restore(context.Background(), backup.ID, current.Hash, false); err != nil {
		t.Fatal(err)
	}
	versions, err := manager.ListSectionVersions(context.Background())
	if err != nil || len(versions.Versions) != 1 {
		t.Fatalf("恢复后的版本列表异常: %+v err=%v", versions, err)
	}
	if restored := versions.Versions[0]; restored.Name != "家庭网络" || restored.Content != "  upstream { home: '1.1.1.1' }" {
		t.Fatalf("恢复后的 DNS 版本异常: %+v", restored)
	}
}

func TestPreviewDetectsBoundVersionChangesWhenConfigIsUnchanged(t *testing.T) {
	manager, _ := newTestManager(t, "global { log_level: info }", &fakeController{})
	dns, err := manager.CreateSectionVersion(context.Background(), SectionDNS, "家庭网络", "  upstream { home: '1.1.1.1' }")
	if err != nil {
		t.Fatal(err)
	}
	backup, err := manager.CreateBackup(context.Background(), "家庭配置", "")
	if err != nil {
		t.Fatal(err)
	}
	if _, err := manager.UpdateSectionVersion(context.Background(), dns.ID, "公司网络", "  upstream { office: '8.8.8.8' }"); err != nil {
		t.Fatal(err)
	}

	preview, err := manager.PreviewBackup(context.Background(), backup.ID)
	if err != nil {
		t.Fatal(err)
	}
	if !preview.Valid || !preview.ConfigSame || preview.VersionsSame || preview.Same {
		t.Fatalf("预览应识别仅区块版本发生变化: %+v", preview)
	}
}

func TestBackupPackageRoundTripsConfigurationAndVersions(t *testing.T) {
	source, _ := newTestManager(t, "global { log_level: info }", &fakeController{})
	if _, err := source.CreateSectionVersion(context.Background(), SectionDNS, "家庭网络", "  upstream { home: '1.1.1.1' }"); err != nil {
		t.Fatal(err)
	}
	backup, err := source.CreateBackup(context.Background(), "可移植配置", "包含区块版本")
	if err != nil {
		t.Fatal(err)
	}
	exported, err := source.ExportBackupPackage(context.Background(), backup.ID)
	if err != nil || len(exported.Content) < 4 || string(exported.Content[:2]) != "PK" {
		t.Fatalf("导出配置包异常: size=%d err=%v", len(exported.Content), err)
	}

	target, _ := newTestManager(t, "global { log_level: warn }", &fakeController{})
	imported, err := target.ImportBackup(context.Background(), exported.Content, "", "")
	if err != nil {
		t.Fatal(err)
	}
	if imported.Name != "可移植配置" || imported.DNSVersions != 1 {
		t.Fatalf("导入配置包异常: %+v", imported)
	}
	current, _ := target.Read(context.Background())
	if _, err := target.Restore(context.Background(), imported.ID, current.Hash, false); err != nil {
		t.Fatal(err)
	}
	restored, _ := target.Read(context.Background())
	versions, _ := target.ListSectionVersions(context.Background())
	if restored.Content != "global { log_level: info }" || len(versions.Versions) != 1 {
		t.Fatalf("配置包恢复不完整: config=%q versions=%+v", restored.Content, versions)
	}
}
