import { cookies } from 'next/headers'

export const TOKEN_KEY = 'zira_access'
export const REFRESH_KEY = 'zira_refresh'

export async function getAccessToken() {
  const cookieStore = await cookies()
  return cookieStore.get(TOKEN_KEY)?.value ?? null
}