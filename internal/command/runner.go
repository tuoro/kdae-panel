package command

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"io"
	"os/exec"
)

const defaultOutputLimit = 8 << 20

type Result struct {
	Stdout   string
	Stderr   string
	ExitCode int
}

type Runner interface {
	Run(ctx context.Context, name string, args ...string) (Result, error)
}

// DirectoryRunner supports commands whose output contract depends on the current directory.
type DirectoryRunner interface {
	Runner
	RunInDir(ctx context.Context, dir, name string, args ...string) (Result, error)
}

type ExecRunner struct {
	OutputLimit int64
}

func (r ExecRunner) Run(ctx context.Context, name string, args ...string) (Result, error) {
	return r.run(ctx, "", name, args...)
}

func (r ExecRunner) RunInDir(ctx context.Context, dir, name string, args ...string) (Result, error) {
	return r.run(ctx, dir, name, args...)
}

func (r ExecRunner) run(ctx context.Context, dir, name string, args ...string) (Result, error) {
	limit := r.OutputLimit
	if limit <= 0 {
		limit = defaultOutputLimit
	}

	stdout := newLimitedBuffer(limit)
	stderr := newLimitedBuffer(limit)
	cmd := exec.CommandContext(ctx, name, args...)
	cmd.Dir = dir
	cmd.Stdout = stdout
	cmd.Stderr = stderr

	err := cmd.Run()
	result := Result{
		Stdout:   stdout.String(),
		Stderr:   stderr.String(),
		ExitCode: exitCode(err),
	}
	if errors.Is(stdout.Err(), errOutputLimit) || errors.Is(stderr.Err(), errOutputLimit) {
		return result, fmt.Errorf("命令输出超过 %d 字节限制", limit)
	}
	if err != nil {
		return result, err
	}
	return result, nil
}

func exitCode(err error) int {
	if err == nil {
		return 0
	}
	var exitErr *exec.ExitError
	if errors.As(err, &exitErr) {
		return exitErr.ExitCode()
	}
	return -1
}

var errOutputLimit = errors.New("输出超过限制")

type limitedBuffer struct {
	buffer    bytes.Buffer
	remaining int64
	err       error
}

func newLimitedBuffer(limit int64) *limitedBuffer {
	return &limitedBuffer{remaining: limit}
}

func (b *limitedBuffer) Write(data []byte) (int, error) {
	if b.err != nil {
		return 0, b.err
	}
	if int64(len(data)) > b.remaining {
		allowed := max(b.remaining, 0)
		if allowed > 0 {
			_, _ = b.buffer.Write(data[:allowed])
		}
		b.remaining = 0
		b.err = errOutputLimit
		return int(allowed), b.err
	}
	written, err := b.buffer.Write(data)
	b.remaining -= int64(written)
	return written, err
}

func (b *limitedBuffer) String() string {
	return b.buffer.String()
}

func (b *limitedBuffer) Err() error {
	return b.err
}

var _ io.Writer = (*limitedBuffer)(nil)
