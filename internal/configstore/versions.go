package configstore

import (
	"bytes"
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"
	"unicode/utf8"
)

const (
	sectionVersionsSchema = 1
	maxVersionNameRunes   = 80
	maxSectionBodyBytes   = 2 << 20
)

type SectionKind string

const (
	SectionDNS     SectionKind = "dns"
	SectionRouting SectionKind = "routing"
)

type SectionVersion struct {
	ID        string      `json:"id"`
	Kind      SectionKind `json:"kind"`
	Name      string      `json:"name"`
	Content   string      `json:"content"`
	Hash      string      `json:"hash"`
	CreatedAt time.Time   `json:"createdAt"`
	UpdatedAt time.Time   `json:"updatedAt"`
}

type SectionVersions struct {
	SchemaVersion int              `json:"schemaVersion"`
	Versions      []SectionVersion `json:"versions"`
}

type versionSnapshot struct {
	content []byte
	present bool
}

func (m *Manager) ListSectionVersions(_ context.Context) (SectionVersions, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	return m.readSectionVersions()
}

func (m *Manager) CreateSectionVersion(_ context.Context, kind SectionKind, name, content string) (SectionVersion, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	name, err := validateSectionVersion(kind, name, content)
	if err != nil {
		return SectionVersion{}, err
	}
	set, err := m.readSectionVersions()
	if err != nil {
		return SectionVersion{}, err
	}
	hash := hashBytes([]byte(content))
	for _, version := range set.Versions {
		if version.Kind == kind && strings.EqualFold(version.Name, name) {
			return SectionVersion{}, fmt.Errorf("%w: %s 版本名称已经存在", ErrConflict, kind)
		}
		if version.Kind == kind && version.Hash == hash {
			return SectionVersion{}, fmt.Errorf("%w: 相同的 %s 内容已保存为“%s”", ErrConflict, kind, version.Name)
		}
	}
	id, err := newSectionVersionID()
	if err != nil {
		return SectionVersion{}, err
	}
	now := m.now().UTC()
	version := SectionVersion{
		ID: id, Kind: kind, Name: name, Content: content, Hash: hash,
		CreatedAt: now, UpdatedAt: now,
	}
	set.Versions = append(set.Versions, version)
	if err := m.writeSectionVersions(set); err != nil {
		return SectionVersion{}, err
	}
	return version, nil
}

func (m *Manager) UpdateSectionVersion(_ context.Context, id, name, content string) (SectionVersion, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	set, err := m.readSectionVersions()
	if err != nil {
		return SectionVersion{}, err
	}
	index := -1
	for candidate := range set.Versions {
		if set.Versions[candidate].ID == id {
			index = candidate
			break
		}
	}
	if index < 0 {
		return SectionVersion{}, ErrNotFound
	}
	kind := set.Versions[index].Kind
	name, err = validateSectionVersion(kind, name, content)
	if err != nil {
		return SectionVersion{}, err
	}
	hash := hashBytes([]byte(content))
	for candidate, version := range set.Versions {
		if candidate == index || version.Kind != kind {
			continue
		}
		if strings.EqualFold(version.Name, name) {
			return SectionVersion{}, fmt.Errorf("%w: %s 版本名称已经存在", ErrConflict, kind)
		}
		if version.Hash == hash {
			return SectionVersion{}, fmt.Errorf("%w: 相同的 %s 内容已保存为“%s”", ErrConflict, kind, version.Name)
		}
	}
	updated := set.Versions[index]
	updated.Name = name
	updated.Content = content
	updated.Hash = hash
	updated.UpdatedAt = m.now().UTC()
	set.Versions[index] = updated
	if err := m.writeSectionVersions(set); err != nil {
		return SectionVersion{}, err
	}
	return updated, nil
}

