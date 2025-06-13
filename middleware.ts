import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/auth/signin',
  '/auth/register',
]

// Define routes that are part of the setup process
const setupRoutes = [
  '/auth/verify',
  '/store/setup',
]

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  if (!token) {
    // If we're already on the signin page, don't redirect
    if (pathname === '/auth/signin') {
      return NextResponse.next()
    }
    
    const url = new URL('/auth/signin', request.url)
    url.searchParams.set('callbackUrl', encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  try {
    // Get user status from API
    const userRes = await fetch(`${request.nextUrl.origin}/api/user`, {
      headers: {
        'Cookie': request.headers.get('cookie') || '',
      },
    })
    const userData = await userRes.json()

    // Handle API errors
    if (!userRes.ok || !userData) {
      throw new Error('Failed to get user data')
    }

    // If email is not verified and trying to access non-setup routes
    if (!userData.verified && !setupRoutes.includes(pathname) && pathname !== '/auth/verify') {
      return NextResponse.redirect(new URL(`/auth/verify?email=${encodeURIComponent(userData.email)}`, request.url))
    }

    // If email is verified but store setup is not completed
    if (userData.verified && !userData.setupCompleted && !setupRoutes.includes(pathname) && pathname !== '/store/setup') {
      return NextResponse.redirect(new URL('/store/setup', request.url))
    }

    // If trying to access setup routes when already completed
    if (userData.verified && userData.setupCompleted && setupRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    // On error, redirect to sign in
    const url = new URL('/auth/signin', request.url)
    url.searchParams.set('callbackUrl', encodeURI(request.url))
    return NextResponse.redirect(url)
  }
}

// Configure which routes should use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 