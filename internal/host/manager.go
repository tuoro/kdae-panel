package host

import (
	"bufio"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/tuoro/kdae-panel/internal/command"
)

const (
	defaultTimeout = 30 * time.Second
	actionTimeout  = 150 * time.Second
	maxLogLines    = 500
)

type Manager struct {
	serviceName string
	systemctl   string
	journalctl  string
	runner      command.Runner
	timeout     time.Duration
}

type Status struct {
	Name                string `json:"name"`
	Description         string `json:"description,omitempty"`
	LoadState           string `json:"loadState,omitempty"`
	ActiveState         string `json:"activeState,omitempty"`
	SubState            string `json:"subState,omitempty"`
	UnitFileState       string `json:"unitFileState,omitempty"`
	MainPID             int    `json:"mainPid,omitempty"`
	ExecMainStatus      int    `json:"execMainStatus,omitempty"`
	ActiveSince         string `json:"activeSince,omitempty"`
	StartedAt           string `json:"startedAt,omitempty"`
	MemoryBytes         uint64 `json:"memoryBytes,omitempty"`
	CPUUsageNanoseconds uint64 `json:"cpuUsageNanoseconds,omitempty"`
	Tasks               uint64 `json:"tasks,omitempty"`
	Restarts            uint64 `json:"restarts,omitempty"`
	UnitPath            string `json:"unitPath,omitempty"`
}

type LogEntry struct {
	Timestamp time.Time `json:"timestamp"`
	Priority  int       `json:"priority"`
	Level     string    `json:"level"`
	Message   string    `json:"message"`
	Unit      string    `json:"unit,omitempty"`
	PID       string    `json:"pid,omitempty"`
}

type Action string

const (
	ActionStart   Action = "start"
	ActionStop    Action = "stop"
	ActionRestart Action = "restart"
)

func NewManager(serviceName, systemctl, journalctl string) (*Manager, error) {
	return NewManagerWithRunner(serviceName, systemctl, journalctl, command.ExecRunner{}, defaultTimeout)
}

func NewManagerWithRunner(serviceName, systemctl, journalctl string, runner command.Runner, timeout time.Duration) (*Manager, error) {
	if serviceName == "" {
		serviceName = "dae"
	}
	if !validUnitName(serviceName) {
		return nil, fmt.Errorf("systemd 服务名 %q 无效", serviceName)
	}
	if systemctl == "" {
		systemctl = "systemctl"
	}
	if journalctl == "" {
		journalctl = "journalctl"
	}
	if runner == nil {
		return nil, errors.New("命令执行器不能为空")
	}
	if timeout <= 0 {
		timeout = defaultTimeout
	}
	return &Manager{
		serviceName: serviceName,
		systemctl:   systemctl,
		journalctl:  journalctl,
		runner:      runner,
		timeout:     timeout,
	}, nil
}

func (m *Manager) Status(ctx context.Context) (Status, error) {
	properties := strings.Join([]string{
		"Id",
		"Description",
		"LoadState",
		"ActiveState",
		"SubState",
		"UnitFileState",
		"MainPID",
		"ExecMainStatus",
		"ActiveEnterTimestamp",
		"ExecMainStartTimestamp",
		"MemoryCurrent",
		"CPUUsageNSec",
		"TasksCurrent",
		"NRestarts",
		"FragmentPath",
	}, ",")
	result, err := m.run(ctx, m.systemctl, "show", m.serviceName, "--no-page", "--property="+properties)
	if err != nil {
		return Status{}, fmt.Errorf("读取 systemd 服务状态: %s", commandError(err, result))
	}
	values := parseProperties(result.Stdout)
	status := Status{
		Name:                valueOr(values, "Id", m.serviceName),
		Description:         values["Description"],
		LoadState:           values["LoadState"],
		ActiveState:         values["ActiveState"],
		SubState:            values["SubState"],
		UnitFileState:       values["UnitFileState"],
		MainPID:             parseInt(values["MainPID"]),
		ExecMainStatus:      parseInt(values["ExecMainStatus"]),
		ActiveSince:         values["ActiveEnterTimestamp"],
		StartedAt:           values["ExecMainStartTimestamp"],
		MemoryBytes:         parseUint(values["MemoryCurrent"]),
		CPUUsageNanoseconds: parseUint(values["CPUUsageNSec"]),
		Tasks:               parseUint(values["TasksCurrent"]),
		Restarts:            parseUint(values["NRestarts"]),
		UnitPath:            values["FragmentPath"],
	}
	return status, nil
}

