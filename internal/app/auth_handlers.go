package app

import (
	"context"
	"crypto/subtle"
	"errors"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/tuoro/kdae-panel/internal/auth"
)

const sessionCookieName = "kdae_panel_session"

const maxLoginAttempts = 4096

type authContextKey struct{}

type credentialsRequest struct {
	Username       string `json:"username"`
	Password       string `json:"password"`
	BootstrapToken string `json:"bootstrapToken,omitempty"`
}

type changePasswordRequest struct {
	CurrentPassword string `json:"currentPassword"`
	NewPassword     string `json:"newPassword"`
}

type authStatusResponse struct {
	Initialized       bool       `json:"initialized"`
	Authenticated     bool       `json:"authenticated"`
	User              *auth.User `json:"user,omitempty"`
	CSRFToken         string     `json:"csrfToken,omitempty"`
	ExpiresAt         time.Time  `json:"expiresAt,omitempty"`
	BootstrapRequired bool       `json:"bootstrapRequired,omitempty"`
}

func registerAuthenticationRoutes(router *http.ServeMux, service AuthenticationService, secureCookie bool, bootstrapToken string, proxyTrust proxyTrust) {
	if service == nil {
		return
	}
	limiter := newLoginLimiter()
	setupLimiter := newLoginLimiter()

	router.HandleFunc("GET /api/v1/auth/status", func(writer http.ResponseWriter, request *http.Request) {
		initialized, err := service.Initialized(request.Context())
		if err != nil {
			writeAPIError(writer, http.StatusInternalServerError, "authentication_error", err.Error())
			return
		}
		response := authStatusResponse{Initialized: initialized, BootstrapRequired: !initialized && bootstrapToken != ""}
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
		if !sameOrigin(request, proxyTrust) {
			writeAPIError(writer, http.StatusForbidden, "origin_rejected", "请求来源与面板地址不一致")
			return
		}
		initialized, err := service.Initialized(request.Context())
		if err != nil {
			writeAPIError(writer, http.StatusInternalServerError, "authentication_error", "认证服务内部错误")
			return
		}
		if initialized {
			writeAuthenticationError(writer, auth.ErrAlreadyInitialized)
			return
		}
		setupKey := "setup\x00" + proxyTrust.clientAddress(request)
		if retryAfter, allowed := setupLimiter.Allow(setupKey); !allowed {
			writer.Header().Set("Retry-After", strconv.Itoa(max(int(retryAfter.Seconds()), 1)))
			writeAPIError(writer, http.StatusTooManyRequests, "setup_rate_limited", "初始化尝试过多，请稍后重试")
			return
		}
		var payload credentialsRequest
		if !decodeSmallJSONBody(writer, request, &payload) {
			return
		}
		if bootstrapToken != "" && subtle.ConstantTimeCompare([]byte(payload.BootstrapToken), []byte(bootstrapToken)) != 1 {
			setupLimiter.Failure(setupKey)
			writeAPIError(writer, http.StatusForbidden, "bootstrap_token_rejected", "bootstrap token 无效")
			return
		}
		session, err := service.Setup(request.Context(), payload.Username, payload.Password)
		if err != nil {
			if !errors.Is(err, auth.ErrAuthenticationBusy) {
				setupLimiter.Failure(setupKey)
			}
			writeAuthenticationError(writer, err)
			return
		}
		setupLimiter.Success(setupKey)
		setSessionCookie(writer, session, secureCookie || proxyTrust.requestScheme(request) == "https")
		writer.Header().Set("Cache-Control", "no-store")
		writeJSON(writer, http.StatusCreated, sessionResponse(session))
	})

	router.HandleFunc("POST /api/v1/auth/login", func(writer http.ResponseWriter, request *http.Request) {
		if !sameOrigin(request, proxyTrust) {
			writeAPIError(writer, http.StatusForbidden, "origin_rejected", "请求来源与面板地址不一致")
			return
		}
		var payload credentialsRequest
		if !decodeSmallJSONBody(writer, request, &payload) {
			return
		}
		keys := loginKeys(request, proxyTrust)
		if retryAfter, allowed := limiter.Allow(keys...); !allowed {
			writer.Header().Set("Retry-After", strconv.Itoa(int(retryAfter.Seconds())))
			writeAPIError(writer, http.StatusTooManyRequests, "login_rate_limited", "登录尝试过多，请稍后重试")
			return
		}
		session, err := service.Login(request.Context(), payload.Username, payload.Password)
		if err != nil {
			if errors.Is(err, auth.ErrInvalidCredentials) {
				limiter.Failure(keys...)
			}
			writeAuthenticationError(writer, err)
			return
		}
		limiter.Success(keys...)
		setSessionCookie(writer, session, secureCookie || proxyTrust.requestScheme(request) == "https")
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
		clearSessionCookie(writer, secureCookie || proxyTrust.requestScheme(request) == "https")
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
		setSessionCookie(writer, newSession, secureCookie || proxyTrust.requestScheme(request) == "https")
		writeJSON(writer, http.StatusOK, sessionResponse(newSession))
	})
}

