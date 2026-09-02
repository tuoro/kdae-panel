package configstore

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"time"
	"unicode/utf8"
)

const (
	MaxConfigBytes        = 8 << 20
	defaultMaxBackups     = 50
	defaultMaxBackupBytes = 256 << 20
	maxBackupNameRunes    = 80
	maxBackupNoteRunes    = 500
)

var (
	ErrNotFound = errors.New("配置不存在")
	ErrConflict = errors.New("配置已经被其他操作修改")
	ErrInvalid  = errors.New("配置存档信息无效")
	// ErrReloadDeferred 表示配置已安全落盘，但当前没有运行中的 dae 可以重载。
	// 它不是事务失败：下一次启动会直接读取新配置，因此不能把磁盘内容回滚。
	ErrReloadDeferred = errors.New("dae 当前未运行，配置将在下次启动时生效")
)

type Controller interface {
	Validate(ctx context.Context, configPath string) error
	Reload(ctx context.Context) error
}

type Manager struct {
	entryPath      string
	backupDir      string
	control        Controller
	maxBackups     int
	maxBackupBytes int64
	mu             sync.Mutex
	now            func() time.Time
}

type Document struct {
	Path       string    `json:"path"`
	Content    string    `json:"content"`
	Hash       string    `json:"hash"`
	Size       int64     `json:"size"`
	Mode       string    `json:"mode"`
	ModifiedAt time.Time `json:"modifiedAt"`
}

type SaveResult struct {
	Hash       string    `json:"hash"`
	BackupID   string    `json:"backupId,omitempty"`
	Applied    bool      `json:"applied"`
	Deferred   bool      `json:"deferred,omitempty"`
	SavedAt    time.Time `json:"savedAt"`
	RolledBack bool      `json:"rolledBack"`
}

type Backup struct {
	ID              string    `json:"id"`
	Hash            string    `json:"hash"`
	Size            int64     `json:"size"`
	CreatedAt       time.Time `json:"createdAt"`
	SourcePath      string    `json:"sourcePath"`
	Name            string    `json:"name,omitempty"`
	Note            string    `json:"note,omitempty"`
	DNSVersions     int       `json:"dnsVersions"`
	RoutingVersions int       `json:"routingVersions"`
}

// BackupExport 是配置存档的原始导出内容。
// 内容保持落盘字节不变，名称只用于生成浏览器下载文件名。
type BackupExport struct {
	Backup  Backup
	Content []byte
}

// BackupPreview 是恢复前的只读检查结果。
// CurrentHash 供真正恢复时继续做乐观锁校验，不能省略成“预览通过即可恢复”。
type BackupPreview struct {
	Backup          Backup     `json:"backup"`
	CurrentHash     string     `json:"currentHash"`
	CurrentPresent  bool       `json:"currentPresent"`
	Same            bool       `json:"same"`
	ConfigSame      bool       `json:"configSame"`
	VersionsSame    bool       `json:"versionsSame"`
	Valid           bool       `json:"valid"`
	ValidationError string     `json:"validationError,omitempty"`
	Diff            []DiffLine `json:"diff"`
	DiffTruncated   bool       `json:"diffTruncated,omitempty"`
}

type DiffLine struct {
	Kind      string `json:"kind"`
	OldLine   int    `json:"oldLine,omitempty"`
	NewLine   int    `json:"newLine,omitempty"`
	Text      string `json:"text"`
	SkipCount int    `json:"skipCount,omitempty"`
}

type backupMetadata struct {
	Name string `json:"name"`
	Note string `json:"note,omitempty"`
}

type ValidationError struct {
	Cause error
}

func (e *ValidationError) Error() string {
	return e.Cause.Error()
}

func (e *ValidationError) Unwrap() error {
	return e.Cause
}

type ApplyError struct {
	Cause       error
	RolledBack  bool
	RollbackErr error
}

func (e *ApplyError) Error() string {
	if e.RollbackErr != nil {
		return fmt.Sprintf("%v；配置回滚失败: %v", e.Cause, e.RollbackErr)
	}
	if e.RolledBack {
		return fmt.Sprintf("%v；磁盘配置已回滚", e.Cause)
	}
	return e.Cause.Error()
}

func (e *ApplyError) Unwrap() error {
	return e.Cause
}

