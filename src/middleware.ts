import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Read the custom session cookie set by the client on login
  const sessionCookie = request.cookies.get('toy_session');

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!sessionCookie || sessionCookie.value !== 'admin') {
      // Redirect non-admins to the login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect user routes like /profile
  if (request.nextUrl.pathname.startsWith('/profile') || request.nextUrl.pathname.startsWith('/checkout')) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*', '/checkout/:path*'],
};
