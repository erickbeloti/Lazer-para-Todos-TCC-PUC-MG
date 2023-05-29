import {
	Alert,
	Box,
	Collapse,
	Container,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

interface FormData {
	email: string;
	password: string;
}

const schema = yup
	.object({
		email: yup
			.string()
			.email('Deve ser um email válido')
			.required('Email obrigatório'),
		password: yup.string().required('Senha obrigatório'),
	})
	.required();

export default function SignIn() {
	const [openError, setOpenError] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const router = useRouter();

	const onSubmit: SubmitHandler<FormData> = async data => {
		console.log(data);

		const res = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
		});

		if (res?.error) {
			setOpenError(true);
			enqueueSnackbar('Email ou senha inválidos. Confira suas credenciais', {
				variant: 'error',
			});
		}

		if (res?.ok) {
			router.push('/app');
		}
	};

	useEffect(() => {
		if (openError) {
			const timer = setTimeout(() => {
				setOpenError(false);
			}, 5000);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [openError]);

	return (
		<Container component="main" maxWidth="xs">
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
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
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										required
										label="Email"
										variant="standard"
										type="email"
										sx={{
											marginTop: '10px',
											marginLeft: '50px',
											marginRight: '50px',
										}}
										inputProps={{ autoComplete: 'username' }}
										error={!!errors.email}
										helperText={errors.email?.message}
									/>
								)}
							/>

							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										required
										label="Senha"
										variant="standard"
										type="password"
										sx={{
											marginTop: '4px',
											marginLeft: '50px',
											marginRight: '50px',
											marginBottom: '40px',
										}}
										inputProps={{ autoComplete: 'password' }}
										error={!!errors.password}
										helperText={errors.password?.message}
									/>
								)}
							/>
						</Grid>

						<Collapse in={openError}>
							<Alert severity="error">
								Email ou senha inválidos.{' '}
								<strong>Confira suas credenciais</strong>
							</Alert>
						</Collapse>
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
						disabled={isSubmitting}
					>
						Entrar
					</Button>
				</Grid>
			</form>
		</Container>
	);
}
