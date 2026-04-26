/**
 * Utilidades de cookies para el servidor
 * Re-exporta las constantes de constants.ts para compatibilidad
 */

import { cookies } from 'next/headers'
import { TOKEN_KEY, REFRESH_KEY } from './constants'

// Re-exportar constantes para compatibilidad
export { TOKEN_KEY, REFRESH_KEY }

/**
 * Obtiene el token de acceso en el servidor
 */
export async function getAccessToken() {
  const cookieStore = await cookies()
  return cookieStore.get(TOKEN_KEY)?.value ?? null
}

/**
 * Obtiene el refresh token en el servidor
 */
export async function getRefreshToken() {
  const cookieStore = await cookies()
  return cookieStore.get(REFRESH_KEY)?.value ?? null
}