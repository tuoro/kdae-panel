package app

import (
	"context"
	"crypto/subtle"
	"errors"
	"net"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/tuoro/kdae-panel/internal/auth"
)

const sessionCookieName = "kdae_panel_session"

type authContextKey struct{}

type credentialsRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type changePasswordRequest struct {
	CurrentPassword string `json:"currentPassword"`
	NewPassword     string `json:"newPassword"`
}

type authStatusResponse struct {
	Initialized   bool       `json:"initialized"`
	Authenticated bool       `json:"authenticated"`
	User          *auth.User `json:"user,omitempty"`
	CSRFToken     string     `json:"csrfToken,omitempty"`
	ExpiresAt     time.Time  `json:"expiresAt,omitempty"`
}

func registerAuthenticationRoutes(router *http.ServeMux, service AuthenticationService, secureCookie bool) {
	if service == nil {
		return
	}
	limiter := newLoginLimiter()

	router.HandleFunc("GET /api/v1/auth/status", func(writer http.ResponseWriter, request *http.Request) {
		initialized, err := service.Initialized(request.Context())
		if err != nil {
			writeAPIError(writer, http.StatusInternalServerError, "authentication_error", err.Error())
			return
		}
		response := authStatusResponse{Initialized: initialized}
		if session, ok := optionalSession(request, service); ok {
			response.Authenticated = true
			response.User = &session.User
			response.CSRFToken = session.CSRFToken
			response.ExpiresAt = session.ExpiresAt
		}
		writer.Header().Set("Cache-Control", "no-store")
		writeJSON(writer, http.StatusOK, response)
	})

	router.HandleFunc("POST /api/v1/auth/setup", func(writer http.ResponseWriter, request *http.Request) {
		if !sameOrigin(request) {
			writeAPIError(writer, http.StatusForbidden, "origin_rejected", "请求来源与面板地址不一致")
			return
		}
		var payload credentialsRequest
		if !decodeSmallJSONBody(writer, request, &payload) {
			return
		}
		session, err := service.Setup(request.Context(), payload.Username, payload.Password)
		if err != nil {
			writeAuthenticationError(writer, err)
			return
		}
		setSessionCookie(writer, session, secureCookie)
		writer.Header().Set("Cache-Control", "no-store")
		writeJSON(writer, http.StatusCreated, sessionResponse(session))
	})

	router.HandleFunc("POST /api/v1/auth/login", func(writer http.ResponseWriter, request *http.Request) {
		if !sameOrigin(request) {
			writeAPIError(writer, http.StatusForbidden, "origin_rejected", "请求来源与面板地址不一致")
			return
		}
		var payload credentialsRequest
		if !decodeSmallJSONBody(writer, request, &payload) {
			return
		}
		key := loginKey(request, payload.Username)
		if retryAfter, allowed := limiter.Allow(key); !allowed {
			writer.Header().Set("Retry-After", strconv.Itoa(int(retryAfter.Seconds())))
			writeAPIError(writer, http.StatusTooManyRequests, "login_rate_limited", "登录尝试过多，请稍后重试")
			return
		}
		session, err := service.Login(request.Context(), payload.Username, payload.Password)
		if err != nil {
			if errors.Is(err, auth.ErrInvalidCredentials) {
				limiter.Failure(key)
			}
			writeAuthenticationError(writer, err)
			return
		}
		limiter.Success(key)
		setSessionCookie(writer, session, secureCookie)
		writer.Header().Set("Cache-Control", "no-store")
		writeJSON(writer, http.StatusOK, sessionResponse(session))
	})

	router.HandleFunc("POST /api/v1/auth/logout", func(writer http.ResponseWriter, request *http.Request) {
		session, ok := sessionFromContext(request.Context())
		if !ok {
			writeAPIError(writer, http.StatusUnauthorized, "authentication_required", "请先登录")
			return
		}
		if err := service.Logout(request.Context(), session.Token); err != nil {
			writeAPIError(writer, http.StatusInternalServerError, "authentication_error", err.Error())
			return
		}
		clearSessionCookie(writer, secureCookie)
		writer.WriteHeader(http.StatusNoContent)
	})

	router.HandleFunc("POST /api/v1/auth/password", func(writer http.ResponseWriter, request *http.Request) {
		currentSession, ok := sessionFromContext(request.Context())
		if !ok {
			writeAPIError(writer, http.StatusUnauthorized, "authentication_required", "请先登录")
			return
		}
		var payload changePasswordRequest
		if !decodeSmallJSONBody(writer, request, &payload) {
			return
		}
		newSession, err := service.ChangePassword(
			request.Context(),
			currentSession.User.ID,
			payload.CurrentPassword,
			payload.NewPassword,
		)
		if err != nil {
			writeAuthenticationError(writer, err)
			return
		}
		setSessionCookie(writer, newSession, secureCookie)
		writeJSON(writer, http.StatusOK, sessionResponse(newSession))
	})
}

func authenticationMiddleware(next http.Handler, service AuthenticationService, secureCookie bool) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		if !strings.HasPrefix(request.URL.Path, "/api/v1/") || publicAPIPath(request.URL.Path) {
			next.ServeHTTP(writer, request)
			return
		}
		cookie, err := request.Cookie(sessionCookieName)
		if err != nil {
			writeAPIError(writer, http.StatusUnauthorized, "authentication_required", "请先登录")
			return
		}
		session, err := service.GetSession(request.Context(), cookie.Value)
		if err != nil {
			clearSessionCookie(writer, secureCookie)
			writeAPIError(writer, http.StatusUnauthorized, "authentication_required", "登录会话无效或已过期")
			return
		}
		if request.Method != http.MethodGet && request.Method != http.MethodHead && request.Method != http.MethodOptions {
			if !sameOrigin(request) {
				writeAPIError(writer, http.StatusForbidden, "origin_rejected", "请求来源与面板地址不一致")
				return
			}
			receivedToken := request.Header.Get("X-CSRF-Token")
			if subtle.ConstantTimeCompare([]byte(receivedToken), []byte(session.CSRFToken)) != 1 {
				writeAPIError(writer, http.StatusForbidden, "csrf_rejected", "CSRF 令牌无效")
				return
			}
		}
		ctx := context.WithValue(request.Context(), authContextKey{}, session)
		next.ServeHTTP(writer, request.WithContext(ctx))
	})
}

