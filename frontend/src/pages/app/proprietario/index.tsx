import {
	Alert,
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Container,
	IconButton,
	Paper,
	Typography,
} from '@mui/material';
import Head from 'next/head';
import Grid from '@mui/material/Unstable_Grid2';
import EditIcon from '@mui/icons-material/Edit';
import { Fragment } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import DisabilityIcon from '@/components/disability';
import ImagemProprietario from '@/components/proprietario/ImageProprietario';
import useApiAuth from '@/lib/hooks/useApiAuth';

export default function Index() {
	const { apiAuth, isLoadingApi } = useApiAuth();
	const fetcher = (url: string) => apiAuth.get(url).then(res => res.data);
	const router = useRouter();
	const { data: session } = useSession();

	const {
		data: proprietario,
		error,
		isLoading,
	} = useSWR<ProprietarioUserApiType>(
		session && !isLoadingApi ? `/api/proprietarios/${session?.user.id}` : null,
		fetcher,
	);

	if (!isLoading && error)
		return (
			<Container component="main" maxWidth="sm">
				<Box m={2}>
					<Alert severity="error" sx={{ textAlign: 'center' }}>
						Erro ao tentar recuperar informações do proprietário.
						<Button href={router.asPath}>Tente novamente</Button>
					</Alert>
				</Box>
			</Container>
		);

	return (
		<>
			<Head>
				<title>Proprietário</title>
			</Head>

			{isLoading && (
				<Backdrop
					sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
					open
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}

			{!isLoading && session && (
				<Container component="main" maxWidth="md">
					<Box mt={2} />

					<Grid container justifyContent={'center'} mb={1}>
						<Button
							variant="contained"
							color="secondary"
							sx={{
								width: 250,
							}}
						>
							Visualizar estabelecimento
						</Button>
					</Grid>

					<Paper
						variant="outlined"
						sx={{
							borderRadius: '15px',
							border: 0,
							position: 'relative',
						}}
					>
						<ImagemProprietario proprietario={proprietario} />

						<Grid
							container
							direction={'column'}
							justifyContent={'center'}
							alignContent={'center'}
						>
							<Typography variant="h6" fontWeight={700} textAlign={'center'}>
								{proprietario?.nomeEstabelecimento}
							</Typography>

							<Typography
								variant="subtitle2"
								fontWeight={700}
								color={'rgb(0 0 0 / 41%)'}
								textAlign={'center'}
							>
								{`${proprietario?.logradouro}, ${proprietario?.endereco.bairro}, ${proprietario?.endereco.cidade} - ${proprietario?.endereco.estado}`}
							</Typography>

							<Typography
								variant="subtitle2"
								fontWeight={700}
								color={'rgb(0 0 0 / 41%)'}
								textAlign={'center'}
							>
								{proprietario?.telefone}
							</Typography>
						</Grid>

						<Box p={4} position={'relative'}>
							<Typography variant="h6" fontWeight={700}>
								Acessibilidades
							</Typography>

							<Grid>
								{proprietario?.deficiencias.map(({ deficiencia }) => (
									<Fragment key={deficiencia.id}>
										<DisabilityIcon type={deficiencia.tipoDeDeficiencia} />
									</Fragment>
								))}
							</Grid>

							<Box mt={2} />

							<Typography variant="h6" fontWeight={700}>
								Descrição
							</Typography>

							<Typography variant="subtitle2">
								{proprietario?.descricao}
							</Typography>

							<Box position={'absolute'} bottom={4} right={4}>
								<IconButton
									sx={{ color: 'black' }}
									onClick={() =>
										router.push(`/app/proprietario/edit/${session?.user.id}`)
									}
								>
									<EditIcon sx={{ fontSize: 48 }} />
								</IconButton>
							</Box>
						</Box>
					</Paper>
				</Container>
			)}
		</>
	);
}
