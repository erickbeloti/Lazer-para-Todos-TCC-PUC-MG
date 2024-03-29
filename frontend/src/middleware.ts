import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
	const { pathname } = request.nextUrl;
	const protectedPaths = ['/app'];

	const matchesProtectedPath = protectedPaths.some(path =>
		pathname.startsWith(path),
	);

	if (matchesProtectedPath) {
		const token = await getToken({ req: request });

		if (!token) {
			const url = new URL(`/signin`, request.url);

			return NextResponse.redirect(url);
		}

		if (token?.error === 'expired token') {
			const url = new URL(`/signout`, request.url);
			return NextResponse.redirect(url);
		}

		if (token.userRole === 'PCD' && pathname === '/app') {
			const url = new URL(`/app/pcd`, request.url);

			return NextResponse.redirect(url);
		}

		if (
			token.userRole === 'PCD' &&
			!pathname.startsWith('/app/pcd') &&
			!pathname.startsWith('/app/estabelecimento')
		) {
			const url = new URL(`/403`, request.url);

			return NextResponse.rewrite(url);
		}

		if (token.userRole === 'PROPRIETARIO' && pathname === '/app') {
			const url = new URL(`/app/proprietario`, request.url);

			return NextResponse.redirect(url);
		}

		if (
			token.userRole === 'PROPRIETARIO' &&
			!pathname.startsWith('/app/proprietario') &&
			!pathname.startsWith('/app/estabelecimento')
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
