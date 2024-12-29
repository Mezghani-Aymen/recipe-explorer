import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

    const token = request.cookies.get('jwt')?.value;
    
    if (!token && request.nextUrl.pathname.startsWith('/api/recipes/create')) {
        return NextResponse.redirect(new URL('/api/auth/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/recipes/create'],
};