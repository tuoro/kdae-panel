package main

import (
	"testing"
	"time"
)

func TestInvalidSecurityEnvironmentFailsClosed(t *testing.T) {
	t.Setenv("KDAE_PANEL_SECURE_COOKIE", "ture")
	if _, err := envBool("KDAE_PANEL_SECURE_COOKIE", false); err == nil {
		t.Fatal("非法布尔值应该返回错误")
	}

	t.Setenv("KDAE_PANEL_SESSION_TTL", "forever")
	if _, err := envDuration("KDAE_PANEL_SESSION_TTL", time.Hour); err == nil {
		t.Fatal("非法时长应该返回错误")
	}
}
