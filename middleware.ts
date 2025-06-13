// middleware.ts
import { NextResponse, NextRequest } from 'next/server'
import { verifySession } from './lib/session'

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  
  // Completely public routes (no auth for any method)
  const publicRoutes = [
    '/api/menu-items',
    '/api/categories',
    '/api/reservations'
  ];

  // Skip auth check for public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Protected routes (admin and other APIs)
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    const session = await verifySession();
    
    if (!session) {
      // Handle API routes differently from pages
      if (pathname.startsWith('/api')) {
        return new NextResponse(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      // Redirect for pages
      return NextResponse.redirect(new URL('/auth/signin', origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/menu-items',
    '/api/categories',
    '/api/reservations'
  ]
}