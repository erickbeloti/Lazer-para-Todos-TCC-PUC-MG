import api from '@/lib/api';
import axios from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
		maxAge: 12 * 60 * 60,
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
						`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/auth/login`,
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
		async jwt({ token, trigger, user }): Promise<JWT> {
			if (user) {
				token.id = user.usuario.id;
				token.email = user.usuario.email;
				token.name = user.usuario.nome;
				token.userRole = user.usuario.papel;
				token.accessToken = user.accessToken;
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

			if (trigger === 'update') {
				if (token.userRole === 'PCD') {
					const response = await api.get<PcDUserApiType>(
						`/api/pcds/${token.id}`,
						{
							headers: {
								Authorization: `Bearer ${token.accessToken}`,
							},
						},
					);
					const { data: userPcD } = response;

					return { ...token, name: userPcD.nome };
				} else if (token.userRole === 'PROPRIETARIO') {
					const response = await api.get<ProprietarioUserApiType>(
						`/api/proprietarios/${token.id}`,
						{
							headers: {
								Authorization: `Bearer ${token.accessToken}`,
							},
						},
					);
					const { data: userProprietario } = response;

					return { ...token, name: userProprietario.nomeEstabelecimento };
				}

				return { ...token };
			}

			return token;
		},
		async session({ session, token }) {
			session.user.id = token.id;
			session.user.name = token.name;
			session.user.accessToken = token.accessToken;
			session.user.userRole = token.userRole;

			return session;
		},
	},
	pages: {
		signIn: '/signin',
	},
};

export default NextAuth(authOptions);
