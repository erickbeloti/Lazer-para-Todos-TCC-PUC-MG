import {
	Autocomplete,
	Avatar,
	Box,
	Button,
	Chip,
	Container,
	TextField,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useForm, Controller, SubmitHandler, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import useSWR from 'swr';
import api from '@/services/api';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { useSession } from 'next-auth/react';

interface FormData {
	name: string;
	email: string;
	password: string;
	state: StateApiType | null;
	city: CityApiType | null;
	district: DistrictApiType | null;
	disabilitiesTypes: DisabilityApiType[];
}

interface AddEditPcDProps {
	title: string;
	user?: PcDUserApiType;
}

const schema = yup
	.object({
		name: yup.string().required('Nome obrigatório'),
		email: yup
			.string()
			.email('Deve ser um email válido')
			.required('Email obrigatório'),
		password: yup
			.string()
			.min(8, 'É necessário no mínimo 8 caracteres')
			.required('Senha obrigatório'),
		state: yup
			.object({ estado: yup.string().required('Estado obrigatório') })
			.required('Estado obrigatório'),
		city: yup
			.object({ cidade: yup.string().required('Cidade obrigatório') })
			.required('Cidade obrigatório'),
		district: yup
			.object({ bairro: yup.string().required('Bairro obrigatório') })
			.required('Bairro obrigatório'),
		disabilitiesTypes: yup
			.array()
			.min(1, 'É necessário escolher ao menos uma opção'),
	})
	.required();

const fetcher = ({ url, params }: { url: string; params: unknown }) =>
	api.get(url, { params }).then(res => res.data);

export default function AddEditPcD({ user, title }: AddEditPcDProps) {
	const router = useRouter();
	const { update } = useSession();
	const isAddMode = !user;
	const { enqueueSnackbar } = useSnackbar();
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
		setValue,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			name: user?.nome || '',
			email: user?.email || '',
			password: isAddMode ? '' : '********',
			state: user ? { estado: user?.endereco?.estado } : null,
			city: user ? { cidade: user?.endereco.cidade } : null,
			district: user
				? {
						enderecoId: user?.endereco.id,
						bairro: user?.endereco.bairro,
				  }
				: null,
			disabilitiesTypes: user?.deficiencias,
		},
	});
	const state = useWatch({ control, name: 'state' });
	const city = useWatch({ control, name: 'city' });

	const {
		data: states,
		error: errorStates,
		isLoading: isLoadingStates,
	} = useSWR({ url: '/api/enderecos/estados' }, fetcher);

	const {
		data: cities,
		error: errorCities,
		isLoading: isLoadingCities,
	} = useSWR(
		() =>
			state
				? {
						url: '/api/enderecos/cidades',
						params: { estado: state?.estado },
				  }
				: null,
		fetcher,
	);

	const {
		data: districts,
		error: errorDistricts,
		isLoading: isLoadingDistricts,
	} = useSWR(
		() =>
			state && city
				? {
						url: '/api/enderecos/bairros',
						params: { estado: state?.estado, cidade: city?.cidade },
				  }
				: null,
		fetcher,
	);

	const {
		data: disabilitiesTypes,
		error: errorDisabilitiesTypes,
		isLoading: isLoadingDisabilitiesTypes,
	} = useSWR(
		{
			url: '/api/deficiencias',
		},
		fetcher,
	);

	const onSubmit: SubmitHandler<FormData> = async data => {
		isAddMode ? createPcD(data) : updatePcD(data);
	};

	const createPcD = async (data: FormData) => {
		try {
			await api.post('/api/pcds', {
				nome: data.name,
				email: data.email,
				senha: data.password,
				enderecoId: data.district?.enderecoId,
				deficienciasIds: data.disabilitiesTypes.map(
					disabilityType => disabilityType.id,
				),
			});

			router.replace('/signin');

			enqueueSnackbar('Usuário PcD cadastrado com sucesso', {
				variant: 'success',
			});

			enqueueSnackbar('Preencha as credenciais e clique em Entrar', {
				variant: 'success',
			});
		} catch (error) {
			enqueueSnackbar('Erro ao tentar cadastrar usuário PcD', {
				variant: 'error',
			});
		}
	};

	const updatePcD = async (data: FormData) => {
		try {
			await api.put(`/api/pcds/${user?.id}`, {
				nome: data.name,
				enderecoId: data.district?.enderecoId,
				deficienciasIds: data.disabilitiesTypes.map(
					disabilityType => disabilityType.id,
				),
			});

			mutate(`/api/pcds/${user?.id}`);

			update();

			router.replace('/app');

			enqueueSnackbar('Usuário PcD atualizado com sucesso', {
				variant: 'success',
			});
		} catch (error) {
			enqueueSnackbar('Erro ao tentar atualizar usuário PcD', {
				variant: 'error',
			});
		}
	};

	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			enqueueSnackbar('Há campos inválidos, verifique e tente novamente', {
				variant: 'error',
			});
		}
	}, [errors, enqueueSnackbar]);

	return (
		<Container component="main" maxWidth="sm">
			<Box mt={2} />
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<Grid container direction={'column'} rowSpacing={2}>
					<Grid xs>
						<Typography
							variant="h4"
							sx={{ textAlign: 'center', fontWeight: 'bold' }}
						>
							PcD
						</Typography>
					</Grid>

					<Grid xs>
						<Controller
							name="name"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									required
									fullWidth
									label="Nome"
									variant="filled"
									error={!!errors.name}
									helperText={errors.name?.message}
								/>
							)}
						/>
					</Grid>

					<Grid container columnSpacing={2}>
						<Grid xs>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										required
										fullWidth
										label="Email"
										variant="filled"
										type="email"
										inputProps={{ autoComplete: 'username' }}
										error={!!errors.email}
										helperText={errors.email?.message}
										disabled={!isAddMode}
									/>
								)}
							/>
						</Grid>
						<Grid xs>
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										required
										label="Senha"
										variant="filled"
										type="password"
										inputProps={{ autoComplete: 'new-password' }}
										error={!!errors.password}
										helperText={errors.password?.message}
										disabled={!isAddMode}
									/>
								)}
							/>
						</Grid>
					</Grid>

					<Grid container columnSpacing={2}>
						<Grid xs={4} md={3}>
							<Controller
								name="state"
								control={control}
								render={({ field: { onChange, value } }) => (
									<Autocomplete
										onChange={async (event, item) => {
											onChange(item);
											setValue('city', null);
											setValue('district', null);
										}}
										value={value}
										options={
											!isLoadingStates && !errorStates && states ? states : []
										}
										autoHighlight
										getOptionLabel={option =>
											option.estado ? option.estado : ''
										}
										isOptionEqualToValue={(option, value) =>
											value === null || option.estado === value.estado
										}
										renderInput={params => (
											<TextField
												{...params}
												inputProps={{
													...params.inputProps,
													autoComplete: 'new-password',
												}}
												required
												label="Estado"
												variant="filled"
												error={!!errors.state}
												helperText={errors.state?.message}
											/>
										)}
									/>
								)}
							/>
						</Grid>

						<Grid xs={8} md>
							<Controller
								name="city"
								control={control}
								render={({ field: { onChange, value } }) => (
									<Autocomplete
										onChange={(event, item) => {
											onChange(item);
											setValue('district', null);
										}}
										value={value}
										options={
											!isLoadingCities && !errorCities && cities ? cities : []
										}
										autoHighlight
										getOptionLabel={option =>
											option.cidade ? option.cidade : ''
										}
										isOptionEqualToValue={(option, value) =>
											value === null || option.cidade === value.cidade
										}
										renderInput={params => (
											<TextField
												{...params}
												inputProps={{
													...params.inputProps,
													autoComplete: 'new-password',
												}}
												required
												label="Cidade"
												variant="filled"
												error={!!errors.city}
												helperText={errors.city?.message}
											/>
										)}
										disabled={!state}
									/>
								)}
							/>
						</Grid>

						<Grid xs={12} md>
							<Controller
								name="district"
								control={control}
								render={({ field: { onChange, value } }) => (
									<Autocomplete
										onChange={(event, item) => {
											onChange(item);
										}}
										value={value}
										options={
											!isLoadingDistricts && !errorDistricts && districts
												? districts
												: []
										}
										autoHighlight
										getOptionLabel={option =>
											option.bairro ? option.bairro : ''
										}
										isOptionEqualToValue={(option, value) =>
											value === null || option.enderecoId === value.enderecoId
										}
										renderInput={params => (
											<TextField
												{...params}
												inputProps={{
													...params.inputProps,
													autoComplete: 'new-password',
												}}
												required
												label="Bairro"
												variant="filled"
												error={!!errors.district}
												helperText={errors.district?.message}
											/>
										)}
										disabled={!city}
									/>
								)}
							/>
						</Grid>
					</Grid>

					<Grid>
						<Controller
							name="disabilitiesTypes"
							control={control}
							render={({ field: { onChange, value } }) => (
								<Autocomplete
									multiple
									onChange={(event, item) => {
										onChange(item);
									}}
									value={value}
									options={
										!isLoadingDisabilitiesTypes &&
										!errorDisabilitiesTypes &&
										disabilitiesTypes
											? disabilitiesTypes
											: []
									}
									autoHighlight
									getOptionLabel={option =>
										option.tipoDeDeficiencia ? option.tipoDeDeficiencia : ''
									}
									isOptionEqualToValue={(option, value) =>
										value === null || option.id === value.id
									}
									renderInput={params => (
										<TextField
											{...params}
											inputProps={{
												...params.inputProps,
												autoComplete: 'new-password',
											}}
											required
											label="Tipo de Deficiência"
											variant="filled"
											error={!!errors.disabilitiesTypes}
											helperText={errors.disabilitiesTypes?.message}
										/>
									)}
									renderTags={(value, getTagProps) =>
										value.map((option, index) => (
											<Chip
												{...getTagProps({ index })}
												key={option.id}
												avatar={<Avatar src={option.urlIcone} />}
												label={option.tipoDeDeficiencia}
											/>
										))
									}
								/>
							)}
						/>
					</Grid>
				</Grid>

				<Grid container justifyContent={'center'} alignItems={'center'}>
					<Button
						variant="contained"
						sx={{
							marginTop: 4,
							width: 128,
							alignSelf: 'center',
						}}
						type="submit"
						disabled={isSubmitting}
					>
						{title}
					</Button>
				</Grid>
			</form>
		</Container>
	);
}
