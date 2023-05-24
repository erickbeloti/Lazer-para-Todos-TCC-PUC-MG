import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
	const { pathname } = request.nextUrl;
	const protectedPaths = ['/pcd', '/proprietario'];

	const matchesProtectedPath = protectedPaths.some(
		path => pathname.startsWith(path) || pathname === '/',
	);

	console.log(pathname);

	if (matchesProtectedPath) {
		const token = await getToken({ req: request });

		if (!token) {
			const url = new URL(`/signin`, request.url);
			url.searchParams.set('callbackUrl', encodeURI(request.url));

			console.log('sem login');
			console.log(url);

			return NextResponse.redirect(url);
		}

		if (token?.error === 'expired token') {
			const url = new URL(`/signin`, request.url);
			url.searchParams.set('callbackUrl', encodeURI(request.url));

			console.log('token expirado');
			console.log(url);

			return NextResponse.redirect(url);
		}

		if (token.userRole === 'pcd' && pathname === '/') {
			const url = new URL(`/pcd`, request.url);

			console.log('role pcd');
			console.log(url);

			return NextResponse.redirect(url);
		}

		if (token.userRole === 'pcd' && !pathname.startsWith('/pcd')) {
			const url = new URL(`/403`, request.url);

			console.log('role pcd e não começa com pcd');
			console.log(url);

			return NextResponse.rewrite(url);
		}

		if (token.userRole === 'proprietario' && pathname === '/') {
			const url = new URL(`/proprietario`, request.url);

			console.log('role proprietario');
			console.log(url);

			return NextResponse.redirect(url);
		}

		if (
			token.userRole === 'proprietario' &&
			!pathname.startsWith('/proprietario')
		) {
			const url = new URL(`/403`, request.url);

			console.log('role proprietario e não começa com proprietario');
			console.log(url);

			return NextResponse.rewrite(url);
		}

		if (!token.userRole) {
			const url = new URL(`/403`, request.url);

			console.log('403');
			console.log(url);

			return NextResponse.rewrite(url);
		}
	}

	return NextResponse.next();
}
