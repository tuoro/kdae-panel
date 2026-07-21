package auth

import (
	"context"
	"errors"
	"path/filepath"
	"testing"
	"time"
)

func newTestStore(t *testing.T) *Store {
	t.Helper()
	store, err := openWithParams(
		filepath.Join(t.TempDir(), "panel.db"),
		time.Hour,
		PasswordParams{Memory: 1024, Iterations: 1, Parallelism: 1, SaltLength: 16, KeyLength: 32},
	)
	if err != nil {
		t.Fatalf("打开认证数据库失败: %v", err)
	}
	t.Cleanup(func() { _ = store.Close() })
	return store
}

func TestSetupLoginAndLogout(t *testing.T) {
	store := newTestStore(t)
	ctx := context.Background()

	initialized, err := store.Initialized(ctx)
	if err != nil || initialized {
		t.Fatalf("初始状态异常: initialized=%v err=%v", initialized, err)
	}
	session, err := store.Setup(ctx, "admin", "a secure test password")
	if err != nil {
		t.Fatalf("初始化管理员失败: %v", err)
	}
	if session.Token == "" || session.CSRFToken == "" || session.User.Username != "admin" {
		t.Fatalf("初始化会话异常: %+v", session)
	}
	if _, err := store.Setup(ctx, "second", "short"); !errors.Is(err, ErrAlreadyInitialized) {
		t.Fatalf("重复初始化错误 = %v", err)
	}

	login, err := store.Login(ctx, "ADMIN", "a secure test password")
	if err != nil {
		t.Fatalf("登录失败: %v", err)
	}
	loaded, err := store.GetSession(ctx, login.Token)
	if err != nil || loaded.User.ID != login.User.ID || loaded.CSRFToken != login.CSRFToken {
		t.Fatalf("读取会话异常: session=%+v err=%v", loaded, err)
	}
	if err := store.Logout(ctx, login.Token); err != nil {
		t.Fatal(err)
	}
	if _, err := store.GetSession(ctx, login.Token); !errors.Is(err, ErrInvalidSession) {
		t.Fatalf("注销后会话错误 = %v", err)
	}
}

func TestCredentialOperationsRejectConcurrentHashing(t *testing.T) {
	store := newTestStore(t)
	store.credentialMu.Lock()
	defer store.credentialMu.Unlock()

	_, err := store.Login(context.Background(), "admin", "a secure test password")
	if !errors.Is(err, ErrAuthenticationBusy) {
		t.Fatalf("并发认证错误 = %v", err)
	}
}

func TestChangePasswordInvalidatesOldSession(t *testing.T) {
	store := newTestStore(t)
	ctx := context.Background()
	oldSession, err := store.Setup(ctx, "admin", "a secure test password")
	if err != nil {
		t.Fatal(err)
	}
	newSession, err := store.ChangePassword(ctx, oldSession.User.ID, "a secure test password", "a different secure password")
	if err != nil {
		t.Fatalf("修改密码失败: %v", err)
	}
	if _, err := store.GetSession(ctx, oldSession.Token); !errors.Is(err, ErrInvalidSession) {
		t.Fatalf("旧会话错误 = %v", err)
	}
	if _, err := store.GetSession(ctx, newSession.Token); err != nil {
		t.Fatalf("新会话无效: %v", err)
	}
	if _, err := store.Login(ctx, "admin", "a secure test password"); !errors.Is(err, ErrInvalidCredentials) {
		t.Fatalf("旧密码登录错误 = %v", err)
	}
	if _, err := store.Login(ctx, "admin", "a different secure password"); err != nil {
		t.Fatalf("新密码登录失败: %v", err)
	}
}

func TestExpiredSession(t *testing.T) {
	store := newTestStore(t)
	base := time.Date(2026, 7, 21, 0, 0, 0, 0, time.UTC)
	store.now = func() time.Time { return base }
	session, err := store.Setup(context.Background(), "admin", "a secure test password")
	if err != nil {
		t.Fatal(err)
	}
	store.now = func() time.Time { return base.Add(2 * time.Hour) }
	if _, err := store.GetSession(context.Background(), session.Token); !errors.Is(err, ErrInvalidSession) {
		t.Fatalf("过期会话错误 = %v", err)
	}
}