func NewManager(entryPath, backupDir string, controller Controller) (*Manager, error) {
	return NewManagerWithBackupLimits(entryPath, backupDir, controller, defaultMaxBackups, defaultMaxBackupBytes)
}

func NewManagerWithBackupLimits(entryPath, backupDir string, controller Controller, maxBackups int, maxBackupBytes int64) (*Manager, error) {
	if strings.TrimSpace(entryPath) == "" {
		return nil, errors.New("dae 入口配置路径不能为空")
	}
	if strings.TrimSpace(backupDir) == "" {
		return nil, errors.New("配置备份目录不能为空")
	}
	if controller == nil {
		return nil, errors.New("dae 控制器不能为空")
	}
	if maxBackups <= 0 || maxBackupBytes <= 0 {
		return nil, errors.New("配置备份保留策略无效")
	}
	absEntry, err := filepath.Abs(entryPath)
	if err != nil {
		return nil, fmt.Errorf("解析入口配置路径: %w", err)
	}
	absBackup, err := filepath.Abs(backupDir)
	if err != nil {
		return nil, fmt.Errorf("解析备份目录: %w", err)
	}
	return &Manager{
		entryPath:      absEntry,
		backupDir:      absBackup,
		control:        controller,
		maxBackups:     maxBackups,
		maxBackupBytes: maxBackupBytes,
		now:            time.Now,
	}, nil
}

func (m *Manager) Read(_ context.Context) (Document, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	return m.readUnlocked()
}

func (m *Manager) Validate(ctx context.Context, content string) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	tempPath, cleanup, err := m.writeCandidate([]byte(content), 0600)
	if err != nil {
		return err
	}
	defer cleanup()
	if err := m.control.Validate(ctx, tempPath); err != nil {
		return &ValidationError{Cause: err}
	}
	return nil
}

func (m *Manager) Save(ctx context.Context, content, expectedHash string, apply bool) (SaveResult, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	return m.saveUnlocked(ctx, content, expectedHash, apply, nil)
}

func (m *Manager) saveUnlocked(
	ctx context.Context,
	content, expectedHash string,
	apply bool,
	backupVersions *versionSnapshot,
) (SaveResult, error) {

	newContent := []byte(content)
	if len(newContent) > MaxConfigBytes {
		return SaveResult{}, fmt.Errorf("配置大小超过 %d 字节限制", MaxConfigBytes)
	}

	oldContent, oldInfo, oldHash, existed, err := m.readCurrentBytes()
	if err != nil {
		return SaveResult{}, err
	}
	if existed && expectedHash == "" {
		return SaveResult{}, ErrConflict
	}
	if !existed && expectedHash != "" {
		return SaveResult{}, ErrConflict
	}
	if expectedHash != "" && expectedHash != oldHash {
		return SaveResult{}, ErrConflict
	}

	mode := os.FileMode(0600)
	if existed {
		mode = oldInfo.Mode().Perm()
	}
	tempPath, cleanup, err := m.writeCandidate(newContent, mode)
	if err != nil {
		return SaveResult{}, err
	}
	// 走 committed 标志而不是把 cleanup 置空：defer 在语句执行时就把函数值存下来了，
	// 事后重新赋值那个变量对已排定的调用毫无影响。
	committed := false
	defer func() {
		if !committed {
			cleanup()
		}
	}()

	if err := m.control.Validate(ctx, tempPath); err != nil {
		return SaveResult{}, &ValidationError{Cause: err}
	}
	latestContent, latestInfo, latestHash, latestExisted, err := m.readCurrentBytes()
	if err != nil {
		return SaveResult{}, err
	}
	if latestExisted != existed || latestHash != oldHash {
		return SaveResult{}, ErrConflict
	}
	if latestExisted {
		oldContent = latestContent
		// 候选文件在 validate 之前就按当时的权限位定型了，而 validate 是个可能跑几秒
		// 的子进程，其间管理员改过权限的话内容哈希不变、乐观锁不报冲突，
		// 换上去就会把这次调整静默还原。这里补一次 chmod。
		if perm := latestInfo.Mode().Perm(); perm != mode {
			mode = perm
			if err := os.Chmod(tempPath, mode); err != nil {
				return SaveResult{}, fmt.Errorf("同步候选配置权限: %w", err)
			}
		}
	}

	backupID := ""
	if existed {
		backupID, err = m.createBackup(oldContent, backupVersions)
		if err != nil {
			return SaveResult{}, err
		}
	}
	if err := replaceFile(tempPath, m.entryPath); err != nil {
		return SaveResult{}, fmt.Errorf("替换 dae 配置: %w", err)
	}
	committed = true

	result := SaveResult{
		Hash:     hashBytes(newContent),
		BackupID: backupID,
		Applied:  apply,
		SavedAt:  m.now().UTC(),
	}
	if !apply {
		return result, nil
	}
	if err := m.control.Reload(ctx); err != nil {
		if errors.Is(err, ErrReloadDeferred) {
			result.Deferred = true
			return result, nil
		}
		rollbackErr := m.rollback(oldContent, mode, existed)
		result.RolledBack = rollbackErr == nil
		return result, &ApplyError{Cause: err, RolledBack: result.RolledBack, RollbackErr: rollbackErr}
	}
	return result, nil
}

