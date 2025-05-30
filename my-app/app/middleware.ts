// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const user = request.cookies.get('user')?.value;

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const parsedUser = JSON.parse(user);
    if (parsedUser.role !== 'ADMIN' && request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    console.error('Lỗi parse user từ cookie:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};