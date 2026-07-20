//go:build !windows

package command

import (
	"errors"
	"testing"
)

func TestLimitedBuffer(t *testing.T) {
	buffer := newLimitedBuffer(4)

	written, err := buffer.Write([]byte("abcdef"))
	if !errors.Is(err, errOutputLimit) {
		t.Fatalf("错误 = %v，期望输出超限", err)
	}
	if written != 4 || buffer.String() != "abcd" {
		t.Fatalf("写入结果异常: written=%d content=%q", written, buffer.String())
	}
}
