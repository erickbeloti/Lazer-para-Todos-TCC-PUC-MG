import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUp() {
	return (
		<>
			<Head>
				<title>Sign Up</title>
			</Head>
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
							<Link
								href="/signup/pcd"
								passHref
								style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}
							>
								<Button variant="contained" sx={{ flexGrow: 1 }}>
									PcD
								</Button>
							</Link>
						</Grid>
						<Grid display={'flex'} xs>
							<Link
								href="/signup/proprietario"
								passHref
								style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}
							>
								<Button variant="contained" sx={{ flexGrow: 1 }}>
									Proprietário
								</Button>
							</Link>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
