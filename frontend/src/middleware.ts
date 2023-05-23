import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
export async function middleware(request: NextRequest, _next: NextFetchEvent) {
	const { pathname } = request.nextUrl;
	const protectedPaths = ['/pcd', '/proprietario'];

	const matchesProtectedPath = protectedPaths.some(
		path => pathname.startsWith(path) || pathname === '/',
	);

	if (matchesProtectedPath) {
		const token = await getToken({ req: request });
		if (!token) {
			const url = new URL(`/signin`, request.url);
			url.searchParams.set('callbackUrl', encodeURI(request.url));
			return NextResponse.redirect(url);
		}

		if (token?.error === 'expired token') {
			console.log('token expirado');
			const url = new URL(`/signin`, request.url);
			url.searchParams.set('callbackUrl', encodeURI(request.url));
			return NextResponse.redirect(url);
		}

		if (token.userRole === 'pcd' && pathname === '/') {
			const url = new URL(`/pcd`, request.url);
			return NextResponse.redirect(url);
		}

		if (token.userRole === 'pcd' && !pathname.startsWith('/pcd')) {
			const url = new URL(`/403`, request.url);
			return NextResponse.rewrite(url);
		}

		if (token.userRole === 'proprietario' && pathname === '/') {
			const url = new URL(`/proprietario`, request.url);
			return NextResponse.redirect(url);
		}

		if (
			token.userRole === 'proprietario' &&
			!pathname.startsWith('/proprietario')
		) {
			const url = new URL(`/403`, request.url);
			return NextResponse.rewrite(url);
		}

		if (!token.userRole) {
			const url = new URL(`/403`, request.url);
			return NextResponse.rewrite(url);
		}
	}

	return NextResponse.next();
}