func (m *Manager) ListBackups(_ context.Context) ([]Backup, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	entries, err := os.ReadDir(m.backupDir)
	if err != nil {
		if os.IsNotExist(err) {
			return []Backup{}, nil
		}
		return nil, fmt.Errorf("读取配置备份目录: %w", err)
	}
	backups := make([]Backup, 0, len(entries))
	for _, entry := range entries {
		if !strings.HasSuffix(entry.Name(), ".dae") {
			continue
		}
		path := filepath.Join(m.backupDir, entry.Name())
		info, err := entry.Info()
		if err != nil {
			return nil, fmt.Errorf("读取备份信息 %s: %w", entry.Name(), err)
		}
		if !info.Mode().IsRegular() {
			continue
		}
		content, err := readFileLimited(path)
		if err != nil {
			return nil, err
		}
		metadata, err := m.readBackupMetadata(entry.Name())
		if err != nil {
			return nil, err
		}
		versions, err := m.readVersionSnapshot(m.backupVersionsPath(entry.Name()))
		if err != nil {
			return nil, err
		}
		dnsVersions, routingVersions, err := versionCounts(versions)
		if err != nil {
			return nil, err
		}
		backups = append(backups, Backup{
			ID: entry.Name(), Hash: hashBytes(content), Size: info.Size() + int64(len(versions.content)),
			CreatedAt: info.ModTime().UTC(), SourcePath: m.entryPath,
			Name: metadata.Name, Note: metadata.Note,
			DNSVersions: dnsVersions, RoutingVersions: routingVersions,
		})
	}
	sort.Slice(backups, func(i, j int) bool {
		return backups[i].CreatedAt.After(backups[j].CreatedAt)
	})
	return backups, nil
}

// CreateBackup 把当前入口配置保存为用户可辨识的存档。
// 配置内容仍沿用自动备份的格式，名称和备注放在独立元数据文件里，
// 因此旧版本面板仍能恢复这些存档。
func (m *Manager) CreateBackup(_ context.Context, name, note string) (Backup, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	metadata, err := validateBackupMetadata(name, note)
	if err != nil {
		return Backup{}, err
	}
	content, _, _, existed, err := m.readCurrentBytes()
	if err != nil {
		return Backup{}, err
	}
	if !existed {
		return Backup{}, ErrNotFound
	}
	id, err := m.createBackup(content, nil)
	if err != nil {
		return Backup{}, err
	}
	if err := m.writeBackupMetadata(id, metadata); err != nil {
		_ = os.Remove(filepath.Join(m.backupDir, id))
		return Backup{}, err
	}
	return m.backupByID(id)
}

func (m *Manager) UpdateBackup(_ context.Context, backupID, name, note string) (Backup, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	if !validBackupID(backupID) {
		return Backup{}, ErrNotFound
	}
	metadata, err := validateBackupMetadata(name, note)
	if err != nil {
		return Backup{}, err
	}
	if _, err := m.backupByID(backupID); err != nil {
		return Backup{}, err
	}
	if err := m.writeBackupMetadata(backupID, metadata); err != nil {
		return Backup{}, err
	}
	return m.backupByID(backupID)
}

