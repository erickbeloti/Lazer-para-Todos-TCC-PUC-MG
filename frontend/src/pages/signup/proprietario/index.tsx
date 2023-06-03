import {
	useForm,
	Controller,
	SubmitHandler,
	ControllerRenderProps,
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
import { cities, disabilitiesTypes, districts, states } from '@/utils/utils';
import Head from 'next/head';

interface FormData {
	companyName: string;
	email: string;
	password: string;
	address: string;
	state: StateType | null;
	city: CityType | null;
	district: DistrictType | null;
	phone: string;
	disabilitiesTypes: DisabilityType[];
	description: string;
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
			.object({ code: yup.string().required('Estado obrigatório') })
			.required('Estado obrigatório'),
		city: yup
			.object({ code: yup.string().required('Cidade obrigatório') })
			.required('Cidade obrigatório'),
		district: yup
			.object({ code: yup.string().required('Bairro obrigatório') })
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

export default function SignUpProprietario() {
	const { enqueueSnackbar } = useSnackbar();
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			companyName: '',
			email: '',
			password: '',
			address: '',
			state: null,
			city: null,
			district: null,
			phone: '',
			disabilitiesTypes: [],
			description: '',
		},
	});

	const onSubmit: SubmitHandler<FormData> = data => console.log(data);

	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			enqueueSnackbar('Há campos inválidos, verifique e tente novamente', {
				variant: 'error',
			});
		}
	}, [errors, enqueueSnackbar]);

	return (
		<>
			<Head>
				<title>Sign Up Proprietário</title>
			</Head>
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
											}}
											value={value}
											options={states}
											autoHighlight
											getOptionLabel={option =>
												option.label ? option.label : ''
											}
											isOptionEqualToValue={(option, value) =>
												value === null || option.code === value.code
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
											}}
											value={value}
											options={cities}
											autoHighlight
											getOptionLabel={option =>
												option.label ? option.label : ''
											}
											isOptionEqualToValue={(option, value) =>
												value === null || option.code === value.code
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
											options={districts}
											autoHighlight
											getOptionLabel={option =>
												option.label ? option.label : ''
											}
											isOptionEqualToValue={(option, value) =>
												value === null || option.code === value.code
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
										options={disabilitiesTypes}
										autoHighlight
										getOptionLabel={option =>
											option.label ? option.label : ''
										}
										isOptionEqualToValue={(option, value) =>
											value === null || option.code === value.code
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
													key={option.code}
													avatar={<Avatar src={option.icon} />}
													label={option.label}
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
							Cadastrar
						</Button>
					</Grid>
				</form>
			</Container>
		</>
	);
}
