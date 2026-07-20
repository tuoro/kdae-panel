export interface User {
  id: number
  username: string
  createdAt: string
}

export interface AuthStatus {
  initialized: boolean
  authenticated: boolean
  user?: User
  csrfToken?: string
  expiresAt?: string
}