func (m *Manager) DeleteBackup(_ context.Context, backupID string) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	if !validBackupID(backupID) {
		return ErrNotFound
	}
	path := filepath.Join(m.backupDir, backupID)
	info, err := os.Lstat(path)
	if err != nil {
		if os.IsNotExist(err) {
			return ErrNotFound
		}
		return err
	}
	if !info.Mode().IsRegular() {
		return ErrNotFound
	}
	if err := m.removeBackupFiles(backupID); err != nil {
		return err
	}
	if err := syncDirectory(m.backupDir); err != nil {
		return fmt.Errorf("同步配置备份目录: %w", err)
	}
	return nil
}

func (m *Manager) removeBackupFiles(backupID string) error {
	if err := os.Remove(filepath.Join(m.backupDir, backupID)); err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("删除配置存档: %w", err)
	}
	_ = os.Remove(m.backupMetadataPath(backupID))
	_ = os.Remove(m.backupVersionsPath(backupID))
	return nil
}

// ExportBackup 读取一份存档的原始内容，不校验也不修改当前配置。
func (m *Manager) ExportBackup(_ context.Context, backupID string) (BackupExport, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	if !validBackupID(backupID) {
		return BackupExport{}, ErrNotFound
	}
	return m.backupExportByID(backupID)
}

// PreviewBackup 比较存档与当前配置，并用当前 dae 校验存档内容。
// 它只会创建并清理候选临时文件，不替换配置，也不重载服务。
func (m *Manager) PreviewBackup(ctx context.Context, backupID string) (BackupPreview, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	if !validBackupID(backupID) {
		return BackupPreview{}, ErrNotFound
	}
	backup, err := m.backupByID(backupID)
	if err != nil {
		return BackupPreview{}, err
	}
	backupContent, err := readFileLimited(filepath.Join(m.backupDir, backupID))
	if err != nil {
		if os.IsNotExist(err) {
			return BackupPreview{}, ErrNotFound
		}
		return BackupPreview{}, err
	}
	currentContent, _, currentHash, currentPresent, err := m.readCurrentBytes()
	if err != nil {
		return BackupPreview{}, err
	}
	currentVersions, err := m.readVersionSnapshot(m.sectionVersionsPath())
	if err != nil {
		return BackupPreview{}, err
	}
	backupVersions, err := m.readVersionSnapshot(m.backupVersionsPath(backupID))
	if err != nil {
		return BackupPreview{}, err
	}
	versionsSame, err := versionSnapshotsEqual(currentVersions, backupVersions)
	if err != nil {
		return BackupPreview{}, err
	}
	lines, truncated := compareConfigLines(currentContent, backupContent)
	configSame := currentPresent && currentHash == backup.Hash
	preview := BackupPreview{
		Backup:         backup,
		CurrentHash:    currentHash,
		CurrentPresent: currentPresent,
		Same:           configSame && versionsSame,
		ConfigSame:     configSame,
		VersionsSame:   versionsSame,
		Diff:           lines,
		DiffTruncated:  truncated,
	}

	tempPath, cleanup, err := m.writeCandidate(backupContent, 0o600)
	if err != nil {
		return BackupPreview{}, err
	}
	defer cleanup()
	if err := m.control.Validate(ctx, tempPath); err != nil {
		preview.ValidationError = err.Error()
		return preview, nil
	}
	preview.Valid = true
	return preview, nil
}

func (m *Manager) Restore(ctx context.Context, backupID, expectedHash string, apply bool) (SaveResult, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	if !validBackupID(backupID) {
		return SaveResult{}, ErrNotFound
	}
	content, err := readFileLimited(filepath.Join(m.backupDir, backupID))
	if err != nil {
		if os.IsNotExist(err) {
			return SaveResult{}, ErrNotFound
		}
		return SaveResult{}, err
	}
	currentVersions, err := m.readVersionSnapshot(m.sectionVersionsPath())
	if err != nil {
		return SaveResult{}, err
	}
	targetVersions, err := m.readVersionSnapshot(m.backupVersionsPath(backupID))
	if err != nil {
		return SaveResult{}, err
	}
	if err := m.writeVersionSnapshot(m.sectionVersionsPath(), targetVersions); err != nil {
		return SaveResult{}, err
	}
	result, saveErr := m.saveUnlocked(ctx, string(content), expectedHash, apply, &currentVersions)
	if saveErr != nil {
		if restoreErr := m.writeVersionSnapshot(m.sectionVersionsPath(), currentVersions); restoreErr != nil {
			return result, fmt.Errorf("%w；恢复原配置版本失败: %v", saveErr, restoreErr)
		}
	}
	return result, saveErr
}

