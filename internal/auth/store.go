package auth

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"database/sql"
	"encoding/base64"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	_ "modernc.org/sqlite"
)

var (
	ErrAlreadyInitialized = errors.New("管理员账户已经初始化")
	ErrAuthenticationBusy = errors.New("认证服务正忙，请稍后重试")
	ErrInvalidCredentials = errors.New("用户名或密码错误")
	ErrInvalidSession     = errors.New("登录会话无效或已过期")
)

type Store struct {
	db             *sql.DB
	passwordParams PasswordParams
	dummyHash      string
	sessionTTL     time.Duration
	now            func() time.Time
	credentialMu   sync.Mutex
}

type User struct {
	ID        int64     `json:"id"`
	Username  string    `json:"username"`
	CreatedAt time.Time `json:"createdAt"`
}

type Session struct {
	Token     string    `json:"-"`
	CSRFToken string    `json:"csrfToken"`
	ExpiresAt time.Time `json:"expiresAt"`
	User      User      `json:"user"`
}

func Open(databasePath string, sessionTTL time.Duration) (*Store, error) {
	return openWithParams(databasePath, sessionTTL, DefaultPasswordParams())
}

func openWithParams(databasePath string, sessionTTL time.Duration, params PasswordParams) (*Store, error) {
	if strings.TrimSpace(databasePath) == "" {
		return nil, errors.New("数据库路径不能为空")
	}
	if sessionTTL <= 0 {
		sessionTTL = 12 * time.Hour
	}
	absPath, err := filepath.Abs(databasePath)
	if err != nil {
		return nil, fmt.Errorf("解析数据库路径: %w", err)
	}
	if err := os.MkdirAll(filepath.Dir(absPath), 0700); err != nil {
		return nil, fmt.Errorf("创建数据目录: %w", err)
	}
	db, err := sql.Open("sqlite", absPath)
	if err != nil {
		return nil, fmt.Errorf("打开 SQLite: %w", err)
	}
	db.SetMaxOpenConns(1)
	dummyHash, err := HashPassword("kdae-panel dummy password", params)
	if err != nil {
		_ = db.Close()
		return nil, fmt.Errorf("初始化密码校验器: %w", err)
	}
	store := &Store{db: db, passwordParams: params, dummyHash: dummyHash, sessionTTL: sessionTTL, now: time.Now}
	if err := store.initialize(); err != nil {
		_ = db.Close()
		return nil, err
	}
	if err := os.Chmod(absPath, 0600); err != nil {
		_ = db.Close()
		return nil, fmt.Errorf("设置数据库权限: %w", err)
	}
	return store, nil
}

func (s *Store) initialize() error {
	statements := []string{
		"PRAGMA journal_mode=WAL",
		"PRAGMA foreign_keys=ON",
		"PRAGMA busy_timeout=5000",
		`CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL UNIQUE COLLATE NOCASE,
			password_hash TEXT NOT NULL,
			created_at INTEGER NOT NULL,
			updated_at INTEGER NOT NULL
		)`,
		`CREATE TABLE IF NOT EXISTS sessions (
			token_hash BLOB PRIMARY KEY,
			user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			csrf_token TEXT NOT NULL,
			created_at INTEGER NOT NULL,
			expires_at INTEGER NOT NULL,
			last_seen_at INTEGER NOT NULL
		)`,
		"CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at)",
	}
	for _, statement := range statements {
		if _, err := s.db.Exec(statement); err != nil {
			return fmt.Errorf("初始化认证数据库: %w", err)
		}
	}
	return nil
}

func (s *Store) Close() error {
	return s.db.Close()
}

func (s *Store) Initialized(ctx context.Context) (bool, error) {
	var count int
	if err := s.db.QueryRowContext(ctx, "SELECT COUNT(*) FROM users").Scan(&count); err != nil {
		return false, fmt.Errorf("查询管理员状态: %w", err)
	}
	return count > 0, nil
}

