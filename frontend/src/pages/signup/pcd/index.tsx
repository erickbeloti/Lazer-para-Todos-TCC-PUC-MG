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
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { disabilitiesTypes } from '@/utils/utils';
import { cities } from '@/utils/utils';
import { districts } from '@/utils/utils';
import { states } from '@/utils/utils';
import Head from 'next/head';

interface FormData {
	name: string;
	email: string;
	password: string;
	state: StateType | null;
	city: CityType | null;
	district: DistrictType | null;
	disabilitiesTypes: DisabilityType[];
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
			.object({ code: yup.string().required('Estado obrigatório') })
			.required('Estado obrigatório'),
		city: yup
			.object({ code: yup.string().required('Cidade obrigatório') })
			.required('Cidade obrigatório'),
		district: yup
			.object({ code: yup.string().required('Bairro obrigatório') })
			.required('Bairro obrigatório'),
		disabilitiesTypes: yup
			.array()
			.min(1, 'É necessário escolher ao menos uma opção'),
	})
	.required();

export default function SignUpPcD() {
	const { enqueueSnackbar } = useSnackbar();
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			state: null,
			city: null,
			district: null,
			disabilitiesTypes: [],
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
				<title>Sign Up PcD</title>
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
