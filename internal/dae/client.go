package dae

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/tuoro/kdae-panel/internal/command"
)

const (
	defaultTimeout  = 15 * time.Second
	maxSysdumpBytes = 32 << 20
)

const (
	validateTimeout = 45 * time.Second
	reloadTimeout   = 75 * time.Second
)

type Client struct {
	binary    string
	runner    command.Runner
	timeout   time.Duration
	sysdumpMu sync.Mutex
}

type Report struct {
	Binary           string          `json:"binary"`
	Available        bool            `json:"available"`
	Version          string          `json:"version,omitempty"`
	Commands         map[string]bool `json:"commands"`
	OutlineSupported bool            `json:"outlineSupported"`
	OutlineVersion   string          `json:"outlineVersion,omitempty"`
	Problem          string          `json:"problem,omitempty"`
	DetectedAt       time.Time       `json:"detectedAt"`
}

type Outline struct {
	Version   string           `json:"version"`
	Leaves    []string         `json:"leaves"`
	Structure []OutlineElement `json:"structure"`
}

type OutlineElement struct {
	Name         string           `json:"name,omitempty"`
	Mapping      string           `json:"mapping,omitempty"`
	IsArray      bool             `json:"isArray,omitempty"`
	DefaultValue string           `json:"defaultValue,omitempty"`
	Required     bool             `json:"required,omitempty"`
	Type         string           `json:"type,omitempty"`
	Description  string           `json:"desc,omitempty"`
	Structure    []OutlineElement `json:"structure,omitempty"`
}

type Sysdump struct {
	Filename string
	Content  []byte
}

func NewClient(binary string) *Client {
	return NewClientWithRunner(binary, command.ExecRunner{}, defaultTimeout)
}

func NewClientWithRunner(binary string, runner command.Runner, timeout time.Duration) *Client {
	if strings.TrimSpace(binary) == "" {
		binary = "dae"
	}
	if timeout <= 0 {
		timeout = defaultTimeout
	}
	return &Client{binary: binary, runner: runner, timeout: timeout}
}

func (c *Client) Inspect(ctx context.Context) Report {
	report := Report{
		Binary:     c.binary,
		Commands:   make(map[string]bool),
		DetectedAt: time.Now().UTC(),
	}

	versionResult, err := c.run(ctx, "--version")
	if err != nil {
		report.Problem = describeCommandError(err, versionResult)
		return report
	}
	report.Available = true
	report.Version = firstNonEmptyLine(versionResult.Stdout)

	helpResult, err := c.run(ctx, "--help")
	if err != nil {
		report.Problem = describeCommandError(err, helpResult)
		return report
	}
	for _, commandName := range []string{"run", "validate", "reload", "suspend", "sysdump", "export"} {
		report.Commands[commandName] = helpContainsCommand(helpResult.Stdout, commandName)
	}

	outline, err := c.Outline(ctx)
	if err == nil {
		report.OutlineSupported = true
		report.OutlineVersion = outline.Version
	} else if report.Commands["export"] {
		report.Problem = err.Error()
	}
	return report
}

func (c *Client) Outline(ctx context.Context) (Outline, error) {
	result, err := c.run(ctx, "export", "outline")
	if err != nil {
		return Outline{}, fmt.Errorf("导出 dae 配置结构: %s", describeCommandError(err, result))
	}

	var outline Outline
	if err := json.Unmarshal([]byte(result.Stdout), &outline); err != nil {
		return Outline{}, fmt.Errorf("解析 dae 配置结构: %w", err)
	}
	if len(outline.Structure) == 0 {
		return Outline{}, errors.New("dae 返回的配置结构为空")
	}
	return outline, nil
}

func (c *Client) Validate(ctx context.Context, configPath string) error {
	result, err := c.runFor(ctx, max(c.timeout, validateTimeout), "validate", "-c", configPath)
	if err != nil {
		return fmt.Errorf("dae 配置校验失败: %s", describeCommandError(err, result))
	}
	return nil
}

func (c *Client) Reload(ctx context.Context) error {
	result, err := c.runFor(ctx, max(c.timeout, reloadTimeout), "reload")
	if err != nil {
		return fmt.Errorf("dae 重载失败: %s", describeCommandError(err, result))
	}
	return nil
}

