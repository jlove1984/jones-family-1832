import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

const PROTECTED_PATHS = ['/directory', '/achievements', '/dashboard', '/birthdays', '/payments', '/gallery']

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))
}

export function middleware(request: NextRequest) {
  if (!isProtectedPath(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  const sessionCookie = getSessionCookie(request)
  if (!sessionCookie) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/directory', '/directory/:path*', '/achievements', '/achievements/:path*', '/dashboard', '/dashboard/:path*', '/birthdays', '/birthdays/:path*', '/payments', '/payments/:path*', '/gallery', '/gallery/:path*'],
}
