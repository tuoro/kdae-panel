// Package managedsubscription 管理由面板携带指定 User-Agent 拉取的 dae 订阅。
package managedsubscription

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/tuoro/kdae-panel/internal/atomicfile"
	"github.com/tuoro/kdae-panel/internal/subscriptioncache"
)

const (
	maxSubscriptions = 128
	maxBodyBytes     = 10 << 20
	maxUserAgentLen  = 256
)

var validTag = regexp.MustCompile(`^[A-Za-z_][A-Za-z0-9_.-]*$`)

type Definition struct {
	Tag       string `json:"tag"`
	URL       string `json:"url"`
	UserAgent string `json:"userAgent"`
}

type Subscription struct {
	Definition
	LocalURL  string    `json:"localUrl"`
	UpdatedAt time.Time `json:"updatedAt,omitempty"`
	LastError string    `json:"lastError,omitempty"`
}

type state struct {
	Subscriptions []Subscription `json:"subscriptions"`
}

type Manager struct {
	mu       sync.Mutex
	path     string
	cacheDir string
	client   *http.Client
	logger   *slog.Logger
	items    map[string]Subscription
}

func Open(path, daeConfigPath string, logger *slog.Logger) (*Manager, error) {
	if strings.TrimSpace(path) == "" {
		return nil, errors.New("托管订阅状态路径不能为空")
	}
	if strings.TrimSpace(daeConfigPath) == "" {
		return nil, errors.New("dae 配置路径不能为空")
	}
	absConfig, err := filepath.Abs(daeConfigPath)
	if err != nil {
		return nil, fmt.Errorf("解析 dae 配置路径: %w", err)
	}
	manager := &Manager{
		path:     path,
		cacheDir: filepath.Join(filepath.Dir(absConfig), "managed.d"),
		client: &http.Client{
			Timeout: 30 * time.Second,
			CheckRedirect: func(_ *http.Request, via []*http.Request) error {
				if len(via) >= 5 {
					return errors.New("订阅重定向超过 5 次")
				}
				return nil
			},
		},
		logger: logger,
		items:  map[string]Subscription{},
	}
	if err := manager.load(); err != nil {
		return nil, err
	}
	return manager, nil
}

func (m *Manager) load() error {
	content, err := os.ReadFile(m.path)
	if os.IsNotExist(err) {
		return nil
	}
	if err != nil {
		return fmt.Errorf("读取托管订阅设置: %w", err)
	}
	var stored state
	if err := json.Unmarshal(content, &stored); err != nil {
		return fmt.Errorf("解析托管订阅设置: %w", err)
	}
	definitions := make([]Definition, 0, len(stored.Subscriptions))
	for _, item := range stored.Subscriptions {
		definitions = append(definitions, item.Definition)
	}
	if err := validateDefinitions(definitions); err != nil {
		return fmt.Errorf("校验托管订阅设置: %w", err)
	}
	for _, item := range stored.Subscriptions {
		item.LocalURL = m.localURL(item.Definition)
		m.items[item.Tag] = item
	}
	return nil
}

func (m *Manager) List(context.Context) ([]Subscription, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	return m.listLocked(), nil
}

func (m *Manager) Definitions() []Definition {
	m.mu.Lock()
	defer m.mu.Unlock()
	definitions := make([]Definition, 0, len(m.items))
	for _, item := range m.listLocked() {
		definitions = append(definitions, item.Definition)
	}
	return definitions
}

// Prepare 下载并校验一条草稿订阅，但不激活它。缓存名包含定义摘要，保存配置失败时
// 当前配置仍指向旧文件，不会被这次草稿覆盖。
func (m *Manager) Prepare(ctx context.Context, definition Definition) (Subscription, error) {
	definition = normalizeDefinition(definition)
	if err := validateDefinitions([]Definition{definition}); err != nil {
		return Subscription{}, err
	}
	content, err := m.download(ctx, definition)
	if err != nil {
		return Subscription{}, err
	}
	path := m.cachePath(definition)
	if err := atomicfile.Write(path, content, 0o600); err != nil {
		return Subscription{}, fmt.Errorf("保存托管订阅缓存: %w", err)
	}
	return Subscription{Definition: definition, LocalURL: m.localURL(definition), UpdatedAt: time.Now().UTC()}, nil
}