func validBackupID(backupID string) bool {
	return backupID != "" && filepath.Base(backupID) == backupID && strings.HasSuffix(backupID, ".dae")
}

func validateBackupMetadata(name, note string) (backupMetadata, error) {
	metadata := backupMetadata{Name: strings.TrimSpace(name), Note: strings.TrimSpace(note)}
	if metadata.Name == "" {
		return backupMetadata{}, fmt.Errorf("%w: 名称不能为空", ErrInvalid)
	}
	if utf8.RuneCountInString(metadata.Name) > maxBackupNameRunes {
		return backupMetadata{}, fmt.Errorf("%w: 名称不能超过 %d 个字符", ErrInvalid, maxBackupNameRunes)
	}
	if utf8.RuneCountInString(metadata.Note) > maxBackupNoteRunes {
		return backupMetadata{}, fmt.Errorf("%w: 备注不能超过 %d 个字符", ErrInvalid, maxBackupNoteRunes)
	}
	return metadata, nil
}

func (m *Manager) backupMetadataPath(backupID string) string {
	return filepath.Join(m.backupDir, backupID+".meta.json")
}

func (m *Manager) readBackupMetadata(backupID string) (backupMetadata, error) {
	content, err := readFileLimited(m.backupMetadataPath(backupID))
	if err != nil {
		if os.IsNotExist(err) {
			return backupMetadata{}, nil
		}
		return backupMetadata{}, fmt.Errorf("读取配置存档信息 %s: %w", backupID, err)
	}
	var metadata backupMetadata
	if err := json.Unmarshal(content, &metadata); err != nil {
		return backupMetadata{}, fmt.Errorf("解析配置存档信息 %s: %w", backupID, err)
	}
	metadata, err = validateBackupMetadata(metadata.Name, metadata.Note)
	if err != nil {
		return backupMetadata{}, fmt.Errorf("解析配置存档信息 %s: %w", backupID, err)
	}
	return metadata, nil
}

func (m *Manager) writeBackupMetadata(backupID string, metadata backupMetadata) error {
	content, err := json.Marshal(metadata)
	if err != nil {
		return err
	}
	if err := os.MkdirAll(m.backupDir, 0o700); err != nil {
		return fmt.Errorf("创建配置备份目录: %w", err)
	}
	file, err := os.CreateTemp(m.backupDir, ".kdae-panel-backup-meta-*")
	if err != nil {
		return fmt.Errorf("创建配置存档信息: %w", err)
	}
	temp := file.Name()
	cleanup := func() { _ = os.Remove(temp) }
	defer cleanup()
	if _, err := file.Write(content); err != nil {
		_ = file.Close()
		return fmt.Errorf("写入配置存档信息: %w", err)
	}
	if err := file.Chmod(0o600); err != nil {
		_ = file.Close()
		return fmt.Errorf("设置配置存档信息权限: %w", err)
	}
	if err := file.Sync(); err != nil {
		_ = file.Close()
		return fmt.Errorf("同步配置存档信息: %w", err)
	}
	if err := file.Close(); err != nil {
		return fmt.Errorf("关闭配置存档信息: %w", err)
	}
	if err := replaceFile(temp, m.backupMetadataPath(backupID)); err != nil {
		return fmt.Errorf("替换配置存档信息: %w", err)
	}
	return nil
}

func (m *Manager) backupByID(backupID string) (Backup, error) {
	exported, err := m.backupExportByID(backupID)
	return exported.Backup, err
}

func (m *Manager) backupExportByID(backupID string) (BackupExport, error) {
	path := filepath.Join(m.backupDir, backupID)
	content, err := readFileLimited(path)
	if err != nil {
		if os.IsNotExist(err) {
			return BackupExport{}, ErrNotFound
		}
		return BackupExport{}, err
	}
	info, err := os.Stat(path)
	if err != nil {
		return BackupExport{}, err
	}
	metadata, err := m.readBackupMetadata(backupID)
	if err != nil {
		return BackupExport{}, err
	}
	versions, err := m.readVersionSnapshot(m.backupVersionsPath(backupID))
	if err != nil {
		return BackupExport{}, err
	}
	dnsVersions, routingVersions, err := versionCounts(versions)
	if err != nil {
		return BackupExport{}, err
	}
	return BackupExport{
		Backup: Backup{
			ID: backupID, Hash: hashBytes(content), Size: info.Size() + int64(len(versions.content)),
			CreatedAt: info.ModTime().UTC(), SourcePath: m.entryPath,
			Name: metadata.Name, Note: metadata.Note,
			DNSVersions: dnsVersions, RoutingVersions: routingVersions,
		},
		Content: content,
	}, nil
}

