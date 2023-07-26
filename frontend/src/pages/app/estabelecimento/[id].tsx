import {
	Alert,
	Avatar,
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Container,
	IconButton,
	Paper,
	Rating,
	TextField,
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
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormData {
	commentary: string;
	rating: number | null;
	disabilitiesTypes: DisabilityApiType[];
}

const schema = yup
	.object({
		commentary: yup.string().required('Comentário obrigatório'),
	})
	.required();

export default function Estabelecimento() {
	const { enqueueSnackbar } = useSnackbar();
	const { data: session } = useSession();
	const readOnly = session?.user.userRole !== 'PCD';
	const { query, asPath } = useRouter();
	const { id: proprietarioId } = query;
	const { apiAuth, isLoadingApi } = useApiAuth();
	const fetcher = (url: string) => apiAuth.get(url).then(res => res.data);
	const [isOpenPanelCommentary, setOpenPanelCommentary] = useState(false);
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			commentary: '',
			rating: null,
			disabilitiesTypes: [],
		},
	});

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
		proprietarioId && !isLoadingApi && !readOnly
			? `/api/pcds/${session?.user.id}/favoritos/${proprietarioId}`
			: null,
		fetcher,
	);

	const { data: disabilitiesTypes = [] } = useSWR<DisabilityApiType[]>(
		'/api/deficiencias',
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

	const handleCancelar = () => {
		setOpenPanelCommentary(!isOpenPanelCommentary);
		reset({ commentary: '', rating: null, disabilitiesTypes: [] });
	};

	const handleComentar = () => {
		setOpenPanelCommentary(!isOpenPanelCommentary);
		reset({ commentary: '', rating: null, disabilitiesTypes: [] });
	};

	const onSubmit: SubmitHandler<FormData> = async data => {
		try {
			await apiAuth.post(`/api/comentarios`, {
				comentario: data.commentary,
				avaliacao: data.rating,
				deficienciasIds: data.disabilitiesTypes.map(
					disabilityType => disabilityType.id,
				),
				proprietarioId: proprietarioId,
				pcDId: session?.user.id,
			});

			setOpenPanelCommentary(!isOpenPanelCommentary);
			reset({ commentary: '', rating: null, disabilitiesTypes: [] });
			mutate(`/api/proprietarios/${proprietarioId}`);

			enqueueSnackbar('Comentário realizado com sucesso', {
				variant: 'success',
			});
		} catch (error) {
			enqueueSnackbar('Erro ao tentar comentar', {
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

									{!readOnly && (
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
									)}
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
							pt: 4,
							pl: 2,
							pr: 2,
							pb: 2,
							display: 'flex',
							flexDirection: 'column',
							gap: 3,
							position: 'relative',
						}}
					>
						{!isOpenPanelCommentary && !readOnly && (
							<Box position={'absolute'} top={8} right={8}>
								<Button
									variant="contained"
									color="secondary"
									sx={{
										width: 103,
									}}
									onClick={handleComentar}
								>
									Comentar
								</Button>
							</Box>
						)}

						{isOpenPanelCommentary && (
							<Box>
								<Typography variant="h6" fontWeight={700}>
									{session?.user.name}
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
									<form onSubmit={handleSubmit(onSubmit)} noValidate>
										<Grid container justifyContent={'end'} spacing={1}>
											<Grid xs={12} md>
												<Controller
													name="commentary"
													control={control}
													render={({ field }) => (
														<TextField
															{...field}
															required
															fullWidth
															label="Comentário"
															multiline
															minRows={4}
															variant="filled"
															error={!!errors.commentary}
															helperText={errors.commentary?.message}
														/>
													)}
												/>
											</Grid>

											<Grid
												container
												direction={'column'}
												justifyContent={'end'}
												alignItems={'end'}
											>
												<Grid>
													<Controller
														name="rating"
														control={control}
														render={({ field }) => {
															const { onChange } = field;
															return (
																<Rating
																	{...field}
																	onChange={(_event, value) => onChange(value)}
																	value={
																		field.value === null
																			? null
																			: parseFloat(field.value.toString())
																	}
																	precision={0.5}
																	size="large"
																/>
															);
														}}
													/>
												</Grid>

												<Grid container paddingBottom={2}>
													{disabilitiesTypes.map(disabilityType => (
														<Controller
															key={disabilityType.id}
															name="disabilitiesTypes"
															control={control}
															render={({ field: { onChange, value } }) => (
																<IconButton
																	onClick={() => {
																		const findDisability = value.find(
																			def => def.id === disabilityType.id,
																		);
																		if (findDisability) {
																			const newValue = value.filter(
																				def => def.id !== findDisability.id,
																			);
																			onChange(newValue);
																		} else {
																			onChange([...value, ...[disabilityType]]);
																		}
																	}}
																	color="secondary"
																	sx={{ padding: 0 }}
																>
																	<DisabilityIcon
																		type={disabilityType.tipoDeDeficiencia}
																		elabled={
																			value.find(
																				def => def.id === disabilityType.id,
																			)
																				? true
																				: false
																		}
																		size={25}
																	/>
																</IconButton>
															)}
														/>
													))}
												</Grid>

												<Grid container spacing={1}>
													<Grid>
														<Button
															variant="contained"
															color="primary"
															sx={{
																width: 103,
															}}
															onClick={handleCancelar}
														>
															Cancelar
														</Button>
													</Grid>
													<Grid>
														<Button
															variant="contained"
															color="secondary"
															sx={{
																width: 103,
															}}
															type="submit"
															disabled={isSubmitting}
														>
															Comentar
														</Button>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</form>
								</Paper>
							</Box>
						)}

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
