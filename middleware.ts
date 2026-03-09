import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/explorar(.*)',
  '/instituicoes(.*)',
  '/auloes(.*)',
  '/login(.*)',
  '/cadastro(.*)',
  '/reset-password(.*)',
  '/sso-callback(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl

  // For API proxy requests: inject Clerk token as Authorization header
  if (pathname.startsWith('/api/')) {
    const { getToken } = await auth()
    const token = await getToken()
    if (token) {
      const requestHeaders = new Headers(req.headers)
      requestHeaders.set('Authorization', `Bearer ${token}`)
      return NextResponse.next({ request: { headers: requestHeaders } })
    }
    return NextResponse.next()
  }

  // Redirect signed-in users away from auth pages
  // Allow /cadastro?oauth=1 for signed-in users completing OAuth registration
  const authPaths = ['/login', '/cadastro']
  if (authPaths.some(p => pathname.startsWith(p))) {
    const { userId } = await auth()
    if (userId) {
      const isOAuthCompletion = pathname.startsWith('/cadastro') && req.nextUrl.searchParams.get('oauth') === '1'
      if (!isOAuthCompletion) {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
    return NextResponse.next()
  }

  // Protect non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
