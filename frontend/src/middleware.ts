// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { TOKEN_KEY } from '@/lib/cookies'

const PROTECTED = ['/dashboard']
const AUTH_ROUTES = ['/auth/login', '/auth/register']

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_KEY)?.value
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED.some(route => pathname.startsWith(route))
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route))

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (token) {
    const isKnownRoute =
      pathname.startsWith('/dashboard') ||
      pathname.startsWith('/auth') ||
      pathname === '/' ||
      pathname === '/unauthorized'

    if (!isKnownRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
}