func (c *Client) Suspend(ctx context.Context, abort bool) error {
	args := []string{"suspend"}
	if abort {
		args = append(args, "--abort")
	}
	result, err := c.runFor(ctx, max(c.timeout, validateTimeout), args...)
	if err != nil {
		return fmt.Errorf("dae 暂停失败: %s", describeCommandError(err, result))
	}
	return nil
}

func (c *Client) Sysdump(ctx context.Context) (Sysdump, error) {
	c.sysdumpMu.Lock()
	defer c.sysdumpMu.Unlock()

	dir, err := os.MkdirTemp("", "kdae-panel-sysdump-")
	if err != nil {
		return Sysdump{}, fmt.Errorf("创建 sysdump 工作目录: %w", err)
	}
	defer os.RemoveAll(dir)

	result, err := c.runInDir(ctx, dir, max(c.timeout, validateTimeout), "sysdump")
	if err != nil {
		return Sysdump{}, fmt.Errorf("dae 系统诊断失败: %s", describeCommandError(err, result))
	}

	archive, err := findSysdumpArchive(dir)
	if err != nil {
		return Sysdump{}, fmt.Errorf("dae 系统诊断未生成归档: %w", err)
	}
	return archive, nil
}

func (c *Client) run(ctx context.Context, args ...string) (command.Result, error) {
	return c.runFor(ctx, c.timeout, args...)
}

func (c *Client) runFor(ctx context.Context, timeout time.Duration, args ...string) (command.Result, error) {
	commandCtx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()
	return c.runner.Run(commandCtx, c.binary, args...)
}

func (c *Client) runInDir(ctx context.Context, dir string, timeout time.Duration, args ...string) (command.Result, error) {
	runner, ok := c.runner.(command.DirectoryRunner)
	if !ok {
		return command.Result{}, errors.New("命令执行器不支持受控工作目录")
	}
	commandCtx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()
	return runner.RunInDir(commandCtx, dir, c.binary, args...)
}

func findSysdumpArchive(dir string) (Sysdump, error) {
	entries, err := os.ReadDir(dir)
	if err != nil {
		return Sysdump{}, err
	}
	var archiveName string
	for _, entry := range entries {
		if entry.IsDir() || !strings.HasPrefix(entry.Name(), "dae-sysdump.") || !strings.HasSuffix(entry.Name(), ".tar.gz") {
			continue
		}
		if archiveName != "" {
			return Sysdump{}, errors.New("生成了多个 sysdump 归档")
		}
		archiveName = entry.Name()
	}
	if archiveName == "" {
		return Sysdump{}, errors.New("未找到 dae-sysdump.*.tar.gz")
	}

	path := filepath.Join(dir, archiveName)
	info, err := os.Lstat(path)
	if err != nil {
		return Sysdump{}, err
	}
	if !info.Mode().IsRegular() {
		return Sysdump{}, errors.New("归档不是普通文件")
	}
	if info.Size() > maxSysdumpBytes {
		return Sysdump{}, fmt.Errorf("归档超过 %d 字节限制", maxSysdumpBytes)
	}
	file, err := os.Open(path)
	if err != nil {
		return Sysdump{}, err
	}
	defer file.Close()
	content, err := io.ReadAll(io.LimitReader(file, maxSysdumpBytes+1))
	if err != nil {
		return Sysdump{}, err
	}
	if len(content) > maxSysdumpBytes {
		return Sysdump{}, fmt.Errorf("归档超过 %d 字节限制", maxSysdumpBytes)
	}
	return Sysdump{Filename: archiveName, Content: content}, nil
}

func firstNonEmptyLine(value string) string {
	for _, line := range strings.Split(value, "\n") {
		if line = strings.TrimSpace(line); line != "" {
			return line
		}
	}
	return "unknown"
}

func helpContainsCommand(help, commandName string) bool {
	for _, line := range strings.Split(help, "\n") {
		fields := strings.Fields(line)
		if len(fields) > 0 && fields[0] == commandName {
			return true
		}
	}
	return false
}

func describeCommandError(err error, result command.Result) string {
	message := strings.TrimSpace(result.Stderr)
	if message == "" {
		message = strings.TrimSpace(result.Stdout)
	}
	if message == "" {
		message = err.Error()
	}
	return message
}
