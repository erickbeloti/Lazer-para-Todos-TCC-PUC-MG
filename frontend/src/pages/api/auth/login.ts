import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { email } = req.body;

		let response;
		if (email === 'ana.silva@email.com') {
			response = {
				id: '1',
				name: 'Ana Silva',
				email: 'ana.silva@email.com',
				userRole: 'pcd',
			};
		}
		if (email === 'contato@fazendaharmonia.com.br') {
			response = {
				id: '2',
				name: 'Fazenda Harmonia',
				email: 'contato@fazendaharmonia.com.br',
				userRole: 'proprietario',
			};
		}

		const accessToken = jwt.sign(
			{
				sub: response?.id,
				name: response?.name,
				email: response?.email,
				userRole: response?.userRole,
				exp: Math.floor(Date.now() / 1000) + 5 * 60,
			},
			process.env.NEXTAUTH_SECRET || '',
		);

		res.status(200).json({ ...response, accessToken });
	}
}
