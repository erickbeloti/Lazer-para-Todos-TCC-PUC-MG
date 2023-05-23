import axios from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			type: 'credentials',
			credentials: {},
			async authorize(credentials, _req) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};

				try {
					const user = await axios.post(
						`${process.env.NEXT_PUBLIC_URL}/api/auth/login`,
						{
							email: email,
							password: password,
						},
						{
							headers: {
								'Content-Type': 'application/json',
							},
						},
					);

					if (user) {
						return user.data;
					}

					return null;
				} catch (e) {
					console.log(e);
					throw new Error('invalid credentials');
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }): Promise<JWT> {
			if (user) {
				token.accessToken = user.accessToken;
				token.userRole = user.userRole;
			}

			if (token.accessToken) {
				const tokenParsed = JSON.parse(
					Buffer.from(token.accessToken.split('.')[1], 'base64').toString(),
				);
				const dateNowInSeconds = new Date().getTime() / 1000;
				if (dateNowInSeconds > tokenParsed.exp) {
					return {
						...token,
						error: 'expired token',
					};
				}
			}

			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken;

			return session;
		},
	},
	pages: {
		signIn: '/signin',
	},
};

export default NextAuth(authOptions);
