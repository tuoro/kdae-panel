package dae

import (
	"context"
	"errors"
	"os"
	"path/filepath"
	"reflect"
	"strings"
	"testing"
	"time"

	"github.com/tuoro/kdae-panel/internal/command"
)

type fakeRunner struct {
	results        map[string]command.Result
	errors         map[string]error
	calls          []string
	writeSysdump   bool
	sysdumpContent []byte
}

func (r *fakeRunner) Run(_ context.Context, name string, args ...string) (command.Result, error) {
	key := name + " " + joinArgs(args)
	r.calls = append(r.calls, key)
	return r.results[key], r.errors[key]
}

func (r *fakeRunner) RunInDir(_ context.Context, dir, name string, args ...string) (command.Result, error) {
	key := name + " " + joinArgs(args)
	r.calls = append(r.calls, key)
	if r.writeSysdump && len(args) == 1 && args[0] == "sysdump" {
		if err := os.WriteFile(filepath.Join(dir, "dae-sysdump.1.tar.gz"), r.sysdumpContent, 0600); err != nil {
			return command.Result{}, err
		}
	}
	return r.results[key], r.errors[key]
}

func TestInspect(t *testing.T) {
	runner := &fakeRunner{results: map[string]command.Result{
		"/usr/bin/dae --version": {
			Stdout: "v0.9.0\ngo runtime go1.24 linux/amd64\n",
		},
		"/usr/bin/dae --help": {
			Stdout: "Available Commands:\n  run       run dae\n  validate  validate config\n  reload    reload config\n  export    export UI metadata\n",
		},
		"/usr/bin/dae export outline": {
			Stdout: `{"version":"v0.9.0","leaves":["string"],"structure":[{"name":"Global","mapping":"global"}]}`,
		},
	}, errors: map[string]error{}}

	client := NewClientWithRunner("/usr/bin/dae", runner, time.Second)
	report := client.Inspect(context.Background())

	if !report.Available || report.Version != "v0.9.0" || !report.OutlineSupported {
		t.Fatalf("探测结果异常: %+v", report)
	}
	if !report.Commands["run"] || !report.Commands["validate"] || report.Commands["suspend"] {
		t.Fatalf("命令能力异常: %+v", report.Commands)
	}
	wantCalls := []string{
		"/usr/bin/dae --version",
		"/usr/bin/dae --help",
		"/usr/bin/dae export outline",
	}
	if !reflect.DeepEqual(runner.calls, wantCalls) {
		t.Fatalf("调用顺序 = %v，期望 %v", runner.calls, wantCalls)
	}
}

func TestInspectUnavailable(t *testing.T) {
	runner := &fakeRunner{
		results: map[string]command.Result{},
		errors:  map[string]error{"dae --version": errors.New("executable file not found")},
	}

	report := NewClientWithRunner("dae", runner, time.Second).Inspect(context.Background())
	if report.Available || report.Problem == "" {
		t.Fatalf("不可用探测结果异常: %+v", report)
	}
}

func TestOutlineRejectsEmptyStructure(t *testing.T) {
	runner := &fakeRunner{
		results: map[string]command.Result{
			"dae export outline": {Stdout: `{"version":"test","structure":[]}`},
		},
		errors: map[string]error{},
	}

	_, err := NewClientWithRunner("dae", runner, time.Second).Outline(context.Background())
	if err == nil {
		t.Fatal("空配置结构应该返回错误")
	}
}

func TestControlCommands(t *testing.T) {
	runner := &fakeRunner{results: map[string]command.Result{
		"dae validate -c /etc/dae/config.dae": {},
		"dae reload":                          {Stdout: "OK\n"},
		"dae suspend --abort":                 {Stdout: "OK\n"},
		"dae sysdump":                         {Stdout: "System network information collected and saved to dae-sysdump.1.tar.gz\n"},
	}, errors: map[string]error{}, writeSysdump: true, sysdumpContent: []byte("archive")}
	client := NewClientWithRunner("dae", runner, time.Second)

	if err := client.Validate(context.Background(), "/etc/dae/config.dae"); err != nil {
		t.Fatal(err)
	}
	if err := client.Reload(context.Background()); err != nil {
		t.Fatal(err)
	}
	if err := client.Suspend(context.Background(), true); err != nil {
		t.Fatal(err)
	}
	dump, err := client.Sysdump(context.Background())
	if err != nil || dump.Filename != "dae-sysdump.1.tar.gz" || string(dump.Content) != "archive" {
		t.Fatalf("诊断归档 = %+v，错误 = %v", dump, err)
	}
}

func TestSysdumpRejectsMissingArchive(t *testing.T) {
	runner := &fakeRunner{
		results: map[string]command.Result{"dae sysdump": {Stdout: "Failed to create tar archive\n"}},
		errors:  map[string]error{},
	}

	_, err := NewClientWithRunner("dae", runner, time.Second).Sysdump(context.Background())
	if err == nil || !strings.Contains(err.Error(), "未生成归档") {
		t.Fatalf("缺失归档错误 = %v", err)
	}
}

func joinArgs(args []string) string {
	result := ""
	for index, arg := range args {
		if index > 0 {
			result += " "
		}
		result += arg
	}
	return result
}
