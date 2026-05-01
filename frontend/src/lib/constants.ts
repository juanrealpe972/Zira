/**
 * Constantes de autenticación y rutas
 */

// Keys de cookies
export const TOKEN_KEY = 'zira_access'
export const REFRESH_KEY = 'zira_refresh'

// Rutas protegidas (requieren autenticación)
export const PROTECTED_ROUTES = [
  '/dashboard',
  '/tasks',
  '/orders',
  '/products',
  '/publications',
  '/bank-accounts',
  '/bank-cards',
  '/loans',
  '/savings',
  '/incomes',
  '/expenses',
]

export const API_CONFIG = {
  ACCESS_TOKEN_LIFETIME: 15 * 60,      // 15 min
  REFRESH_TOKEN_LIFETIME: 24 * 60 * 60, // 1 día
  REFRESH_MARGIN: 60, // segundos antes de expirar para refrescar
}

// Rutas de autenticación (redirigir si ya está logueado)
export const AUTH_ROUTES = [
  '/auth/login',
  '/auth/register',
]

// Duración del token de acceso (15 minutos)
export const ACCESS_TOKEN_EXPIRY = 15 * 60

// Duración del token de refresh (1 día)
export const REFRESH_TOKEN_EXPIRY = 24 * 60 * 60