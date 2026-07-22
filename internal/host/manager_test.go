package host

import (
	"context"
	"errors"
	"reflect"
	"strings"
	"testing"
	"time"

	"github.com/tuoro/kdae-panel/internal/command"
)

type fakeRunner struct {
	results map[string]command.Result
	errors  map[string]error
	calls   []string
}

func (r *fakeRunner) Run(_ context.Context, name string, args ...string) (command.Result, error) {
	key := name
	for _, arg := range args {
		key += " " + arg
	}
	r.calls = append(r.calls, key)
	return r.results[key], r.errors[key]
}

func TestStatus(t *testing.T) {
	key := "systemctl show dae --no-page --property=Id,Description,LoadState,ActiveState,SubState,UnitFileState,MainPID,ExecMainStatus,ActiveEnterTimestamp,ExecMainStartTimestamp,MemoryCurrent,CPUUsageNSec,TasksCurrent,NRestarts,FragmentPath"
	runner := &fakeRunner{results: map[string]command.Result{
		key: {Stdout: "Id=dae.service\nDescription=dae Service\nLoadState=loaded\nActiveState=active\nSubState=running\nMainPID=123\nMemoryCurrent=4096\nCPUUsageNSec=8000\nTasksCurrent=7\nNRestarts=2\n"},
	}, errors: map[string]error{}}
	manager, err := NewManagerWithRunner("dae", "systemctl", "journalctl", runner, time.Second)
	if err != nil {
		t.Fatal(err)
	}

	status, err := manager.Status(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if status.Name != "dae.service" || status.ActiveState != "active" || status.MainPID != 123 || status.MemoryBytes != 4096 || status.Restarts != 2 {
		t.Fatalf("状态解析异常: %+v", status)
	}
}

func TestActionAllowlist(t *testing.T) {
	runner := &fakeRunner{results: map[string]command.Result{
		"systemctl restart dae": {},
	}, errors: map[string]error{}}
	manager, _ := NewManagerWithRunner("dae", "systemctl", "journalctl", runner, time.Second)
	if err := manager.Action(context.Background(), ActionRestart); err != nil {
		t.Fatal(err)
	}
	if err := manager.Action(context.Background(), Action("daemon-reload")); err == nil {
		t.Fatal("未允许的动作应该被拒绝")
	}
	want := []string{"systemctl restart dae"}
	if !reflect.DeepEqual(runner.calls, want) {
		t.Fatalf("命令调用 = %v，期望 %v", runner.calls, want)
	}
}

func TestLogs(t *testing.T) {
	runner := &fakeRunner{results: map[string]command.Result{
		"journalctl --unit dae --no-pager --output json --lines 2": {Stdout: "{\"__REALTIME_TIMESTAMP\":\"1000000\",\"PRIORITY\":\"6\",\"MESSAGE\":\"started\",\"_SYSTEMD_UNIT\":\"dae.service\",\"_PID\":\"9\"}\n"},
	}, errors: map[string]error{}}
	manager, _ := NewManagerWithRunner("dae", "systemctl", "journalctl", runner, time.Second)

	entries, err := manager.Logs(context.Background(), 2)
	if err != nil {
		t.Fatal(err)
	}
	if len(entries) != 1 || entries[0].Message != "started" || entries[0].Level != "info" || !entries[0].Timestamp.Equal(time.Unix(1, 0).UTC()) {
		t.Fatalf("日志解析异常: %+v", entries)
	}
}

func TestLogsRejectInvalidPriorityValue(t *testing.T) {
	entries, err := parseJournal("{\"PRIORITY\":\"invalid\",\"MESSAGE\":\"test\"}\n")
	if err != nil {
		t.Fatal(err)
	}
	if len(entries) != 1 || entries[0].Priority != -1 || entries[0].Level != "unknown" {
		t.Fatalf("非法优先级解析结果 = %+v", entries)
	}
}

func TestCommandError(t *testing.T) {
	runner := &fakeRunner{
		results: map[string]command.Result{"systemctl start dae": {Stderr: "permission denied"}},
		errors:  map[string]error{"systemctl start dae": errors.New("exit status 1")},
	}
	manager, _ := NewManagerWithRunner("dae", "systemctl", "journalctl", runner, time.Second)
	if err := manager.Action(context.Background(), ActionStart); err == nil || !strings.Contains(err.Error(), "permission denied") {
		t.Fatalf("错误信息异常: %v", err)
	}
}
