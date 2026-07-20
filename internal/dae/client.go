package dae

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/tuoro/kdae-panel/internal/command"
)

const defaultTimeout = 15 * time.Second

const (
	validateTimeout = 45 * time.Second
	reloadTimeout   = 75 * time.Second
)

type Client struct {
	binary  string
	runner  command.Runner
	timeout time.Duration
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

func (c *Client) Sysdump(ctx context.Context) (string, error) {
	result, err := c.runFor(ctx, max(c.timeout, validateTimeout), "sysdump")
	if err != nil {
		return "", fmt.Errorf("dae 系统诊断失败: %s", describeCommandError(err, result))
	}
	return result.Stdout, nil
}

func (c *Client) run(ctx context.Context, args ...string) (command.Result, error) {
	return c.runFor(ctx, c.timeout, args...)
}

func (c *Client) runFor(ctx context.Context, timeout time.Duration, args ...string) (command.Result, error) {
	commandCtx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()
	return c.runner.Run(commandCtx, c.binary, args...)
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
