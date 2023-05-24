import 'next-auth/jwt';
import 'next-auth';

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
		name: string;
		email: string;
		userRole: string;
		accessToken: string;
		error: string;
	}
}

declare module 'next-auth' {
	interface Session {
		userRole: string;
		accessToken: string;
	}

	interface User {
		userRole: string;
		accessToken: string;
	}
}
