package dae

import (
	"context"
	"errors"
	"reflect"
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
	key := name + " " + joinArgs(args)
	r.calls = append(r.calls, key)
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
