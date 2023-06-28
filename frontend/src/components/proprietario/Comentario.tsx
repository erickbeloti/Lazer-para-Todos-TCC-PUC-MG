import { Box, Paper, Rating, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import DisabilityIcon from '../disability';

interface ComentarioProps {
	comentario: ComentarioApiType;
}

const deficiencias = [
	'Física',
	'Auditiva',
	'Visual',
	'Intelectual',
	'Autismo',
	'Idoso 80+',
];

export default function Comentario({ comentario }: ComentarioProps) {
	return (
		<Box>
			<Typography variant="h6" fontWeight={700}>
				{comentario.nome}
			</Typography>

			<Paper
				variant="outlined"
				sx={{
					borderRadius: '15px',
					border: 0,
					backgroundColor: '#6B3B82',
					color: '#fff',
					p: 2,
				}}
			>
				<Grid container justifyContent={'end'}>
					<Grid xs={12} md>
						<Typography variant="subtitle2">{comentario.comentario}</Typography>
					</Grid>

					<Grid container direction={'column'}>
						<Grid>
							<Rating
								precision={0.5}
								size="large"
								value={comentario.avaliacao}
								readOnly
							/>
						</Grid>

						<Grid container>
							{deficiencias.map(deficiencia => (
								<DisabilityIcon
									key={deficiencia}
									type={deficiencia}
									elabled={
										comentario.deficiencias.find(
											def => def.tipoDeDeficiencia === deficiencia,
										)
											? true
											: false
									}
									size={25}
								/>
							))}
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}
