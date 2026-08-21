// Package panelupdate 让面板把自己升级到新版本：下载发布包、校验 sha256、
// 用新二进制自证可执行，再原子替换并请求 systemd 重启自身。
//
// 与 dae 版本管理最大的不同在收尾：被替换、被重启的是当前进程自己。
// 因此这里没有"失败自动回滚"——进程一旦被 systemd 停掉就无从执行补救。
// 应对办法是把风险前移：替换之前先运行新二进制的 -version 让它自证能在
// 这台机器上跑起来，替换时保留上一版副本供人工还原。
package panelupdate

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/tuoro/kdae-panel/internal/atomicfile"
	"github.com/tuoro/kdae-panel/internal/upstream"
)

const (
	// probeTimeout 覆盖新二进制的自证运行。它只打印版本号就退出，一秒都用不上。
	probeTimeout = 15 * time.Second
	// restartDelay 是发出重启请求前留给 HTTP 响应送达的时间。
	// 请求方需要先收到 202 才能开始轮询，否则它看到的是连接被重置。
	restartDelay       = 1500 * time.Millisecond
	elfMagic           = "\x7fELF"
	maxPreferenceBytes = 4 << 10
	ChannelStable      = "stable"
	ChannelPreview     = "preview"
)

// ServiceController 是面板自身 systemd 单元的控制入口。
type ServiceController interface {
	RestartSelf(ctx context.Context) error
}

// Fetcher 取回指定版本的面板二进制，供测试替换。
type Fetcher interface {
	LatestVersion(ctx context.Context) (string, error)
	Binary(ctx context.Context, version string) (upstream.PanelBinary, error)
}

// Status 汇报自升级的可行性与现状。
type Status struct {
	Current    string `json:"current"`
	BinaryPath string `json:"binaryPath"`
	Platform   string `json:"platform"`
	// Enabled 是管理员在界面里保存的选择。关闭时仍返回 Status，界面才能
	// 提供启用入口，而不是把用户赶去 SSH 修改环境文件。
	Enabled bool `json:"enabled"`
	// Channel 默认是 stable；preview 允许版本检查发现 GitHub prerelease。
	Channel string `json:"channel"`
	// Updatable 为假时界面不应给出升级入口，Problem 说明原因。
	Updatable bool   `json:"updatable"`
	Problem   string `json:"problem,omitempty"`
	// PreviousPath 是上一版副本的位置，升级过至少一次后才有。
	PreviousPath string `json:"previousPath,omitempty"`
}

type Options struct {
	// Version 是当前进程的版本号，用于拒绝"升级到自己"。
	Version    string
	BinaryPath string
	// BackupPath 存放被替换掉的上一版二进制。
	BackupPath     string
	PreferencePath string
	Enabled        bool
	Fetcher        Fetcher
	Service        ServiceController
	Logger         *slog.Logger
}

type Manager struct {
	version        string
	binaryPath     string
	backupPath     string
	preferencePath string
	preferenceMu   sync.Mutex
	enabled        atomic.Bool
	preview        atomic.Bool
	fetcher        Fetcher
	service        ServiceController
	logger         *slog.Logger
	// probe 运行新二进制自证；测试替换它以免真的执行文件。
	probe func(ctx context.Context, path string) (string, error)
	// replacementPendingRestart 一旦替换开始就阻止旧进程再次升级。
	// 即便 rename 后的目录同步或 systemctl 失败，重试也不能覆盖唯一的旧版副本。
	replacementPendingRestart atomic.Bool
}

