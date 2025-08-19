import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Get the file extension from the URL
  const url = request.nextUrl.pathname
  const isStaticAsset = /\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot|mp4|webm|ogg)$/.test(url)
  const isImage = /\.(png|jpg|jpeg|gif|webp|svg)$/.test(url)
  const isVideo = /\.(mp4|webm|ogg)$/.test(url)
  const isFont = /\.(woff|woff2|ttf|eot)$/.test(url)
  const isHtml = /\.html$/.test(url)
  const isJson = /\.json$/.test(url)

  // Set cache headers based on file type
  if (isStaticAsset || isImage || isVideo || isFont) {
    // Cache static assets for 1 year (immutable)
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else if (isHtml) {
    // Cache HTML pages for 1 hour
    response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate')
  } else if (isJson) {
    // Cache JSON data for 30 minutes
    response.headers.set('Cache-Control', 'public, max-age=1800, must-revalidate')
  } else {
    // Default cache for other assets (24 hours)
    response.headers.set('Cache-Control', 'public, max-age=86400, must-revalidate')
  }

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

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
