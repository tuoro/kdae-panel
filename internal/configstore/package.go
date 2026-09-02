package configstore

import (
	"archive/zip"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"strings"
	"time"
)

const MaxPackageBytes = MaxConfigBytes + (4 << 20)

type BackupPackageExport struct {
	Backup  Backup
	Content []byte
}

type packageManifest struct {
	SchemaVersion int       `json:"schemaVersion"`
	ConfigHash    string    `json:"configHash"`
	Name          string    `json:"name,omitempty"`
	Note          string    `json:"note,omitempty"`
	CreatedAt     time.Time `json:"createdAt"`
}

func (m *Manager) ExportBackupPackage(_ context.Context, backupID string) (BackupPackageExport, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	exported, err := m.backupExportByID(backupID)
	if err != nil {
		return BackupPackageExport{}, err
	}
	versions, err := m.readVersionSnapshot(m.backupVersionsPath(backupID))
	if err != nil {
		return BackupPackageExport{}, err
	}
	if !versions.present {
		empty, encodeErr := encodeSectionVersions(SectionVersions{})
		if encodeErr != nil {
			return BackupPackageExport{}, encodeErr
		}
		versions = versionSnapshot{content: empty, present: true}
	}
	manifest, err := json.MarshalIndent(packageManifest{
		SchemaVersion: 1,
		ConfigHash:    exported.Backup.Hash,
		Name:          exported.Backup.Name,
		Note:          exported.Backup.Note,
		CreatedAt:     exported.Backup.CreatedAt,
	}, "", "  ")
	if err != nil {
		return BackupPackageExport{}, err
	}
	var output bytes.Buffer
	archive := zip.NewWriter(&output)
	for _, file := range []struct {
		name    string
		content []byte
	}{
		{name: "config.dae", content: exported.Content},
		{name: "versions.json", content: versions.content},
		{name: "manifest.json", content: manifest},
	} {
		writer, createErr := archive.Create(file.name)
		if createErr != nil {
			_ = archive.Close()
			return BackupPackageExport{}, fmt.Errorf("创建配置包: %w", createErr)
		}
		if _, writeErr := writer.Write(file.content); writeErr != nil {
			_ = archive.Close()
			return BackupPackageExport{}, fmt.Errorf("写入配置包: %w", writeErr)
		}
	}
	if err := archive.Close(); err != nil {
		return BackupPackageExport{}, fmt.Errorf("完成配置包: %w", err)
	}
	if output.Len() > MaxPackageBytes {
		return BackupPackageExport{}, fmt.Errorf("%w: 配置包超过 %d 字节限制", ErrInvalid, MaxPackageBytes)
	}
	return BackupPackageExport{Backup: exported.Backup, Content: output.Bytes()}, nil
}

func (m *Manager) ImportBackup(ctx context.Context, payload []byte, name, note string) (Backup, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	if len(payload) == 0 || len(payload) > MaxPackageBytes {
		return Backup{}, fmt.Errorf("%w: 导入文件为空或超过大小限制", ErrInvalid)
	}
	configContent := payload
	versions := versionSnapshot{}
	manifest := packageManifest{}
	if len(payload) >= 4 && bytes.Equal(payload[:4], []byte{'P', 'K', 3, 4}) {
		var err error
		configContent, versions, manifest, err = readBackupPackage(payload)
		if err != nil {
			return Backup{}, err
		}
	}
	if len(configContent) > MaxConfigBytes {
		return Backup{}, fmt.Errorf("%w: dae 配置超过大小限制", ErrInvalid)
	}
	if strings.TrimSpace(name) == "" {
		name = manifest.Name
	}
	if strings.TrimSpace(note) == "" {
		note = manifest.Note
	}
	if strings.TrimSpace(name) == "" {
		name = "导入配置"
	}
	metadata, err := validateBackupMetadata(name, note)
	if err != nil {
		return Backup{}, err
	}
	tempPath, cleanup, err := m.writeCandidate(configContent, 0o600)
	if err != nil {
		return Backup{}, err
	}
	defer cleanup()
	if err := m.control.Validate(ctx, tempPath); err != nil {
		return Backup{}, &ValidationError{Cause: err}
	}
	id, err := m.createBackup(configContent, &versions)
	if err != nil {
		return Backup{}, err
	}
	if err := m.writeBackupMetadata(id, metadata); err != nil {
		_ = m.removeBackupFiles(id)
		return Backup{}, err
	}
	return m.backupByID(id)
}

func readBackupPackage(payload []byte) ([]byte, versionSnapshot, packageManifest, error) {
	reader, err := zip.NewReader(bytes.NewReader(payload), int64(len(payload)))
	if err != nil {
		return nil, versionSnapshot{}, packageManifest{}, fmt.Errorf("%w: 配置包无法读取", ErrInvalid)
	}
	var configContent []byte
	var versions versionSnapshot
	var manifest packageManifest
	seen := make(map[string]bool)
	for _, file := range reader.File {
		if file.Name != "config.dae" && file.Name != "versions.json" && file.Name != "manifest.json" {
			continue
		}
		if seen[file.Name] {
			return nil, versionSnapshot{}, packageManifest{}, fmt.Errorf("%w: 配置包包含重复文件", ErrInvalid)
		}
		seen[file.Name] = true
		opened, openErr := file.Open()
		if openErr != nil {
			return nil, versionSnapshot{}, packageManifest{}, fmt.Errorf("%w: 配置包文件无法读取", ErrInvalid)
		}
		content, readErr := io.ReadAll(io.LimitReader(opened, MaxPackageBytes+1))
		_ = opened.Close()
		if readErr != nil || len(content) > MaxPackageBytes {
			return nil, versionSnapshot{}, packageManifest{}, fmt.Errorf("%w: 配置包文件超过大小限制", ErrInvalid)
		}
		switch file.Name {
		case "config.dae":
			configContent = content
		case "versions.json":
			if _, decodeErr := decodeSectionVersions(content); decodeErr != nil {
				return nil, versionSnapshot{}, packageManifest{}, decodeErr
			}
			versions = versionSnapshot{content: content, present: true}
		case "manifest.json":
			if jsonErr := json.Unmarshal(content, &manifest); jsonErr != nil || manifest.SchemaVersion != 1 {
				return nil, versionSnapshot{}, packageManifest{}, fmt.Errorf("%w: 配置包清单无效", ErrInvalid)
			}
		}
	}
	if len(configContent) == 0 {
		return nil, versionSnapshot{}, packageManifest{}, fmt.Errorf("%w: 配置包缺少 config.dae", ErrInvalid)
	}
	if manifest.ConfigHash != "" && manifest.ConfigHash != hashBytes(configContent) {
		return nil, versionSnapshot{}, packageManifest{}, fmt.Errorf("%w: 配置包内容摘要不匹配", ErrInvalid)
	}
	return configContent, versions, manifest, nil
}