func New(options Options) (*Manager, error) {
	if options.Fetcher == nil {
		return nil, errors.New("上游取回器不能为空")
	}
	if options.Service == nil {
		return nil, errors.New("服务控制器不能为空")
	}
	binaryPath := options.BinaryPath
	if binaryPath == "" {
		// 默认取当前进程自身的路径：面板装在哪就升级哪一个，
		// 比写死 /usr/bin/kdae-panel 更贴合实际部署。
		executable, err := os.Executable()
		if err != nil {
			return nil, fmt.Errorf("定位面板自身可执行文件: %w", err)
		}
		if resolved, err := filepath.EvalSymlinks(executable); err == nil {
			executable = resolved
		}
		binaryPath = executable
	}
	backupPath := options.BackupPath
	if backupPath == "" {
		backupPath = "/var/lib/kdae-panel/kdae-panel.previous"
	}
	same, err := sameDestination(binaryPath, backupPath)
	if err != nil {
		return nil, fmt.Errorf("核对面板二进制与回滚副本路径: %w", err)
	}
	if same {
		return nil, errors.New("面板二进制与回滚副本不能使用同一个路径")
	}
	logger := options.Logger
	if logger == nil {
		logger = slog.Default()
	}
	preferencePath := options.PreferencePath
	if preferencePath == "" {
		preferencePath = filepath.Join(filepath.Dir(backupPath), "self-update.json")
	}
	manager := &Manager{
		version:        options.Version,
		binaryPath:     binaryPath,
		backupPath:     backupPath,
		preferencePath: preferencePath,
		fetcher:        options.Fetcher,
		service:        options.Service,
		logger:         logger,
		probe:          probeVersion,
	}
	manager.enabled.Store(options.Enabled)
	if err := manager.loadPreference(); err != nil {
		// 偏好损坏不应让整个面板无法启动；保留部署配置给出的默认值，用户可在
		// 设置页重新保存并覆盖它。
		logger.Warn("读取面板自升级偏好失败，沿用部署默认值", "error", err)
	}
	return manager, nil
}

func (m *Manager) Status(context.Context) Status {
	status := Status{
		Current:    m.version,
		BinaryPath: m.binaryPath,
		Platform:   runtime.GOOS + "/" + runtime.GOARCH,
		Enabled:    m.enabled.Load(),
		Channel:    m.Channel(),
	}
	backupInfo, backupErr := os.Lstat(m.backupPath)
	switch {
	case backupErr == nil:
		if !backupInfo.Mode().IsRegular() {
			if status.Enabled {
				status.Problem = fmt.Sprintf("回滚副本路径 %s 已存在且不是普通文件", m.backupPath)
				return status
			}
			break
		}
		status.PreviousPath = m.backupPath
	case !os.IsNotExist(backupErr) && status.Enabled:
		status.Problem = fmt.Sprintf("检查回滚副本路径 %s：%v", m.backupPath, backupErr)
		return status
	}
	// 关闭只影响写操作；当前版本、平台和已有回滚副本仍应如实展示。
	if !status.Enabled {
		return status
	}
	if m.replacementPendingRestart.Load() {
		status.Problem = "面板二进制已经进入替换阶段，当前进程必须先手动重启，才能再次升级"
		return status
	}
	// 发布包只有这三个架构；架构对不上时升级必然装出一个跑不起来的二进制
	if _, err := upstream.PanelAssetName(runtime.GOARCH); err != nil {
		status.Problem = err.Error()
		return status
	}
	// 替换靠同目录内的原子改名完成，因此要写的是目录而不是文件本身
	if err := atomicfile.Writable(filepath.Dir(m.binaryPath)); err != nil {
		status.Problem = fmt.Sprintf(
			"面板无法写入 %s：%v；自升级需要在 kdae-panel.service 的 ReadWritePaths 中加入该目录",
			filepath.Dir(m.binaryPath), err)
		return status
	}
	if err := atomicfile.Writable(filepath.Dir(m.backupPath)); err != nil {
		status.Problem = fmt.Sprintf("面板无法写入回滚副本目录 %s：%v", filepath.Dir(m.backupPath), err)
		return status
	}
	status.Updatable = true
	return status
}

// Download 取回目标版本的二进制并完成校验。version 为空表示取最新正式发布。
func (m *Manager) Download(ctx context.Context, version string) (upstream.PanelBinary, error) {
	if version == "" {
		latest, err := m.fetcher.LatestVersion(ctx)
		if err != nil {
			return upstream.PanelBinary{}, fmt.Errorf("查询最新版本: %w", err)
		}
		version = latest
	}
	if version == m.version {
		return upstream.PanelBinary{}, fmt.Errorf("当前已经是 %s，无需升级", version)
	}
	binary, err := m.fetcher.Binary(ctx, version)
	if err != nil {
		return upstream.PanelBinary{}, err
	}
	if !strings.HasPrefix(string(binary.Content), elfMagic) {
		return upstream.PanelBinary{}, errors.New("下载到的不是 Linux 可执行文件")
	}
	return binary, nil
}

