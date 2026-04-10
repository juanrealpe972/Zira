'use client'

import { useEffect, useState } from 'react'

type UserPayload = {
  user_id: number
  exp: number
  iat: number
}

function getTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/zira_access=([^;]+)/)
  return match ? match[1] : null
}

function decodeJWT(token: string): UserPayload | null {
  try {
    const payload = token.split('.')[1]
    const decoded = JSON.parse(atob(payload))
    return decoded
  } catch {
    return null
  }
}

function isTokenExpired(payload: UserPayload): boolean {
  return Date.now() / 1000 > payload.exp
}

export function useAuth() {
  const [userId, setUserId] = useState<number | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getTokenFromCookie()

    if (!token) {
      setIsAuthenticated(false)
      setLoading(false)
      return
    }

    const payload = decodeJWT(token)

    if (!payload || isTokenExpired(payload)) {
      document.cookie = 'zira_access=; path=/; max-age=0'
      document.cookie = 'zira_refresh=; path=/; max-age=0'
      setIsAuthenticated(false)
      setLoading(false)
      return
    }

    setUserId(payload.user_id)
    setIsAuthenticated(true)
    setLoading(false)
  }, [])

  return { userId, isAuthenticated, loading }
}