// Activate 只激活已经由 Prepare 生成的定义。返回旧定义，供配置保存失败时恢复。
func (m *Manager) Activate(definitions []Definition) ([]Definition, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	definitions = normalizeDefinitions(definitions)
	if err := validateDefinitions(definitions); err != nil {
		return nil, err
	}
	for _, definition := range definitions {
		info, err := os.Stat(m.cachePath(definition))
		if err != nil {
			return nil, fmt.Errorf("订阅 %s 尚未成功下载: %w", definition.Tag, err)
		}
		if !info.Mode().IsRegular() {
			return nil, fmt.Errorf("订阅 %s 的缓存不是普通文件", definition.Tag)
		}
	}
	previous := make([]Definition, 0, len(m.items))
	for _, item := range m.listLocked() {
		previous = append(previous, item.Definition)
	}
	next := make(map[string]Subscription, len(definitions))
	for _, definition := range definitions {
		item := Subscription{Definition: definition, LocalURL: m.localURL(definition)}
		if current, ok := m.items[definition.Tag]; ok && current.Definition == definition {
			item.UpdatedAt = current.UpdatedAt
			item.LastError = current.LastError
		} else if info, err := os.Stat(m.cachePath(definition)); err == nil {
			item.UpdatedAt = info.ModTime().UTC()
		}
		next[definition.Tag] = item
	}
	old := m.items
	m.items = next
	if err := m.saveLocked(); err != nil {
		m.items = old
		return nil, err
	}
	return previous, nil
}

func (m *Manager) Restore(definitions []Definition) error {
	_, err := m.Activate(definitions)
	return err
}

func (m *Manager) Refresh(ctx context.Context) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	for _, tag := range sortedTags(m.items) {
		item := m.items[tag]
		// 新增或编辑订阅时 Prepare 已经下载过，紧接着的保存并重载不重复访问机场。
		if !item.UpdatedAt.IsZero() && time.Since(item.UpdatedAt) < 10*time.Second {
			continue
		}
		content, err := m.download(ctx, item.Definition)
		if err != nil {
			item.LastError = err.Error()
			m.items[tag] = item
			if m.logger != nil {
				m.logger.Warn("托管订阅刷新失败，继续使用旧缓存", "tag", tag, "error", err)
			}
			continue
		}
		if err := atomicfile.Write(m.cachePath(item.Definition), content, 0o600); err != nil {
			item.LastError = err.Error()
			m.items[tag] = item
			if m.logger != nil {
				m.logger.Warn("托管订阅缓存更新失败，继续使用旧缓存", "tag", tag, "error", err)
			}
			continue
		}
		item.UpdatedAt = time.Now().UTC()
		item.LastError = ""
		m.items[tag] = item
	}
	if err := m.saveLocked(); err != nil {
		return err
	}
	return nil
}