func (m *Manager) DeleteSectionVersion(_ context.Context, id string) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	set, err := m.readSectionVersions()
	if err != nil {
		return err
	}
	versions := set.Versions[:0]
	found := false
	for _, version := range set.Versions {
		if version.ID == id {
			found = true
			continue
		}
		versions = append(versions, version)
	}
	if !found {
		return ErrNotFound
	}
	set.Versions = versions
	return m.writeSectionVersions(set)
}

func validateSectionVersion(kind SectionKind, name, content string) (string, error) {
	if kind != SectionDNS && kind != SectionRouting {
		return "", fmt.Errorf("%w: 配置区块类型无效", ErrInvalid)
	}
	name = strings.TrimSpace(name)
	if name == "" {
		return "", fmt.Errorf("%w: 版本名称不能为空", ErrInvalid)
	}
	if utf8.RuneCountInString(name) > maxVersionNameRunes {
		return "", fmt.Errorf("%w: 版本名称不能超过 %d 个字符", ErrInvalid, maxVersionNameRunes)
	}
	if len(content) > maxSectionBodyBytes {
		return "", fmt.Errorf("%w: 区块内容超过 %d 字节限制", ErrInvalid, maxSectionBodyBytes)
	}
	return name, nil
}

func newSectionVersionID() (string, error) {
	var value [12]byte
	if _, err := rand.Read(value[:]); err != nil {
		return "", fmt.Errorf("生成配置版本标识: %w", err)
	}
	return hex.EncodeToString(value[:]), nil
}

func (m *Manager) sectionVersionsPath() string {
	return filepath.Join(m.backupDir, "versions.json")
}

func (m *Manager) backupVersionsPath(backupID string) string {
	return filepath.Join(m.backupDir, backupID+".versions.json")
}

func (m *Manager) readSectionVersions() (SectionVersions, error) {
	snapshot, err := m.readVersionSnapshot(m.sectionVersionsPath())
	if err != nil {
		return SectionVersions{}, err
	}
	return decodeSectionVersions(snapshot.content)
}

func (m *Manager) readVersionSnapshot(path string) (versionSnapshot, error) {
	content, err := readFileLimited(path)
	if err != nil {
		if os.IsNotExist(err) {
			return versionSnapshot{}, nil
		}
		return versionSnapshot{}, fmt.Errorf("读取配置区块版本: %w", err)
	}
	if _, err := decodeSectionVersions(content); err != nil {
		return versionSnapshot{}, err
	}
	return versionSnapshot{content: content, present: true}, nil
}

func decodeSectionVersions(content []byte) (SectionVersions, error) {
	if len(content) == 0 {
		return SectionVersions{SchemaVersion: sectionVersionsSchema, Versions: []SectionVersion{}}, nil
	}
	var set SectionVersions
	if err := json.Unmarshal(content, &set); err != nil {
		return SectionVersions{}, fmt.Errorf("%w: 配置区块版本文件无法解析", ErrInvalid)
	}
	if set.SchemaVersion != sectionVersionsSchema {
		return SectionVersions{}, fmt.Errorf("%w: 不支持的配置区块版本格式", ErrInvalid)
	}
	seenIDs := make(map[string]struct{}, len(set.Versions))
	seenNames := make(map[SectionKind]map[string]struct{}, 2)
	seenHashes := make(map[SectionKind]map[string]struct{}, 2)
	for index := range set.Versions {
		version := &set.Versions[index]
		name, err := validateSectionVersion(version.Kind, version.Name, version.Content)
		if err != nil {
			return SectionVersions{}, err
		}
		if version.ID == "" {
			return SectionVersions{}, fmt.Errorf("%w: 配置区块版本缺少标识", ErrInvalid)
		}
		if _, exists := seenIDs[version.ID]; exists {
			return SectionVersions{}, fmt.Errorf("%w: 配置区块版本标识重复", ErrInvalid)
		}
		seenIDs[version.ID] = struct{}{}
		version.Name = name
		version.Hash = hashBytes([]byte(version.Content))
		if seenNames[version.Kind] == nil {
			seenNames[version.Kind] = make(map[string]struct{})
			seenHashes[version.Kind] = make(map[string]struct{})
		}
		foldedName := strings.ToLower(version.Name)
		if _, exists := seenNames[version.Kind][foldedName]; exists {
			return SectionVersions{}, fmt.Errorf("%w: %s 版本名称重复", ErrInvalid, version.Kind)
		}
		if _, exists := seenHashes[version.Kind][version.Hash]; exists {
			return SectionVersions{}, fmt.Errorf("%w: %s 版本内容重复", ErrInvalid, version.Kind)
		}
		seenNames[version.Kind][foldedName] = struct{}{}
		seenHashes[version.Kind][version.Hash] = struct{}{}
	}
	if set.Versions == nil {
		set.Versions = []SectionVersion{}
	}
	return set, nil
}