func authenticationMiddleware(next http.Handler, service AuthenticationService, secureCookie bool, proxyTrust proxyTrust) http.Handler {
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
			clearSessionCookie(writer, secureCookie || proxyTrust.requestScheme(request) == "https")
			writeAPIError(writer, http.StatusUnauthorized, "authentication_required", "登录会话无效或已过期")
			return
		}
		if request.Method != http.MethodGet && request.Method != http.MethodHead && request.Method != http.MethodOptions {
			if !sameOrigin(request, proxyTrust) {
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

func sameOrigin(request *http.Request, proxyTrust proxyTrust) bool {
	origin := request.Header.Get("Origin")
	if origin == "" {
		return true
	}
	parsed, err := url.Parse(origin)
	if err != nil || parsed.Host == "" {
		return false
	}
	return strings.EqualFold(parsed.Host, request.Host) && strings.EqualFold(parsed.Scheme, proxyTrust.requestScheme(request))
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

func loginKeys(request *http.Request, proxyTrust proxyTrust) []string {
	return []string{"address\x00" + proxyTrust.clientAddress(request)}
}

type loginAttempt struct {
	count        int
	windowStart  time.Time
	blockedUntil time.Time
	updatedAt    time.Time
}

type loginLimiter struct {
	mu          sync.Mutex
	attempts    map[string]loginAttempt
	now         func() time.Time
	nextCleanup time.Time
}

func newLoginLimiter() *loginLimiter {
	return &loginLimiter{attempts: make(map[string]loginAttempt), now: time.Now}
}

func (l *loginLimiter) Allow(keys ...string) (time.Duration, bool) {
	l.mu.Lock()
	defer l.mu.Unlock()
	now := l.now()
	l.cleanup(now)
	var retryAfter time.Duration
	for _, key := range keys {
		attempt := l.attempts[key]
		if now.Before(attempt.blockedUntil) {
			retryAfter = max(retryAfter, attempt.blockedUntil.Sub(now))
		}
	}
	return retryAfter, retryAfter == 0
}

func (l *loginLimiter) Failure(keys ...string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	now := l.now()
	l.cleanup(now)
	for _, key := range keys {
		if _, exists := l.attempts[key]; !exists && len(l.attempts) >= maxLoginAttempts {
			l.evictOldest()
		}
		attempt := l.attempts[key]
		if attempt.windowStart.IsZero() || now.Sub(attempt.windowStart) > 5*time.Minute {
			attempt = loginAttempt{windowStart: now}
		}
		attempt.count++
		attempt.updatedAt = now
		if attempt.count >= 5 {
			attempt.blockedUntil = now.Add(15 * time.Minute)
		}
		l.attempts[key] = attempt
	}
}

func (l *loginLimiter) Success(keys ...string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	for _, key := range keys {
		delete(l.attempts, key)
	}
}

func (l *loginLimiter) cleanup(now time.Time) {
	if !l.nextCleanup.IsZero() && now.Before(l.nextCleanup) {
		return
	}
	for key, attempt := range l.attempts {
		if !now.Before(attempt.blockedUntil) && now.Sub(attempt.windowStart) > 5*time.Minute {
			delete(l.attempts, key)
		}
	}
	l.nextCleanup = now.Add(time.Minute)
}

func (l *loginLimiter) evictOldest() {
	var oldestKey string
	var oldestTime time.Time
	for key, attempt := range l.attempts {
		if oldestKey == "" || attempt.updatedAt.Before(oldestTime) {
			oldestKey = key
			oldestTime = attempt.updatedAt
		}
	}
	delete(l.attempts, oldestKey)
}
