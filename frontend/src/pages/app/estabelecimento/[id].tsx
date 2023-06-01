import {
	Avatar,
	Box,
	Button,
	Container,
	Paper,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export default function Estabelecimento() {
	return (
		<Container component="main" maxWidth="md">
			<Box mt={2} />
			<Paper
				variant="outlined"
				sx={{
					borderRadius: '15px',
					border: 0,
					position: 'relative',
				}}
			>
				<Grid container>
					<Avatar
						alt="Pão e Prosa"
						src="/companies/1.png"
						sx={{ width: 70, height: 70 }}
					/>

					<Grid container direction={'column'}>
						<Typography variant="h6" fontWeight={700}>
							Pão e Prosa
						</Typography>
						<Typography
							variant="subtitle2"
							fontWeight={700}
							color={'rgb(0 0 0 / 41%)'}
						>
							Rua dos Poetas, 123 - Vila das Artes, São Paulo - SP, 01234-567
						</Typography>
						<Typography
							variant="subtitle2"
							fontWeight={700}
							color={'rgb(0 0 0 / 41%)'}
						>
							(11) 5555-5555
						</Typography>

						<Box position={'absolute'} top={8} right={8}>
							<Button
								variant="contained"
								color="secondary"
								sx={{
									width: 103,
								}}
							>
								Seguir
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}
