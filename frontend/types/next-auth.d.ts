import 'next-auth/jwt';
import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
		name: string;
		email: string;
		userRole: 'PCD' | 'PROPRIETARIO';
		accessToken: string;
		error: string;
	}
}

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: User;
	}

	interface User {
		usuario: {
			id: string;
			nome: string;
			email: string;
			papel: 'PCD' | 'PROPRIETARIO';
		};
		userRole: string;
		accessToken: string;
	}
}
