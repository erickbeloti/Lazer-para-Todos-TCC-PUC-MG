import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUp() {
	return (
		<Container component="main" maxWidth="xs">
			<Grid container direction={'column'}>
				<Box sx={{ alignSelf: 'center', marginTop: 4 }}>
					<Link href="/" passHref>
						<Image
							src="/logo.svg"
							alt="logo"
							width="200"
							height="200"
							priority
						/>
					</Link>
				</Box>
				<Grid xs>
					<Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
						Você é
					</Typography>
				</Grid>
				<Grid
					container
					spacing={8}
					justifyContent="center"
					alignItems="center"
					mt={1}
				>
					<Grid display={'flex'} xs>
						<Button variant="contained" sx={{ flexGrow: 1 }}>
							PcD
						</Button>
					</Grid>
					<Grid display={'flex'} xs>
						<Button variant="contained" sx={{ flexGrow: 1 }}>
							Proprietário
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}
