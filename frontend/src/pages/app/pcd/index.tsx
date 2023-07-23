import { AvatarProprietario } from '@/components/proprietario/AvatarProprietario';
import useApiAuth from '@/lib/hooks/useApiAuth';
import {
	Alert,
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Container,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Index() {
	const { apiAuth, isLoadingApi } = useApiAuth();
	const fetcher = (url: string) => apiAuth.get(url).then(res => res.data);
	const router = useRouter();
	const { data: session } = useSession();
	const {
		data: favoritos,
		error: errorFavoritos,
		isLoading: isLoadingFavoritos,
	} = useSWR<ProprietarioSummaryApiType[]>(
		session && !isLoadingApi ? `/api/pcds/${session?.user.id}/favoritos` : null,
		fetcher,
	);

	const {
		data: sugestoes,
		error: errorSugestoes,
		isLoading: isLoadingSugestoes,
	} = useSWR<ProprietarioSummaryApiType[]>(
		session && !isLoadingApi ? `/api/pcds/${session?.user.id}/sugestoes` : null,
		fetcher,
	);

	if (
		!isLoadingFavoritos &&
		!isLoadingSugestoes &&
		(errorFavoritos || errorSugestoes)
	)
		return (
			<Container component="main" maxWidth="sm">
				<Box m={2}>
					<Alert severity="error" sx={{ textAlign: 'center' }}>
						Erro ao tentar recuperar informações do PcD.
						<Button href={router.asPath}>Tente novamente</Button>
					</Alert>
				</Box>
			</Container>
		);

	return (
		<>
			<Head>
				<title>Dashboard PcD</title>
			</Head>

			{(isLoadingFavoritos || isLoadingSugestoes) && (
				<Backdrop
					sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
					open
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}

			{!isLoadingFavoritos && !isLoadingSugestoes && session && (
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

						{favoritos?.map(favorito => (
							<Grid key={favorito.id}>
								<AvatarProprietario
									id={favorito.id}
									nome={favorito.nomeEstabelecimento}
									urlIcone={favorito.urlIcone}
								/>
							</Grid>
						))}
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

						{sugestoes?.map(sugestao => (
							<Grid key={sugestao.id}>
								<AvatarProprietario
									id={sugestao.id}
									nome={sugestao.nomeEstabelecimento}
									urlIcone={sugestao.urlIcone}
								/>
							</Grid>
						))}
					</Grid>
				</Container>
			)}
		</>
	);
}
