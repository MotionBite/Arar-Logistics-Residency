import { auth } from '@/lib/auth'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const intlMiddleware = createIntlMiddleware(routing)

// Routes that require authentication (any logged-in user)
const PROTECTED_ROUTES = ['/dashboard']

// Routes that require ADMIN role
const ADMIN_ROUTES = ['/admin']

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Strip locale prefix for route matching
  const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/'

  const isAdminRoute = ADMIN_ROUTES.some((r) => pathnameWithoutLocale.startsWith(r))
  const isProtectedRoute = PROTECTED_ROUTES.some((r) => pathnameWithoutLocale.startsWith(r))

  if (isAdminRoute || isProtectedRoute) {
    const session = await auth()

    if (!session || !session.user) {
      const loginUrl = new URL(`/${req.nextUrl.locale ?? 'en'}/login`, req.url)
      loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (isAdminRoute && session.user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL(`/${req.nextUrl.locale ?? 'en'}`, req.url))
    }
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: [
    '/',
    '/(ar|en)/:path*',
    // Skip Next.js internals and static files
    '/((?!_next|_vercel|api|favicon.ico|.*\\..*).*)',
  ],
}
