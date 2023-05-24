import { Box, Container, Paper, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
	const [userInfo, setUserInfo] = useState({ email: '', password: '' });
	const router = useRouter();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();

		const res = await signIn('credentials', {
			email: userInfo.email,
			password: userInfo.password,
			redirect: false,
		});

		console.log(res);

		if (res?.ok) {
			const url = new URL(res.url || '');
			const callback = url.searchParams.get('callbackUrl');

			console.log(callback);

			router.push(callback || '/');
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<form onSubmit={handleSubmit}>
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

					<Paper
						variant="outlined"
						sx={{
							borderRadius: '15px',
							border: 0,
						}}
					>
						<Paper
							square
							sx={{
								backgroundColor: '#1AE6EF',
								height: 50,
								display: 'flex',
								justifyContent: 'center',
								borderTopLeftRadius: '15px',
								borderTopRightRadius: '15px',
							}}
						>
							<Grid container justifyContent="center" alignItems="center">
								<Grid xs>
									<Typography variant="h5">Login</Typography>
								</Grid>
							</Grid>
						</Paper>

						<Grid container direction={'column'}>
							<TextField
								label="Email"
								variant="standard"
								type="email"
								sx={{
									marginTop: '10px',
									marginLeft: '50px',
									marginRight: '50px',
								}}
								onChange={({ target }) =>
									setUserInfo({ ...userInfo, email: target.value })
								}
							/>
							<TextField
								label="Senha"
								variant="standard"
								type="password"
								sx={{
									marginTop: '4px',
									marginLeft: '50px',
									marginRight: '50px',
									marginBottom: '40px',
								}}
								onChange={({ target }) =>
									setUserInfo({ ...userInfo, password: target.value })
								}
							/>
						</Grid>
					</Paper>
					<Typography sx={{ alignSelf: 'center', marginTop: 0.5 }}>
						Esqueceu sua senha?
					</Typography>
					<Button
						variant="contained"
						sx={{
							marginTop: 2.5,
							width: 128,
							alignSelf: 'center',
						}}
						type="submit"
					>
						Entrar
					</Button>
				</Grid>
			</form>
		</Container>
	);
}