func versionCounts(snapshot versionSnapshot) (int, int, error) {
	set, err := decodeSectionVersions(snapshot.content)
	if err != nil {
		return 0, 0, err
	}
	var dns, routing int
	for _, version := range set.Versions {
		switch version.Kind {
		case SectionDNS:
			dns++
		case SectionRouting:
			routing++
		}
	}
	return dns, routing, nil
}

func versionSnapshotsEqual(left, right versionSnapshot) (bool, error) {
	leftSet, err := decodeSectionVersions(left.content)
	if err != nil {
		return false, err
	}
	rightSet, err := decodeSectionVersions(right.content)
	if err != nil {
		return false, err
	}
	leftContent, err := encodeSectionVersions(leftSet)
	if err != nil {
		return false, err
	}
	rightContent, err := encodeSectionVersions(rightSet)
	if err != nil {
		return false, err
	}
	return bytes.Equal(leftContent, rightContent), nil
}

func encodeSectionVersions(set SectionVersions) ([]byte, error) {
	set.SchemaVersion = sectionVersionsSchema
	if set.Versions == nil {
		set.Versions = []SectionVersion{}
	}
	content, err := json.MarshalIndent(set, "", "  ")
	if err != nil {
		return nil, err
	}
	if len(content) > MaxConfigBytes {
		return nil, fmt.Errorf("%w: 配置区块版本总大小超过 %d 字节限制", ErrInvalid, MaxConfigBytes)
	}
	return content, nil
}

func (m *Manager) writeSectionVersions(set SectionVersions) error {
	content, err := encodeSectionVersions(set)
	if err != nil {
		return err
	}
	return m.writeVersionSnapshot(m.sectionVersionsPath(), versionSnapshot{content: content, present: true})
}

func (m *Manager) writeVersionSnapshot(path string, snapshot versionSnapshot) error {
	if !snapshot.present {
		if err := os.Remove(path); err != nil && !os.IsNotExist(err) {
			return fmt.Errorf("删除配置区块版本: %w", err)
		}
		return nil
	}
	if _, err := decodeSectionVersions(snapshot.content); err != nil {
		return err
	}
	if err := os.MkdirAll(filepath.Dir(path), 0o700); err != nil {
		return fmt.Errorf("创建配置版本目录: %w", err)
	}
	file, err := os.CreateTemp(filepath.Dir(path), ".kdae-panel-versions-*")
	if err != nil {
		return fmt.Errorf("创建配置版本临时文件: %w", err)
	}
	temp := file.Name()
	defer os.Remove(temp)
	if _, err := file.Write(snapshot.content); err != nil {
		_ = file.Close()
		return fmt.Errorf("写入配置区块版本: %w", err)
	}
	if err := file.Chmod(0o600); err != nil {
		_ = file.Close()
		return fmt.Errorf("设置配置区块版本权限: %w", err)
	}
	if err := file.Sync(); err != nil {
		_ = file.Close()
		return fmt.Errorf("同步配置区块版本: %w", err)
	}
	if err := file.Close(); err != nil {
		return fmt.Errorf("关闭配置区块版本: %w", err)
	}
	if err := replaceFile(temp, path); err != nil {
		return fmt.Errorf("替换配置区块版本: %w", err)
	}
	return nil
}