func publicAPIPath(path string) bool {
	switch path {
	case "/api/v1/health", "/api/v1/auth/status", "/api/v1/auth/setup", "/api/v1/auth/login":
		return true
	default:
		return false
	}
}

func optionalSession(request *http.Request, service AuthenticationService) (auth.Session, bool) {
	cookie, err := request.Cookie(sessionCookieName)
	if err != nil {
		return auth.Session{}, false
	}
	session, err := service.GetSession(request.Context(), cookie.Value)
	return session, err == nil
}

func sessionFromContext(ctx context.Context) (auth.Session, bool) {
	session, ok := ctx.Value(authContextKey{}).(auth.Session)
	return session, ok
}

func setSessionCookie(writer http.ResponseWriter, session auth.Session, secure bool) {
	http.SetCookie(writer, &http.Cookie{
		Name:     sessionCookieName,
		Value:    session.Token,
		Path:     "/",
		Expires:  session.ExpiresAt,
		MaxAge:   max(int(time.Until(session.ExpiresAt).Seconds()), 1),
		HttpOnly: true,
		Secure:   secure,
		SameSite: http.SameSiteStrictMode,
	})
}

func clearSessionCookie(writer http.ResponseWriter, secure bool) {
	http.SetCookie(writer, &http.Cookie{
		Name:     sessionCookieName,
		Value:    "",
		Path:     "/",
		Expires:  time.Unix(1, 0),
		MaxAge:   -1,
		HttpOnly: true,
		Secure:   secure,
		SameSite: http.SameSiteStrictMode,
	})
}

func sessionResponse(session auth.Session) authStatusResponse {
	return authStatusResponse{
		Initialized:   true,
		Authenticated: true,
		User:          &session.User,
		CSRFToken:     session.CSRFToken,
		ExpiresAt:     session.ExpiresAt,
	}
}

func sameOrigin(request *http.Request) bool {
	origin := request.Header.Get("Origin")
	if origin == "" {
		return true
	}
	parsed, err := url.Parse(origin)
	if err != nil || parsed.Host == "" {
		return false
	}
	return strings.EqualFold(parsed.Host, request.Host)
}

func decodeSmallJSONBody(writer http.ResponseWriter, request *http.Request, destination any) bool {
	request.Body = http.MaxBytesReader(writer, request.Body, 64<<10)
	return decodeJSONBody(writer, request, destination)
}

func writeAuthenticationError(writer http.ResponseWriter, err error) {
	var inputErr *auth.InputError
	switch {
	case errors.Is(err, auth.ErrAlreadyInitialized):
		writeAPIError(writer, http.StatusConflict, "already_initialized", err.Error())
	case errors.Is(err, auth.ErrInvalidCredentials):
		writeAPIError(writer, http.StatusUnauthorized, "invalid_credentials", "用户名或密码错误")
	case errors.Is(err, auth.ErrInvalidSession):
		writeAPIError(writer, http.StatusUnauthorized, "authentication_required", err.Error())
	case errors.Is(err, auth.ErrAuthenticationBusy):
		writer.Header().Set("Retry-After", "1")
		writeAPIError(writer, http.StatusTooManyRequests, "authentication_busy", err.Error())
	case errors.As(err, &inputErr):
		writeAPIError(writer, http.StatusBadRequest, "invalid_authentication_input", inputErr.Error())
	default:
		writeAPIError(writer, http.StatusInternalServerError, "authentication_error", "认证服务内部错误")
	}
}

func loginKey(request *http.Request, _ string) string {
	host, _, err := net.SplitHostPort(request.RemoteAddr)
	if err != nil {
		host = request.RemoteAddr
	}
	return host
}

type loginAttempt struct {
	count        int
	windowStart  time.Time
	blockedUntil time.Time
}

type loginLimiter struct {
	mu       sync.Mutex
	attempts map[string]loginAttempt
	now      func() time.Time
}

func newLoginLimiter() *loginLimiter {
	return &loginLimiter{attempts: make(map[string]loginAttempt), now: time.Now}
}

func (l *loginLimiter) Allow(key string) (time.Duration, bool) {
	l.mu.Lock()
	defer l.mu.Unlock()
	now := l.now()
	attempt := l.attempts[key]
	if now.Before(attempt.blockedUntil) {
		return attempt.blockedUntil.Sub(now), false
	}
	if !attempt.windowStart.IsZero() && now.Sub(attempt.windowStart) > 5*time.Minute {
		delete(l.attempts, key)
	}
	return 0, true
}

func (l *loginLimiter) Failure(key string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	now := l.now()
	attempt := l.attempts[key]
	if attempt.windowStart.IsZero() || now.Sub(attempt.windowStart) > 5*time.Minute {
		attempt = loginAttempt{windowStart: now}
	}
	attempt.count++
	if attempt.count >= 5 {
		attempt.blockedUntil = now.Add(15 * time.Minute)
	}
	l.attempts[key] = attempt
}

func (l *loginLimiter) Success(key string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	delete(l.attempts, key)
}
