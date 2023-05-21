import axios from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			type: 'credentials',
			credentials: {},
			async authorize(credentials, req) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};

				try {
					const user = await axios.post(
						'https://apim-tu.azure-api.net/lazer-para-todos/auth/login',
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
				} catch (e) {
					console.log(e);
					throw new Error('invalid credentials');
				}
			},
		}),
	],
	callbacks: {
		jwt({ token, account }) {
			if (account) {
				token.accessToken = account?.access_token;
			}

			return token;
		},
		session({ session, token }) {
			session.accessToken = token.accessToken;
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
};

export default NextAuth(authOptions);