func (m *Manager) readUnlocked() (Document, error) {
	content, info, hash, existed, err := m.readCurrentBytes()
	if err != nil {
		return Document{}, err
	}
	if !existed {
		return Document{}, ErrNotFound
	}
	return Document{
		Path:       m.entryPath,
		Content:    string(content),
		Hash:       hash,
		Size:       info.Size(),
		Mode:       info.Mode().Perm().String(),
		ModifiedAt: info.ModTime().UTC(),
	}, nil
}

func (m *Manager) readCurrentBytes() ([]byte, os.FileInfo, string, bool, error) {
	content, err := readFileLimited(m.entryPath)
	if err != nil {
		if os.IsNotExist(err) {
			return nil, nil, "", false, nil
		}
		return nil, nil, "", false, err
	}
	info, err := os.Stat(m.entryPath)
	if err != nil {
		return nil, nil, "", false, fmt.Errorf("读取配置元数据: %w", err)
	}
	return content, info, hashBytes(content), true, nil
}

func (m *Manager) writeCandidate(content []byte, mode os.FileMode) (string, func(), error) {
	if len(content) > MaxConfigBytes {
		return "", func() {}, fmt.Errorf("配置大小超过 %d 字节限制", MaxConfigBytes)
	}
	dir := filepath.Dir(m.entryPath)
	if err := os.MkdirAll(dir, 0750); err != nil {
		return "", func() {}, fmt.Errorf("创建配置目录: %w", err)
	}
	file, err := os.CreateTemp(dir, ".kdae-panel-*.dae")
	if err != nil {
		return "", func() {}, fmt.Errorf("创建候选配置: %w", err)
	}
	path := file.Name()
	cleanup := func() { _ = os.Remove(path) }
	if _, err := file.Write(content); err != nil {
		_ = file.Close()
		cleanup()
		return "", func() {}, fmt.Errorf("写入候选配置: %w", err)
	}
	if err := file.Chmod(mode); err != nil {
		_ = file.Close()
		cleanup()
		return "", func() {}, fmt.Errorf("设置候选配置权限: %w", err)
	}
	if err := file.Sync(); err != nil {
		_ = file.Close()
		cleanup()
		return "", func() {}, fmt.Errorf("同步候选配置: %w", err)
	}
	if err := file.Close(); err != nil {
		cleanup()
		return "", func() {}, fmt.Errorf("关闭候选配置: %w", err)
	}
	return path, cleanup, nil
}

func (m *Manager) createBackup(content []byte, versions *versionSnapshot) (string, error) {
	if err := os.MkdirAll(m.backupDir, 0700); err != nil {
		return "", fmt.Errorf("创建配置备份目录: %w", err)
	}
	if versions == nil {
		current, err := m.readVersionSnapshot(m.sectionVersionsPath())
		if err != nil {
			return "", err
		}
		versions = &current
	}
	reservedBytes := int64(len(content))
	if versions.present {
		reservedBytes += int64(len(versions.content))
	}
	if err := m.pruneBackups(reservedBytes); err != nil {
		return "", err
	}
	id := m.now().UTC().Format("20060102T150405.000000000Z") + "-" + hashBytes(content)[:12] + ".dae"
	path := filepath.Join(m.backupDir, id)
	file, err := os.OpenFile(path, os.O_CREATE|os.O_EXCL|os.O_WRONLY, 0600)
	if err != nil {
		return "", fmt.Errorf("创建配置备份: %w", err)
	}
	if _, err := file.Write(content); err != nil {
		_ = file.Close()
		_ = os.Remove(path)
		return "", fmt.Errorf("写入配置备份: %w", err)
	}
	if err := file.Sync(); err != nil {
		_ = file.Close()
		_ = os.Remove(path)
		return "", fmt.Errorf("同步配置备份: %w", err)
	}
	if err := file.Close(); err != nil {
		_ = os.Remove(path)
		return "", fmt.Errorf("关闭配置备份: %w", err)
	}
	if versions.present {
		if err := m.writeVersionSnapshot(m.backupVersionsPath(id), *versions); err != nil {
			_ = os.Remove(path)
			return "", err
		}
	}
	if err := syncDirectory(m.backupDir); err != nil {
		return "", fmt.Errorf("同步配置备份目录: %w", err)
	}
	return id, nil
}