func (m *Manager) Action(ctx context.Context, action Action) error {
	switch action {
	case ActionStart, ActionStop, ActionRestart:
	default:
		return fmt.Errorf("不支持的服务动作 %q", action)
	}
	result, err := m.runFor(ctx, actionTimeout, m.systemctl, string(action), m.serviceName)
	if err != nil {
		return fmt.Errorf("执行 systemd %s: %s", action, commandError(err, result))
	}
	return nil
}

func (m *Manager) Logs(ctx context.Context, limit int) ([]LogEntry, error) {
	if limit <= 0 {
		limit = 200
	}
	if limit > maxLogLines {
		limit = maxLogLines
	}
	result, err := m.run(
		ctx,
		m.journalctl,
		"--unit", m.serviceName,
		"--no-pager",
		"--output", "json",
		"--lines", strconv.Itoa(limit),
	)
	if err != nil {
		return nil, fmt.Errorf("读取 journald 日志: %s", commandError(err, result))
	}
	return parseJournal(result.Stdout)
}

func (m *Manager) run(ctx context.Context, name string, args ...string) (command.Result, error) {
	return m.runFor(ctx, m.timeout, name, args...)
}

func (m *Manager) runFor(ctx context.Context, timeout time.Duration, name string, args ...string) (command.Result, error) {
	commandCtx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()
	return m.runner.Run(commandCtx, name, args...)
}

func parseProperties(output string) map[string]string {
	values := make(map[string]string)
	for _, line := range strings.Split(output, "\n") {
		key, value, found := strings.Cut(strings.TrimSpace(line), "=")
		if found {
			values[key] = value
		}
	}
	return values
}

func parseJournal(output string) ([]LogEntry, error) {
	entries := make([]LogEntry, 0)
	scanner := bufio.NewScanner(strings.NewReader(output))
	buffer := make([]byte, 64*1024)
	scanner.Buffer(buffer, 1<<20)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		var raw map[string]json.RawMessage
		if err := json.Unmarshal([]byte(line), &raw); err != nil {
			return nil, fmt.Errorf("解析 journald JSON: %w", err)
		}
		priority := parsePriority(rawString(raw["PRIORITY"]))
		entries = append(entries, LogEntry{
			Timestamp: journalTimestamp(rawString(raw["__REALTIME_TIMESTAMP"])),
			Priority:  priority,
			Level:     priorityLevel(priority),
			Message:   rawString(raw["MESSAGE"]),
			Unit:      rawString(raw["_SYSTEMD_UNIT"]),
			PID:       rawString(raw["_PID"]),
		})
	}
	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("读取 journald 输出: %w", err)
	}
	return entries, nil
}

func rawString(raw json.RawMessage) string {
	if len(raw) == 0 {
		return ""
	}
	var value string
	if err := json.Unmarshal(raw, &value); err == nil {
		return value
	}
	var bytesValue []byte
	if err := json.Unmarshal(raw, &bytesValue); err == nil {
		return string(bytesValue)
	}
	return ""
}

func journalTimestamp(value string) time.Time {
	microseconds, err := strconv.ParseInt(value, 10, 64)
	if err != nil {
		return time.Time{}
	}
	return time.UnixMicro(microseconds).UTC()
}

func priorityLevel(priority int) string {
	levels := []string{"emerg", "alert", "critical", "error", "warning", "notice", "info", "debug"}
	if priority < 0 || priority >= len(levels) {
		return "unknown"
	}
	return levels[priority]
}

func parsePriority(value string) int {
	priority, err := strconv.Atoi(value)
	if err != nil || priority < 0 || priority > 7 {
		return -1
	}
	return priority
}

func validUnitName(value string) bool {
	if len(value) > 255 || strings.HasPrefix(value, "-") {
		return false
	}
	for _, char := range value {
		if char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z' || char >= '0' && char <= '9' || strings.ContainsRune("_.@:-", char) {
			continue
		}
		return false
	}
	return value != ""
}

func valueOr(values map[string]string, key, fallback string) string {
	if value := values[key]; value != "" {
		return value
	}
	return fallback
}

func parseInt(value string) int {
	parsed, _ := strconv.Atoi(value)
	return parsed
}

func parseUint(value string) uint64 {
	parsed, _ := strconv.ParseUint(value, 10, 64)
	return parsed
}

func commandError(err error, result command.Result) string {
	message := strings.TrimSpace(result.Stderr)
	if message == "" {
		message = strings.TrimSpace(result.Stdout)
	}
	if message == "" {
		message = err.Error()
	}
	return message
}
