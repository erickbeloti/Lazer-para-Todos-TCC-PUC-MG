import 'next-auth/jwt';
import 'next-auth';
import { DefaultSession } from 'next-auth';

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
	interface Session extends DefaultSession {
		user: User;
	}

	interface User {
		id: string;
		userRole: string;
		accessToken: string;
	}
}
