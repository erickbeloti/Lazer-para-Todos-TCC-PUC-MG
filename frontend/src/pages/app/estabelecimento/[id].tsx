import {
	Alert,
	Avatar,
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Container,
	Paper,
	Rating,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Head from 'next/head';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import ImagemProprietario from '@/components/proprietario/ImageProprietario';
import DisabilityIcon from '@/components/disability';
import Comentario from '@/components/proprietario/Comentario';
import useApiAuth from '@/lib/hooks/useApiAuth';
import { useSnackbar } from 'notistack';
import { useSession } from 'next-auth/react';
import { mutate } from 'swr';

export default function Estabelecimento() {
	const { enqueueSnackbar } = useSnackbar();
	const { data: session } = useSession();
	const { query, asPath } = useRouter();
	const { id: proprietarioId } = query;
	const { apiAuth, isLoadingApi } = useApiAuth();
	const fetcher = (url: string) => apiAuth.get(url).then(res => res.data);

	const {
		data: proprietario,
		error: errorProprietario,
		isLoading: isLoadingProprietario,
	} = useSWR<ProprietarioUserApiType>(
		proprietarioId && !isLoadingApi
			? `/api/proprietarios/${proprietarioId}`
			: null,
		fetcher,
	);

	const { data: favoritos } = useSWR<ProprietarioSummaryApiType[]>(
		proprietarioId && !isLoadingApi
			? `/api/pcds/${session?.user.id}/favoritos/${proprietarioId}`
			: null,
		fetcher,
	);

	const handleSeguir = async () => {
		try {
			if (favoritos?.length === 0) {
				await apiAuth.post(`/api/pcds/${session?.user.id}/favoritos`, {
					proprietarioId,
				});

				enqueueSnackbar('Estabelecimento favoritado com sucesso', {
					variant: 'success',
				});
			} else {
				await apiAuth.delete(
					`/api/pcds/${session?.user.id}/favoritos/${proprietarioId}`,
				);

				enqueueSnackbar('Estabelecimento desfavoritado com sucesso', {
					variant: 'success',
				});
			}

			mutate(`/api/pcds/${session?.user.id}/favoritos/${proprietarioId}`);
		} catch (error) {
			enqueueSnackbar('Erro ao tentar favoritar esse estabelecimento', {
				variant: 'error',
			});
		}
	};

	if (!isLoadingProprietario && proprietarioId && errorProprietario)
		return (
			<Container component="main" maxWidth="sm">
				<Box m={2}>
					<Alert severity="error" sx={{ textAlign: 'center' }}>
						Erro ao tentar recuperar informações do estabelecimento.
						<Button href={asPath}>Tente novamente</Button>
					</Alert>
				</Box>
			</Container>
		);

	return (
		<>
			<Head>
				<title>Estabelecimento</title>
			</Head>

			{(isLoadingProprietario || !proprietarioId) && (
				<Backdrop
					sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
					open
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}

			{!isLoadingProprietario && proprietarioId && (
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
						<Grid container alignItems={'center'} gap={1} pt={1}>
							<Grid xs={12} md={1} pl={1}>
								<Avatar
									alt={proprietario?.nomeEstabelecimento}
									src={proprietario?.urlIcone}
									sx={{ width: 70, height: 70 }}
								/>
							</Grid>

							<Grid xs={12} md>
								<Grid container direction={'column'} pl={1}>
									<Typography variant="h6" fontWeight={700}>
										{proprietario?.nomeEstabelecimento}
									</Typography>
									<Typography
										variant="subtitle2"
										fontWeight={700}
										color={'rgb(0 0 0 / 41%)'}
									>
										{`${proprietario?.logradouro}, ${proprietario?.endereco.bairro}, ${proprietario?.endereco.cidade} - ${proprietario?.endereco.estado}`}
									</Typography>
									<Typography
										variant="subtitle2"
										fontWeight={700}
										color={'rgb(0 0 0 / 41%)'}
									>
										{proprietario?.telefone}
									</Typography>

									<Box position={'absolute'} top={8} right={8}>
										<Button
											variant="contained"
											color="secondary"
											sx={{
												width: 103,
											}}
											onClick={handleSeguir}
										>
											{favoritos?.length === 0 ? 'Seguir' : 'Seguindo'}
										</Button>
									</Box>
								</Grid>
							</Grid>
						</Grid>

						<Grid container justifyContent={'end'} mr={1}>
							<Rating
								precision={0.5}
								size="large"
								value={proprietario?.avaliacaoMedia || null}
								readOnly
							/>
						</Grid>

						<ImagemProprietario
							proprietario={proprietario}
							showEditButton={false}
							showAvatarButton={false}
							sx={{ borderRadius: 0 }}
						/>

						<Box p={2}>
							<Typography
								variant="subtitle2"
								fontWeight={700}
								color={'rgb(0 0 0 / 41%)'}
							>
								Acessibilidades
							</Typography>

							{proprietario?.deficiencias.map(({ deficiencia, confirmada }) => (
								<DisabilityIcon
									key={deficiencia.id}
									type={deficiencia.tipoDeDeficiencia}
									elabled={confirmada}
								/>
							))}

							<Typography variant="h6" fontWeight={700}>
								Descrição
							</Typography>

							<Typography variant="subtitle2">
								{proprietario?.descricao}
							</Typography>
						</Box>
					</Paper>

					<Box mt={2} />

					<Paper
						variant="outlined"
						sx={{
							borderRadius: '15px',
							border: 0,
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							gap: 3,
						}}
					>
						{proprietario?.comentarios.length === 0 ? (
							<Typography variant="h6">Nenhum comentário</Typography>
						) : (
							proprietario?.comentarios.map(comentario => (
								<Comentario key={comentario.id} comentario={comentario} />
							))
						)}
					</Paper>

					<Box mb={2} />
				</Container>
			)}
		</>
	);
}
