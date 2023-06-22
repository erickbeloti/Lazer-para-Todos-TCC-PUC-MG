import { Avatar, Box, Typography } from '@mui/material';
import Link from 'next/link';

interface AvatarProprietarioProps {
	id: number;
	nome: string;
	urlIcone: string;
}

export function AvatarProprietario({
	id,
	nome,
	urlIcone,
}: AvatarProprietarioProps) {
	return (
		<Link
			href={`/app/estabelecimento/${id}`}
			passHref
			style={{ textDecoration: 'none' }}
		>
			<Box
				display={'flex'}
				flexDirection={'column'}
				justifyContent={'center'}
				alignItems={'center'}
			>
				<Avatar alt={nome} src={urlIcone} sx={{ width: 100, height: 100 }} />
				<Typography
					variant="body1"
					mt={1}
					sx={{
						textAlign: 'center',
						fontWeight: 'bold',
						color: '#fff',
					}}
				>
					{nome}
				</Typography>
			</Box>
		</Link>
	);
}