func (m *Manager) download(ctx context.Context, definition Definition) ([]byte, error) {
	request, err := http.NewRequestWithContext(ctx, http.MethodGet, definition.URL, nil)
	if err != nil {
		return nil, fmt.Errorf("创建订阅请求: %w", err)
	}
	request.Header.Set("User-Agent", definition.UserAgent)
	request.Header.Set("Accept", "*/*")
	response, err := m.client.Do(request)
	if err != nil {
		var urlError *url.Error
		if errors.As(err, &urlError) {
			return nil, fmt.Errorf("下载订阅失败: %v", urlError.Err)
		}
		return nil, errors.New("下载订阅失败")
	}
	defer response.Body.Close()
	if response.StatusCode < 200 || response.StatusCode >= 300 {
		return nil, fmt.Errorf("下载订阅返回 HTTP %d", response.StatusCode)
	}
	content, err := io.ReadAll(io.LimitReader(response.Body, maxBodyBytes+1))
	if err != nil {
		return nil, fmt.Errorf("读取订阅响应: %w", err)
	}
	if len(content) > maxBodyBytes {
		return nil, fmt.Errorf("订阅响应超过 %d MiB 上限", maxBodyBytes>>20)
	}
	normalized, count, skipped, err := subscriptioncache.Normalize(content)
	if err != nil {
		return nil, fmt.Errorf("订阅内容无法被 dae 识别: %w", err)
	}
	if m.logger != nil {
		m.logger.Info("托管订阅下载完成", "tag", definition.Tag, "nodes", count, "skipped", skipped)
	}
	return normalized, nil
}

func (m *Manager) saveLocked() error {
	content, err := json.Marshal(state{Subscriptions: m.listLocked()})
	if err != nil {
		return fmt.Errorf("序列化托管订阅设置: %w", err)
	}
	if err := atomicfile.Write(m.path, content, 0o600); err != nil {
		return fmt.Errorf("保存托管订阅设置: %w", err)
	}
	return nil
}

func (m *Manager) listLocked() []Subscription {
	result := make([]Subscription, 0, len(m.items))
	for _, tag := range sortedTags(m.items) {
		result = append(result, m.items[tag])
	}
	return result
}

func sortedTags(items map[string]Subscription) []string {
	tags := make([]string, 0, len(items))
	for tag := range items {
		tags = append(tags, tag)
	}
	sort.Strings(tags)
	return tags
}

func (m *Manager) localURL(definition Definition) string {
	return "file://managed.d/" + filepath.Base(m.cachePath(definition))
}

func (m *Manager) cachePath(definition Definition) string {
	hash := sha256.Sum256([]byte(definition.URL + "\x00" + definition.UserAgent))
	return filepath.Join(m.cacheDir, definition.Tag+"-"+hex.EncodeToString(hash[:8])+".sub")
}

func normalizeDefinitions(definitions []Definition) []Definition {
	result := make([]Definition, len(definitions))
	for index, definition := range definitions {
		result[index] = normalizeDefinition(definition)
	}
	return result
}

func normalizeDefinition(definition Definition) Definition {
	definition.Tag = strings.TrimSpace(definition.Tag)
	definition.URL = strings.TrimSpace(definition.URL)
	definition.UserAgent = strings.TrimSpace(definition.UserAgent)
	return definition
}

func validateDefinitions(definitions []Definition) error {
	if len(definitions) > maxSubscriptions {
		return fmt.Errorf("托管订阅数量超过 %d 个上限", maxSubscriptions)
	}
	seen := make(map[string]struct{}, len(definitions))
	for _, definition := range definitions {
		if !validTag.MatchString(definition.Tag) {
			return fmt.Errorf("订阅标签 %q 无效", definition.Tag)
		}
		if _, exists := seen[definition.Tag]; exists {
			return fmt.Errorf("订阅标签 %s 重复", definition.Tag)
		}
		seen[definition.Tag] = struct{}{}
		parsed, err := url.ParseRequestURI(definition.URL)
		if err != nil || parsed.Host == "" || (parsed.Scheme != "http" && parsed.Scheme != "https") {
			return fmt.Errorf("订阅 %s 仅支持完整的 HTTP/HTTPS 地址", definition.Tag)
		}
		if definition.UserAgent == "" {
			return fmt.Errorf("订阅 %s 的 User-Agent 不能为空", definition.Tag)
		}
		if len(definition.UserAgent) > maxUserAgentLen || strings.ContainsAny(definition.UserAgent, "\r\n") {
			return fmt.Errorf("订阅 %s 的 User-Agent 无效", definition.Tag)
		}
	}
	return nil
}
