import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';

export default function Index() {
	return (
		<Container component="main" maxWidth="lg">
			<Box mt={8} />
			<Grid
				container
				spacing={4}
				justifyContent={'center'}
				alignItems={'center'}
			>
				<Grid
					xs={12}
					sm={12}
					md={12}
					lg={12}
					xl={12}
					display={'flex'}
					justifyContent={'end'}
				>
					<Link href="/app/pcd/advanced-filter" passHref>
						<Button
							variant="contained"
							color="secondary"
							sx={{
								width: 200,
							}}
						>
							Filtro Avançado
						</Button>
					</Link>
				</Grid>
				<Grid xs={12} sm={12} md={12} lg={12} xl={12}>
					<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
						Favoritos
					</Typography>
				</Grid>
				<Grid>
					<Box
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'center'}
						alignItems={'center'}
					>
						<Avatar
							alt="Pão e Prosa"
							src="/companies/1.png"
							sx={{ width: 100, height: 100 }}
						/>
						<Typography
							variant="body1"
							mt={1}
							sx={{ textAlign: 'center', fontWeight: 'bold' }}
						>
							Pão e Prosa
						</Typography>
					</Box>
				</Grid>
				<Grid>
					<Box
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'center'}
						alignItems={'center'}
					>
						<Avatar
							alt="Sabores do Interior"
							src="/companies/2.png"
							sx={{ width: 100, height: 100 }}
						/>
						<Typography
							variant="body1"
							mt={1}
							sx={{ textAlign: 'center', fontWeight: 'bold' }}
						>
							Sabores do Interior
						</Typography>
					</Box>
				</Grid>
				<Grid>
					<Box
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'center'}
						alignItems={'center'}
					>
						<Avatar
							alt="Parque dos Ipês"
							src="/companies/3.png"
							sx={{ width: 100, height: 100 }}
						/>
						<Typography
							variant="body1"
							mt={1}
							sx={{ textAlign: 'center', fontWeight: 'bold' }}
						>
							Parque dos Ipês
						</Typography>
					</Box>
				</Grid>
				<Grid>
					<Box
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'center'}
						alignItems={'center'}
					>
						<Avatar
							alt="Rancho do Vô João"
							src="/companies/4.png"
							sx={{ width: 100, height: 100 }}
						/>
						<Typography
							variant="body1"
							mt={1}
							sx={{ textAlign: 'center', fontWeight: 'bold' }}
						>
							Rancho do Vô João
						</Typography>
					</Box>
				</Grid>
				<Grid>
					<Box
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'center'}
						alignItems={'center'}
					>
						<Avatar
							alt="Parque Aquático Splash"
							src="/companies/5.png"
							sx={{ width: 100, height: 100 }}
						/>
						<Typography
							variant="body1"
							mt={1}
							sx={{ textAlign: 'center', fontWeight: 'bold' }}
						>
							Parque Aquático Splash
						</Typography>
					</Box>
				</Grid>
			</Grid>

			<Box mt={4} />

			<Grid
				container
				spacing={4}
				justifyContent={'center'}
				alignItems={'center'}
			>
				<Grid xs={12} sm={12} md={12} lg={12} xl={12}>
					<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
						Explore!
					</Typography>
				</Grid>

				<Grid>
					<Box
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'center'}
						alignItems={'center'}
					>
						<Avatar
							alt="Fazenda do Vale"
							src="/companies/6.png"
							sx={{ width: 100, height: 100 }}
						/>
						<Typography
							variant="body1"
							mt={1}
							sx={{ textAlign: 'center', fontWeight: 'bold' }}
						>
							Fazenda do Vale
						</Typography>
					</Box>
				</Grid>

				<Grid>
					<Box
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'center'}
						alignItems={'center'}
					>
						<Avatar
							alt="Espaço Cultural Atlântico"
							src="/companies/7.png"
							sx={{ width: 100, height: 100 }}
						/>
						<Typography
							variant="body1"
							mt={1}
							sx={{ textAlign: 'center', fontWeight: 'bold' }}
						>
							Espaço Cultural Atlântico
						</Typography>
					</Box>
				</Grid>

				<Grid>
					<Box
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'center'}
						alignItems={'center'}
					>
						<Avatar
							alt="Fazenda Harmonia"
							src="/companies/8.png"
							sx={{ width: 100, height: 100 }}
						/>
						<Typography
							variant="body1"
							mt={1}
							sx={{ textAlign: 'center', fontWeight: 'bold' }}
						>
							Fazenda Harmonia
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
}