// Apply 替换二进制并请求重启自身。
//
// 返回成功只代表"新二进制已就位、重启已排入 systemd 队列"——本进程随后
// 就会收到 SIGTERM，调用方拿到的响应必须在此之前送达。
func (m *Manager) Apply(ctx context.Context, binary upstream.PanelBinary) error {
	status := m.Status(ctx)
	if !status.Enabled {
		return errors.New("面板一键升级已关闭")
	}
	if !status.Updatable {
		return errors.New(status.Problem)
	}

	// 先把新二进制落到目标目录内的临时文件：跨目录改名不是原子操作，
	// 而 /usr/bin 与 /var/lib 常常分属不同文件系统。
	staged, cleanup, err := atomicfile.Stage(filepath.Dir(m.binaryPath), binary.Content, 0o755)
	if err != nil {
		return fmt.Errorf("暂存新版本: %w", err)
	}
	defer cleanup()

	// 让新二进制自证能在这台机器上跑起来。这是替换前最后一道关：
	// 一旦换上去再重启，进程就是它自己，出问题也无从自动补救。
	probeCtx, cancel := context.WithTimeout(ctx, probeTimeout)
	defer cancel()
	reported, err := m.probe(probeCtx, staged)
	if err != nil {
		return fmt.Errorf("新版本无法在本机运行，已放弃升级: %w", err)
	}
	if reported != binary.Version {
		return fmt.Errorf("新版本自报 %q，与预期的 %q 不符，已放弃升级", reported, binary.Version)
	}

	// 保留上一版：自升级没有自动回滚，人工还原是唯一退路，副本必须先于替换就位。
	if err := m.backupCurrent(); err != nil {
		return fmt.Errorf("备份当前版本: %w", err)
	}

	// 从这里开始，即使 Replace 报的是 rename 之后的目录同步失败，也不能再让旧进程
	// 重试升级：磁盘状态可能已经改变，重试会把唯一的旧版副本覆盖成新版本。
	m.replacementPendingRestart.Store(true)
	if err := atomicfile.Replace(staged, m.binaryPath); err != nil {
		return fmt.Errorf("替换可执行文件: %w", err)
	}
	m.logger.Info("面板已替换为新版本，即将重启自身",
		"from", m.version, "to", binary.Version, "binary", m.binaryPath, "backup", m.backupPath)

	// 等待期间仍停留在同步 Apply 路径，调用方因此继续持有全局控制锁：
	// 否则第二次升级会在重启前覆盖回滚副本，配置保存也可能被随后的重启打断。
	// POST 已经返回 202；这里只给响应留出实际送达客户端的时间。
	time.Sleep(restartDelay)
	// 用后台上下文：下载阶段的超时不该在二进制已经替换后阻止重启。
	if err := m.service.RestartSelf(context.Background()); err != nil {
		return fmt.Errorf("新版本已写入 %s，但请求重启面板失败；请手动重启服务：%w",
			m.binaryPath, err)
	}
	return nil
}

type preference struct {
	Enabled bool   `json:"enabled"`
	Channel string `json:"channel,omitempty"`
}

// SetEnabled 保存界面里的开关。先持久化再切换内存状态，磁盘失败时界面不会
// 显示一个重启后就丢失的假成功。
func (m *Manager) SetEnabled(enabled bool) error {
	m.preferenceMu.Lock()
	defer m.preferenceMu.Unlock()
	return m.savePreference(enabled, m.Channel())
}

// SetChannel 保存更新通道。预发布通道只改变版本发现，不降低下载与替换校验。
func (m *Manager) SetChannel(channel string) error {
	if channel != ChannelStable && channel != ChannelPreview {
		return fmt.Errorf("未知面板更新通道 %q", channel)
	}
	m.preferenceMu.Lock()
	defer m.preferenceMu.Unlock()
	return m.savePreference(m.enabled.Load(), channel)
}

func (m *Manager) Channel() string {
	if m.preview.Load() {
		return ChannelPreview
	}
	return ChannelStable
}

func (m *Manager) savePreference(enabled bool, channel string) error {
	encoded, err := json.Marshal(preference{Enabled: enabled, Channel: channel})
	if err != nil {
		return err
	}
	if err := atomicfile.Write(m.preferencePath, encoded, 0o600); err != nil {
		return fmt.Errorf("保存面板自升级偏好: %w", err)
	}
	m.enabled.Store(enabled)
	m.preview.Store(channel == ChannelPreview)
	return nil
}

