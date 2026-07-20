package configstore

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"time"
)

const MaxConfigBytes = 8 << 20

var (
	ErrNotFound = errors.New("配置不存在")
	ErrConflict = errors.New("配置已经被其他操作修改")
)

type Controller interface {
	Validate(ctx context.Context, configPath string) error
	Reload(ctx context.Context) error
}

type Manager struct {
	entryPath string
	backupDir string
	control   Controller
	mu        sync.Mutex
	now       func() time.Time
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
	SavedAt    time.Time `json:"savedAt"`
	RolledBack bool      `json:"rolledBack"`
}

type Backup struct {
	ID         string    `json:"id"`
	Hash       string    `json:"hash"`
	Size       int64     `json:"size"`
	CreatedAt  time.Time `json:"createdAt"`
	SourcePath string    `json:"sourcePath"`
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
	if strings.TrimSpace(entryPath) == "" {
		return nil, errors.New("dae 入口配置路径不能为空")
	}
	if strings.TrimSpace(backupDir) == "" {
		return nil, errors.New("配置备份目录不能为空")
	}
	if controller == nil {
		return nil, errors.New("dae 控制器不能为空")
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
		entryPath: absEntry,
		backupDir: absBackup,
		control:   controller,
		now:       time.Now,
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

	newContent := []byte(content)
	if len(newContent) > MaxConfigBytes {
		return SaveResult{}, fmt.Errorf("配置大小超过 %d 字节限制", MaxConfigBytes)
	}

	oldContent, oldInfo, oldHash, existed, err := m.readCurrentBytes()
	if err != nil {
		return SaveResult{}, err
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
	defer cleanup()

	if err := m.control.Validate(ctx, tempPath); err != nil {
		return SaveResult{}, &ValidationError{Cause: err}
	}

	backupID := ""
	if existed {
		backupID, err = m.createBackup(oldContent)
		if err != nil {
			return SaveResult{}, err
		}
	}
	if err := replaceFile(tempPath, m.entryPath); err != nil {
		return SaveResult{}, fmt.Errorf("替换 dae 配置: %w", err)
	}
	cleanup = func() {}

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
		if entry.IsDir() || !strings.HasSuffix(entry.Name(), ".dae") {
			continue
		}
		path := filepath.Join(m.backupDir, entry.Name())
		info, err := entry.Info()
		if err != nil {
			return nil, fmt.Errorf("读取备份信息 %s: %w", entry.Name(), err)
		}
		content, err := readFileLimited(path)
		if err != nil {
			return nil, err
		}
		backups = append(backups, Backup{
			ID:         entry.Name(),
			Hash:       hashBytes(content),
			Size:       info.Size(),
			CreatedAt:  info.ModTime().UTC(),
			SourcePath: m.entryPath,
		})
	}
	sort.Slice(backups, func(i, j int) bool {
		return backups[i].CreatedAt.After(backups[j].CreatedAt)
	})
	return backups, nil
}

func (m *Manager) Restore(ctx context.Context, backupID, expectedHash string, apply bool) (SaveResult, error) {
	if filepath.Base(backupID) != backupID || !strings.HasSuffix(backupID, ".dae") {
		return SaveResult{}, ErrNotFound
	}
	content, err := readFileLimited(filepath.Join(m.backupDir, backupID))
	if err != nil {
		if os.IsNotExist(err) {
			return SaveResult{}, ErrNotFound
		}
		return SaveResult{}, err
	}
	return m.Save(ctx, string(content), expectedHash, apply)
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
	if err := file.Chmod(mode); err != nil {
		_ = file.Close()
		cleanup()
		return "", func() {}, fmt.Errorf("设置候选配置权限: %w", err)
	}
	if _, err := file.Write(content); err != nil {
		_ = file.Close()
		cleanup()
		return "", func() {}, fmt.Errorf("写入候选配置: %w", err)
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

func (m *Manager) createBackup(content []byte) (string, error) {
	if err := os.MkdirAll(m.backupDir, 0700); err != nil {
		return "", fmt.Errorf("创建配置备份目录: %w", err)
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
	return id, nil
}

func (m *Manager) rollback(content []byte, mode os.FileMode, existed bool) error {
	if !existed {
		if err := os.Remove(m.entryPath); err != nil && !os.IsNotExist(err) {
			return fmt.Errorf("删除失败配置: %w", err)
		}
		return nil
	}
	tempPath, cleanup, err := m.writeCandidate(content, mode)
	if err != nil {
		return err
	}
	defer cleanup()
	if err := replaceFile(tempPath, m.entryPath); err != nil {
		return fmt.Errorf("恢复原配置: %w", err)
	}
	cleanup = func() {}
	return nil
}

func readFileLimited(path string) ([]byte, error) {
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

func hashBytes(content []byte) string {
	hash := sha256.Sum256(content)
	return hex.EncodeToString(hash[:])
}
