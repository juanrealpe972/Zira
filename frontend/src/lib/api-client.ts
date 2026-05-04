import { TOKEN_KEY, REFRESH_KEY, API_CONFIG } from './constants'

const API_URL = process.env.NEXT_PUBLIC_API_URL

// ============================================
// ERROR PERSONALIZADO
// ============================================

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// ============================================
// TOKENS — CLIENTE
// ============================================

export function getClientToken(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(^| )${TOKEN_KEY}=([^;]+)`))
  return match ? match[2] : null
}

export function getClientRefreshToken(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(^| )${REFRESH_KEY}=([^;]+)`))
  return match ? match[2] : null
}

// ============================================
// TOKENS — SERVIDOR (solo Server Components)
// ============================================

export async function getServerToken(): Promise<string | null> {
  try {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    return cookieStore.get(TOKEN_KEY)?.value ?? null
  } catch {
    return null
  }
}

export async function getServerRefreshToken(): Promise<string | null> {
  try {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    return cookieStore.get(REFRESH_KEY)?.value ?? null
  } catch {
    return null
  }
}

// ============================================
// COOKIES
// ============================================

export function setTokens(access: string, refresh: string): void {
  if (typeof document === 'undefined') return
  document.cookie = `${TOKEN_KEY}=${access}; path=/; max-age=${API_CONFIG.ACCESS_TOKEN_LIFETIME}; SameSite=Strict`
  document.cookie = `${REFRESH_KEY}=${refresh}; path=/; max-age=${API_CONFIG.REFRESH_TOKEN_LIFETIME}; SameSite=Strict`
}

export function clearTokens(): void {
  if (typeof document === 'undefined') return
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`
  document.cookie = `${REFRESH_KEY}=; path=/; max-age=0`
}

export function getToken(): string | null {
  return getClientToken()
}

export function isAuthenticated(): boolean {
  return !!getClientToken()
}

// ============================================
// REFRESH AUTOMÁTICO
// ============================================

let isRefreshing = false
let refreshPromise: Promise<boolean> | null = null

function isTokenExpiringSoon(): boolean {
  if (typeof document === 'undefined') return false
  const token = getClientToken()
  if (!token) return true
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp - Math.floor(Date.now() / 1000) < API_CONFIG.REFRESH_MARGIN
  } catch {
    return true
  }
}

export function isTokenExpiring(): boolean {
  if (typeof document === 'undefined') return false

  const token = getToken()
  if (!token) return true

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const currentTime = Math.floor(Date.now() / 1000)

    // margen de 2 minutos (puedes ajustarlo)
    const REFRESH_MARGIN = 120

    return payload.exp - currentTime < REFRESH_MARGIN
  } catch {
    return true
  }
}

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getClientRefreshToken()
  if (!refreshToken) return false
  try {
    const response = await fetch(`${API_URL}/api/v1/login/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    })
    if (!response.ok) {
      clearTokens()
      return false
    }
    const data = await response.json()
    setTokens(data.access, refreshToken)
    return true
  } catch {
    return false
  }
}

async function ensureValidToken(): Promise<boolean> {
  if (isRefreshing && refreshPromise) return refreshPromise
  if (!isTokenExpiringSoon()) return true
  isRefreshing = true
  refreshPromise = (async () => {
    try {
      return await refreshAccessToken()
    } finally {
      isRefreshing = false
      refreshPromise = null
    }
  })()
  return refreshPromise
}

// ============================================
// HEADERS
// ============================================

function getHeaders(includeAuth = true): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (includeAuth) {
    const token = getClientToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

// ============================================
// MANEJO DE RESPUESTA
// ============================================

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 401 && !isRefreshing) {
    const refreshed = await ensureValidToken()
    if (refreshed) {
      throw new ApiError(
        'Sesión expirada. Por favor inicia sesión nuevamente.',
        401,
        'TOKEN_EXPIRED'
      )
    }
  }

  if (!response.ok) {
    let message = 'Error de conexión'
    let code: string | undefined
    try {
      const error = await response.json()
      message = error.detail || error.message || JSON.stringify(error)
      code = error.code
    } catch {
      message = response.statusText
    }
    throw new ApiError(message, response.status, code)
  }

  const text = await response.text()
  if (!text) return undefined as T
  try {
    return JSON.parse(text)
  } catch {
    return text as T
  }
}

// ============================================
// MÉTODOS HTTP
// ============================================

export async function apiGet<T>(endpoint: string, includeAuth = true): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers: getHeaders(includeAuth),
  })
  return handleResponse<T>(response)
}

export async function apiPost<T>(endpoint: string, data?: unknown, includeAuth = true): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(includeAuth),
    body: data ? JSON.stringify(data) : undefined,
  })
  return handleResponse<T>(response)
}

export async function apiPatch<T>(endpoint: string, data: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'PATCH',
    headers: getHeaders(true),
    body: JSON.stringify(data),
  })
  return handleResponse<T>(response)
}

export async function apiPut<T>(endpoint: string, data: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers: getHeaders(true),
    body: JSON.stringify(data),
  })
  return handleResponse<T>(response)
}

export async function apiDelete<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getHeaders(true),
  })
  return handleResponse<T>(response)
}