func (s *Store) Setup(ctx context.Context, username, password string) (Session, error) {
	if !s.credentialMu.TryLock() {
		return Session{}, ErrAuthenticationBusy
	}
	defer s.credentialMu.Unlock()

	if err := validateUsername(username); err != nil {
		return Session{}, err
	}
	initialized, err := s.Initialized(ctx)
	if err != nil {
		return Session{}, err
	}
	if initialized {
		return Session{}, ErrAlreadyInitialized
	}
	hash, err := HashPassword(password, s.passwordParams)
	if err != nil {
		return Session{}, err
	}
	now := s.now().UTC()
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return Session{}, fmt.Errorf("开始管理员初始化事务: %w", err)
	}
	defer tx.Rollback()

	var count int
	if err := tx.QueryRowContext(ctx, "SELECT COUNT(*) FROM users").Scan(&count); err != nil {
		return Session{}, fmt.Errorf("检查管理员状态: %w", err)
	}
	if count > 0 {
		return Session{}, ErrAlreadyInitialized
	}
	result, err := tx.ExecContext(
		ctx,
		"INSERT INTO users(username, password_hash, created_at, updated_at) VALUES(?, ?, ?, ?)",
		username,
		hash,
		now.Unix(),
		now.Unix(),
	)
	if err != nil {
		return Session{}, fmt.Errorf("创建管理员账户: %w", err)
	}
	userID, err := result.LastInsertId()
	if err != nil {
		return Session{}, fmt.Errorf("读取管理员编号: %w", err)
	}
	session, tokenHash, err := s.newSession(User{ID: userID, Username: username, CreatedAt: now})
	if err != nil {
		return Session{}, err
	}
	if err := insertSession(ctx, tx, tokenHash, session, now); err != nil {
		return Session{}, err
	}
	if err := tx.Commit(); err != nil {
		return Session{}, fmt.Errorf("提交管理员初始化事务: %w", err)
	}
	return session, nil
}

func (s *Store) Login(ctx context.Context, username, password string) (Session, error) {
	if !s.credentialMu.TryLock() {
		return Session{}, ErrAuthenticationBusy
	}
	defer s.credentialMu.Unlock()

	var user User
	var passwordHash string
	var createdAt int64
	err := s.db.QueryRowContext(
		ctx,
		"SELECT id, username, password_hash, created_at FROM users WHERE username = ? COLLATE NOCASE",
		username,
	).Scan(&user.ID, &user.Username, &passwordHash, &createdAt)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			_, _ = VerifyPassword(password, s.dummyHash)
			return Session{}, ErrInvalidCredentials
		}
		return Session{}, fmt.Errorf("查询管理员账户: %w", err)
	}
	valid, err := VerifyPassword(password, passwordHash)
	if err != nil {
		return Session{}, fmt.Errorf("验证密码摘要: %w", err)
	}
	if !valid {
		return Session{}, ErrInvalidCredentials
	}
	user.CreatedAt = time.Unix(createdAt, 0).UTC()
	session, tokenHash, err := s.newSession(user)
	if err != nil {
		return Session{}, err
	}
	now := s.now().UTC()
	if _, err := s.db.ExecContext(ctx, "DELETE FROM sessions WHERE expires_at <= ?", now.Unix()); err != nil {
		return Session{}, fmt.Errorf("清理过期会话: %w", err)
	}
	if err := insertSession(ctx, s.db, tokenHash, session, now); err != nil {
		return Session{}, err
	}
	return session, nil
}

func (s *Store) GetSession(ctx context.Context, token string) (Session, error) {
	if token == "" {
		return Session{}, ErrInvalidSession
	}
	tokenHash := hashToken(token)
	var session Session
	var createdAt, expiresAt int64
	err := s.db.QueryRowContext(
		ctx,
		`SELECT s.csrf_token, s.expires_at, u.id, u.username, u.created_at
		 FROM sessions s JOIN users u ON u.id = s.user_id
		 WHERE s.token_hash = ?`,
		tokenHash[:],
	).Scan(&session.CSRFToken, &expiresAt, &session.User.ID, &session.User.Username, &createdAt)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return Session{}, ErrInvalidSession
		}
		return Session{}, fmt.Errorf("读取登录会话: %w", err)
	}
	now := s.now().UTC()
	if expiresAt <= now.Unix() {
		_, _ = s.db.ExecContext(ctx, "DELETE FROM sessions WHERE token_hash = ?", tokenHash[:])
		return Session{}, ErrInvalidSession
	}
	session.Token = token
	session.ExpiresAt = time.Unix(expiresAt, 0).UTC()
	session.User.CreatedAt = time.Unix(createdAt, 0).UTC()
	_, _ = s.db.ExecContext(ctx, "UPDATE sessions SET last_seen_at = ? WHERE token_hash = ?", now.Unix(), tokenHash[:])
	return session, nil
}

