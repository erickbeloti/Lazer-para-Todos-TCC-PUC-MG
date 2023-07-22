import {
	useForm,
	Controller,
	SubmitHandler,
	ControllerRenderProps,
	useWatch,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
import { IMaskInput } from 'react-imask';
import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { mutate } from 'swr';
import api from '@/lib/api';
import useApiAuth from '@/lib/hooks/useApiAuth';

interface FormData {
	companyName: string;
	email: string;
	password: string;
	address: string;
	state: StateApiType | null;
	city: CityApiType | null;
	district: DistrictApiType | null;
	phone: string;
	disabilitiesTypes: DisabilityApiType[];
	description: string;
}

interface AddEditProprietarioProps {
	title: string;
	user?: ProprietarioUserApiType;
}

const schema = yup
	.object({
		companyName: yup.string().required('Nome obrigatório'),
		email: yup
			.string()
			.email('Deve ser um email válido')
			.required('Email obrigatório'),
		password: yup
			.string()
			.min(8, 'É necessário no mínimo 8 caracteres')
			.required('Senha obrigatório'),
		address: yup.string().required('Endereço obrigatório'),
		state: yup
			.object({ estado: yup.string().required('Estado obrigatório') })
			.required('Estado obrigatório'),
		city: yup
			.object({ cidade: yup.string().required('Cidade obrigatório') })
			.required('Cidade obrigatório'),
		district: yup
			.object({ bairro: yup.string().required('Bairro obrigatório') })
			.required('Bairro obrigatório'),
		phone: yup
			.string()
			.matches(/^\(\d{2}\)\s\d{4}-\d{4}$/, {
				message: 'Insira um telefone válido',
				excludeEmptyString: true,
			})
			.required('Telefone obrigatório'),
		disabilitiesTypes: yup
			.array()
			.min(1, 'É necessário escolher ao menos uma opção'),
		description: yup.string().required('Descrição do local obrigatório'),
	})
	.required();

const TextMaskCustom = React.forwardRef<HTMLElement, ControllerRenderProps>(
	function TextMaskCustom(props, ref) {
		const { onChange, ...other } = props;

		return (
			<IMaskInput
				{...other}
				mask="(00) 0000-0000"
				inputRef={ref}
				onChange={onChange}
				onAccept={value => onChange(value)}
				overwrite
			/>
		);
	},
);

const fetcher = ({ url, params }: { url: string; params: unknown }) =>
	api.get(url, { params }).then(res => res.data);

export default function AddEditProprietario({
	user,
	title,
}: AddEditProprietarioProps) {
	const { apiAuth } = useApiAuth();
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
			companyName: user?.nomeEstabelecimento || '',
			email: user?.email || '',
			password: isAddMode ? '' : '********',
			address: user?.logradouro || '',
			state: user ? { estado: user?.endereco?.estado } : null,
			city: user ? { cidade: user?.endereco.cidade } : null,
			district: user
				? {
						enderecoId: user?.endereco.id,
						bairro: user?.endereco.bairro,
				  }
				: null,
			phone: user?.telefone || '',
			disabilitiesTypes: user
				? user?.deficiencias.map(({ deficiencia }) => deficiencia)
				: [],
			description: user?.descricao || '',
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

	const onSubmit: SubmitHandler<FormData> = data => {
		isAddMode ? createProprietario(data) : updateProprietario(data);
	};

	const createProprietario = async (data: FormData) => {
		try {
			await api.post('/api/proprietarios', {
				nomeEstabelecimento: data.companyName,
				email: data.email,
				senha: data.password,
				logradouro: data.address,
				enderecoId: data.district?.enderecoId,
				telefone: data.phone,
				deficienciasIds: data.disabilitiesTypes.map(
					disabilityType => disabilityType.id,
				),
				descricao: data.description,
			});

			router.replace('/signin');

			enqueueSnackbar('Usuário Proprietário cadastrado com sucesso', {
				variant: 'success',
			});

			enqueueSnackbar('Preencha as credenciais e clique em Entrar', {
				variant: 'success',
			});
		} catch (error) {
			enqueueSnackbar('Erro ao tentar cadastrar usuário Proprietário', {
				variant: 'error',
			});
		}
	};

	const updateProprietario = async (data: FormData) => {
		try {
			await apiAuth.put(`/api/proprietarios/${user?.id}`, {
				nomeEstabelecimento: data.companyName,
				logradouro: data.address,
				enderecoId: data.district?.enderecoId,
				telefone: data.phone,
				deficienciasIds: data.disabilitiesTypes.map(
					disabilityType => disabilityType.id,
				),
				descricao: data.description,
			});

			mutate(`/api/proprietarios/${user?.id}`);

			update();

			router.replace('/app');

			enqueueSnackbar('Usuário Proprietário atualizado com sucesso', {
				variant: 'success',
			});
		} catch (error) {
			enqueueSnackbar('Erro ao tentar atualizar usuário Proprietário', {
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
							Proprietário
						</Typography>
					</Grid>

					<Grid xs>
						<Controller
							name="companyName"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									required
									fullWidth
									label="Nome do estabelecimento"
									variant="filled"
									error={!!errors.companyName}
									helperText={errors.companyName?.message}
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

					<Grid xs>
						<Controller
							name="address"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									required
									fullWidth
									label="Endereço"
									variant="filled"
									error={!!errors.address}
									helperText={errors.address?.message}
								/>
							)}
						/>
					</Grid>

					<Grid container columnSpacing={2}>
						<Grid xs={4} md={3}>
							<Controller
								name="state"
								control={control}
								render={({ field: { onChange, value } }) => (
									<Autocomplete
										onChange={(event, item) => {
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

					<Grid xs>
						<Controller
							name="phone"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									required
									fullWidth
									label="Telefone para contato"
									variant="filled"
									error={!!errors.phone}
									helperText={errors.phone?.message}
									InputProps={{
										inputComponent: TextMaskCustom as typeof IMaskInput,
									}}
								/>
							)}
						/>
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
											label="Acessibilidades"
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

					<Grid xs>
						<Controller
							name="description"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									required
									fullWidth
									label="Descrição do local"
									multiline
									minRows={3}
									variant="filled"
									error={!!errors.description}
									helperText={errors.description?.message}
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
