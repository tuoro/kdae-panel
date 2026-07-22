import { defineStore } from 'pinia'
import { getJSON, postJSON, setCSRFToken } from '../api/client'
import type { AuthStatus } from '../types/api'

interface Credentials {
  username: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loaded: false,
    loading: false,
    initialized: false,
    authenticated: false,
    bootstrapRequired: false,
    bootstrapAuthorized: false,
    user: undefined as AuthStatus['user'],
    expiresAt: undefined as string | undefined,
  }),
  actions: {
    applyStatus(status: AuthStatus) {
      this.loaded = true
      this.initialized = status.initialized
      this.authenticated = status.authenticated
      this.bootstrapRequired = Boolean(status.bootstrapRequired)
      this.bootstrapAuthorized = Boolean(status.bootstrapAuthorized)
      this.user = status.user
      this.expiresAt = status.expiresAt
      setCSRFToken(status.csrfToken || '')
    },
    async bootstrap(force = false) {
      if (this.loaded && !force) return
      this.loading = true
      try {
        this.applyStatus(await getJSON<AuthStatus>('/api/v1/auth/status'))
      } finally {
        this.loading = false
      }
    },
    async setup(credentials: Credentials) {
      const status = await postJSON<AuthStatus>('/api/v1/auth/setup', credentials)
      this.applyStatus(status)
    },
    async authorizeSetup(token: string) {
      await postJSON<void>('/api/v1/auth/bootstrap', { token })
      await this.bootstrap(true)
      if (this.bootstrapRequired && !this.bootstrapAuthorized) {
        throw new Error('浏览器未接受初始化授权，请确认通过 HTTPS 或本机地址访问')
      }
    },
    async login(credentials: Credentials) {
      const status = await postJSON<AuthStatus>('/api/v1/auth/login', credentials)
      this.applyStatus(status)
    },
    async logout() {
      try {
        await postJSON<void>('/api/v1/auth/logout')
      } finally {
        this.clearSession()
      }
    },
    async changePassword(currentPassword: string, newPassword: string) {
      const status = await postJSON<AuthStatus>('/api/v1/auth/password', { currentPassword, newPassword })
      this.applyStatus(status)
    },
    clearSession() {
      this.loaded = true
      this.authenticated = false
      this.user = undefined
      this.expiresAt = undefined
      setCSRFToken('')
    },
  },
})
