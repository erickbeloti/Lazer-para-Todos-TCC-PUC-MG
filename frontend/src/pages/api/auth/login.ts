import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { email, password } = req.body;

		if (email === 'ana.silva@email.com' && password === '123') {
			const user = {
				id: '1',
				name: 'Ana Silva',
				email: 'ana.silva@email.com',
				userRole: 'pcd',
			};

			const accessToken = jwt.sign(
				{
					sub: user?.id,
					name: user?.name,
					email: user?.email,
					userRole: user?.userRole,
					exp: Math.floor(Date.now() / 1000) + 30 * 60,
				},
				process.env.NEXTAUTH_SECRET || '',
			);

			res.status(200).json({ ...user, accessToken });
		} else if (
			email === 'contato@fazendaharmonia.com.br' &&
			password === '123'
		) {
			const user = {
				id: '2',
				name: 'Fazenda Harmonia',
				email: 'contato@fazendaharmonia.com.br',
				userRole: 'proprietario',
			};

			const accessToken = jwt.sign(
				{
					sub: user?.id,
					name: user?.name,
					email: user?.email,
					userRole: user?.userRole,
					exp: Math.floor(Date.now() / 1000) + 30 * 60,
				},
				process.env.NEXTAUTH_SECRET || '',
			);

			res.status(200).json({ ...user, accessToken });
		} else {
			res.status(401).end();
		}
	}
}