func (m *Manager) rollback(content []byte, mode os.FileMode, existed bool) error {
	if !existed {
		if err := os.Remove(m.entryPath); err != nil && !os.IsNotExist(err) {
			return fmt.Errorf("删除失败配置: %w", err)
		}
		if err := syncDirectory(filepath.Dir(m.entryPath)); err != nil {
			return fmt.Errorf("同步配置目录: %w", err)
		}
		return nil
	}
	tempPath, cleanup, err := m.writeCandidate(content, mode)
	if err != nil {
		return err
	}
	committed := false
	defer func() {
		if !committed {
			cleanup()
		}
	}()
	if err := replaceFile(tempPath, m.entryPath); err != nil {
		return fmt.Errorf("恢复原配置: %w", err)
	}
	committed = true
	return nil
}

func readFileLimited(path string) ([]byte, error) {
	info, err := os.Lstat(path)
	if err != nil {
		return nil, err
	}
	if !info.Mode().IsRegular() {
		return nil, fmt.Errorf("文件 %s 不是普通文件", path)
	}
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	content, err := io.ReadAll(io.LimitReader(file, MaxConfigBytes+1))
	if err != nil {
		return nil, fmt.Errorf("读取文件 %s: %w", path, err)
	}
	if len(content) > MaxConfigBytes {
		return nil, fmt.Errorf("文件 %s 超过 %d 字节限制", path, MaxConfigBytes)
	}
	return content, nil
}

type backupFile struct {
	id        string
	size      int64
	createdAt time.Time
}

func (m *Manager) pruneBackups(reservedBytes int64) error {
	entries, err := os.ReadDir(m.backupDir)
	if err != nil {
		return fmt.Errorf("读取配置备份目录: %w", err)
	}
	backups := make([]backupFile, 0, len(entries))
	var total int64
	for _, entry := range entries {
		if !strings.HasSuffix(entry.Name(), ".dae") {
			continue
		}
		info, err := entry.Info()
		if err != nil {
			return fmt.Errorf("读取备份信息 %s: %w", entry.Name(), err)
		}
		if !info.Mode().IsRegular() {
			continue
		}
		backups = append(backups, backupFile{id: entry.Name(), size: info.Size(), createdAt: info.ModTime()})
		total += info.Size()
		if versionInfo, statErr := os.Stat(m.backupVersionsPath(entry.Name())); statErr == nil && versionInfo.Mode().IsRegular() {
			backups[len(backups)-1].size += versionInfo.Size()
			total += versionInfo.Size()
		} else if statErr != nil && !os.IsNotExist(statErr) {
			return fmt.Errorf("读取备份版本信息 %s: %w", entry.Name(), statErr)
		}
	}
	sort.Slice(backups, func(i, j int) bool {
		return backups[i].createdAt.Before(backups[j].createdAt)
	})
	removed := false
	for len(backups) >= m.maxBackups || total+reservedBytes > m.maxBackupBytes {
		if len(backups) == 0 {
			return fmt.Errorf("备份保留上限 %d 字节小于当前候选配置", m.maxBackupBytes)
		}
		oldest := backups[0]
		if err := os.Remove(filepath.Join(m.backupDir, oldest.id)); err != nil {
			return fmt.Errorf("清理旧备份 %s: %w", oldest.id, err)
		}
		_ = os.Remove(m.backupMetadataPath(oldest.id))
		_ = os.Remove(m.backupVersionsPath(oldest.id))
		backups = backups[1:]
		total -= oldest.size
		removed = true
	}
	if removed {
		if err := syncDirectory(m.backupDir); err != nil {
			return fmt.Errorf("同步配置备份目录: %w", err)
		}
	}
	return nil
}

func hashBytes(content []byte) string {
	hash := sha256.Sum256(content)
	return hex.EncodeToString(hash[:])
}