func (m *Manager) loadPreference() error {
	info, err := os.Lstat(m.preferencePath)
	if os.IsNotExist(err) {
		return nil
	}
	if err != nil {
		return err
	}
	if !info.Mode().IsRegular() || info.Mode()&os.ModeSymlink != 0 {
		return fmt.Errorf("%s 不是普通文件", m.preferencePath)
	}
	if info.Size() <= 0 || info.Size() > maxPreferenceBytes {
		return fmt.Errorf("%s 大小 %d 非法", m.preferencePath, info.Size())
	}
	content, err := os.ReadFile(m.preferencePath)
	if err != nil {
		return err
	}
	var saved preference
	if err := json.Unmarshal(content, &saved); err != nil {
		return fmt.Errorf("解析 %s: %w", m.preferencePath, err)
	}
	m.enabled.Store(saved.Enabled)
	switch saved.Channel {
	case "", ChannelStable:
		m.preview.Store(false)
	case ChannelPreview:
		m.preview.Store(true)
	default:
		return fmt.Errorf("解析 %s: 未知面板更新通道 %q", m.preferencePath, saved.Channel)
	}
	return nil
}

func sameDestination(left, right string) (bool, error) {
	leftResolved, err := resolvedDestination(left)
	if err != nil {
		return false, err
	}
	rightResolved, err := resolvedDestination(right)
	if err != nil {
		return false, err
	}
	return leftResolved == rightResolved, nil
}

// resolvedDestination 解析已存在祖先里的符号链接，再把尚不存在的尾部接回去。
// 只对完整路径做 EvalSymlinks 会在回滚文件尚未创建时失败，直接退回字符串比较
// 又会漏掉 /alias -> /usr/bin 这种最终仍覆盖主二进制的配置。
func resolvedDestination(value string) (string, error) {
	absolute, err := filepath.Abs(value)
	if err != nil {
		return "", err
	}
	current := filepath.Clean(absolute)
	var missing []string
	for {
		resolved, err := filepath.EvalSymlinks(current)
		if err == nil {
			for index := len(missing) - 1; index >= 0; index-- {
				resolved = filepath.Join(resolved, missing[index])
			}
			return filepath.Clean(resolved), nil
		}
		if !os.IsNotExist(err) {
			return "", err
		}
		// EvalSymlinks 对“普通的未创建尾部”和“指向不存在目标的符号链接”都报
		// ENOENT。逐级回退时用 Lstat 区分后者，否则 Status 会误报可升级，直到
		// backupCurrent 的 MkdirAll 才暴露配置错误。
		if info, lstatErr := os.Lstat(current); lstatErr == nil {
			if info.Mode()&os.ModeSymlink != 0 {
				return "", fmt.Errorf("路径包含悬空符号链接 %s", current)
			}
		} else if !os.IsNotExist(lstatErr) {
			return "", lstatErr
		}
		parent := filepath.Dir(current)
		if parent == current {
			return "", err
		}
		missing = append(missing, filepath.Base(current))
		current = parent
	}
}

// backupCurrent 复制当前二进制而不是改名它。
//
// 改名会让正在运行的进程失去可执行文件的目录项（Linux 允许，但此后
// /proc/self/exe 指向一个已被移动的路径），也会在替换失败时留下一个
// 没有二进制的 /usr/bin/kdae-panel。复制多花几毫秒，换来任何一步失败
// 时原文件都还在原位。
func (m *Manager) backupCurrent() error {
	content, err := os.ReadFile(m.binaryPath)
	if err != nil {
		return err
	}
	if err := os.MkdirAll(filepath.Dir(m.backupPath), 0o700); err != nil {
		return err
	}
	return atomicfile.Write(m.backupPath, content, 0o755)
}

// probeVersion 运行给定二进制的 -version 并取回它自报的版本号。
func probeVersion(ctx context.Context, path string) (string, error) {
	command := exec.CommandContext(ctx, path, "-version")
	// 不继承面板的环境：新二进制此刻只需打印版本号，
	// 让它读到 KDAE_PANEL_* 反而可能触发无关的初始化。
	command.Env = []string{}
	output, err := command.Output()
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(string(output)), nil
}