func (s *Store) Logout(ctx context.Context, token string) error {
	hash := hashToken(token)
	if _, err := s.db.ExecContext(ctx, "DELETE FROM sessions WHERE token_hash = ?", hash[:]); err != nil {
		return fmt.Errorf("删除登录会话: %w", err)
	}
	return nil
}

func (s *Store) ChangePassword(ctx context.Context, userID int64, currentPassword, newPassword string) (Session, error) {
	if !s.credentialMu.TryLock() {
		return Session{}, ErrAuthenticationBusy
	}
	defer s.credentialMu.Unlock()

	var user User
	var passwordHash string
	var createdAt int64
	if err := s.db.QueryRowContext(
		ctx,
		"SELECT id, username, password_hash, created_at FROM users WHERE id = ?",
		userID,
	).Scan(&user.ID, &user.Username, &passwordHash, &createdAt); err != nil {
		return Session{}, fmt.Errorf("查询管理员账户: %w", err)
	}
	valid, err := VerifyPassword(currentPassword, passwordHash)
	if err != nil || !valid {
		return Session{}, ErrInvalidCredentials
	}
	newHash, err := HashPassword(newPassword, s.passwordParams)
	if err != nil {
		return Session{}, err
	}
	now := s.now().UTC()
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return Session{}, fmt.Errorf("开始修改密码事务: %w", err)
	}
	defer tx.Rollback()
	if _, err := tx.ExecContext(ctx, "UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?", newHash, now.Unix(), userID); err != nil {
		return Session{}, fmt.Errorf("更新管理员密码: %w", err)
	}
	if _, err := tx.ExecContext(ctx, "DELETE FROM sessions WHERE user_id = ?", userID); err != nil {
		return Session{}, fmt.Errorf("注销旧会话: %w", err)
	}
	user.CreatedAt = time.Unix(createdAt, 0).UTC()
	session, tokenHash, err := s.newSession(user)
	if err != nil {
		return Session{}, err
	}
	if err := insertSession(ctx, tx, tokenHash, session, now); err != nil {
		return Session{}, err
	}
	if err := tx.Commit(); err != nil {
		return Session{}, fmt.Errorf("提交修改密码事务: %w", err)
	}
	return session, nil
}

func (s *Store) newSession(user User) (Session, [32]byte, error) {
	token, err := randomToken(32)
	if err != nil {
		return Session{}, [32]byte{}, fmt.Errorf("生成登录令牌: %w", err)
	}
	csrfToken, err := randomToken(24)
	if err != nil {
		return Session{}, [32]byte{}, fmt.Errorf("生成 CSRF 令牌: %w", err)
	}
	expiresAt := s.now().UTC().Add(s.sessionTTL)
	return Session{
		Token:     token,
		CSRFToken: csrfToken,
		ExpiresAt: expiresAt,
		User:      user,
	}, hashToken(token), nil
}

type sqlExecutor interface {
	ExecContext(ctx context.Context, query string, args ...any) (sql.Result, error)
}

func insertSession(ctx context.Context, executor sqlExecutor, tokenHash [32]byte, session Session, now time.Time) error {
	_, err := executor.ExecContext(
		ctx,
		"INSERT INTO sessions(token_hash, user_id, csrf_token, created_at, expires_at, last_seen_at) VALUES(?, ?, ?, ?, ?, ?)",
		tokenHash[:],
		session.User.ID,
		session.CSRFToken,
		now.Unix(),
		session.ExpiresAt.Unix(),
		now.Unix(),
	)
	if err != nil {
		return fmt.Errorf("创建登录会话: %w", err)
	}
	return nil
}

func validateUsername(username string) error {
	if len(username) < 3 || len(username) > 32 {
		return &InputError{Message: "用户名长度必须在 3 到 32 个字符之间"}
	}
	for _, char := range username {
		if char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z' || char >= '0' && char <= '9' || char == '_' || char == '-' {
			continue
		}
		return &InputError{Message: "用户名只能包含字母、数字、下划线和连字符"}
	}
	return nil
}

func randomToken(size int) (string, error) {
	content := make([]byte, size)
	if _, err := rand.Read(content); err != nil {
		return "", err
	}
	return base64.RawURLEncoding.EncodeToString(content), nil
}

func hashToken(token string) [32]byte {
	return sha256.Sum256([]byte(token))
}
