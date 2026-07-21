export interface APIErrorBody {
  error?: {
    code?: string
    message?: string
    [key: string]: unknown
  }
}

export class APIError extends Error {
  readonly status: number
  readonly code: string
  readonly body: APIErrorBody

  constructor(status: number, body: APIErrorBody) {
    super(body.error?.message || `请求失败（${status}）`)
    this.name = 'APIError'
    this.status = status
    this.code = body.error?.code || 'request_failed'
    this.body = body
  }
}

let csrfToken = ''

export function setCSRFToken(token: string): void {
  csrfToken = token
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const method = (options.method || 'GET').toUpperCase()
  const headers = new Headers(options.headers)
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method) && csrfToken) {
    headers.set('X-CSRF-Token', csrfToken)
  }

  const response = await fetch(path, {
    ...options,
    method,
    headers,
    credentials: 'same-origin',
  })
  if (response.status === 204) {
    return undefined as T
  }

  const contentType = response.headers.get('Content-Type') || ''
  const body = contentType.includes('application/json')
    ? await response.json()
    : { error: { message: await response.text() } }
  if (!response.ok) {
    if (response.status === 401 && !path.startsWith('/api/v1/auth/')) {
      window.dispatchEvent(new CustomEvent('kdae-panel:auth-expired'))
    }
    throw new APIError(response.status, body as APIErrorBody)
  }
  return body as T
}

export function getJSON<T>(path: string): Promise<T> {
  return apiRequest<T>(path)
}

export function postJSON<T>(path: string, payload?: unknown): Promise<T> {
  return apiRequest<T>(path, {
    method: 'POST',
    body: payload === undefined ? undefined : JSON.stringify(payload),
  })
}

export function putJSON<T>(path: string, payload: unknown): Promise<T> {
  return apiRequest<T>(path, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function getDownload(path: string): Promise<{ blob: Blob; filename: string }> {
  const response = await fetch(path, { credentials: 'same-origin' })
  if (!response.ok) {
    const contentType = response.headers.get('Content-Type') || ''
    const body = contentType.includes('application/json')
      ? await response.json()
      : { error: { message: await response.text() } }
    if (response.status === 401 && !path.startsWith('/api/v1/auth/')) {
      window.dispatchEvent(new CustomEvent('kdae-panel:auth-expired'))
    }
    throw new APIError(response.status, body as APIErrorBody)
  }
  const disposition = response.headers.get('Content-Disposition') || ''
  const matched = /filename="?([^";]+)"?/i.exec(disposition)
  return {
    blob: await response.blob(),
    filename: matched?.[1] || 'dae-sysdump.tar.gz',
  }
}
