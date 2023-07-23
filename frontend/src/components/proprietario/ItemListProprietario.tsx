import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import Link from 'next/link';

interface ItemListProprietarioProps {
	estabelecimento: ProprietarioSummaryApiType;
}

export function ItemListProprietario({
	estabelecimento,
}: ItemListProprietarioProps) {
	return (
		<Link
			href={`/app/estabelecimento/${estabelecimento.id}`}
			passHref
			style={{ textDecoration: 'none' }}
		>
			<ListItem sx={{ backgroundColor: '#6B3B82', borderRadius: 15 }}>
				<ListItemAvatar>
					<Avatar
						alt={estabelecimento.nomeEstabelecimento}
						src={estabelecimento.urlIcone}
						sx={{ width: 50, height: 50 }}
					/>
				</ListItemAvatar>
				<ListItemText
					primary={estabelecimento.nomeEstabelecimento}
					primaryTypographyProps={{ fontWeight: 700 }}
					sx={{ color: '#fff' }}
				/>
			</ListItem>
		</Link>
	);
}
