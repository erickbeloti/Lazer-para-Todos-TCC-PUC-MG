import {
	Autocomplete,
	Button,
	Container,
	TextField,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface StateType {
	code: string;
	label: string;
}

interface CityType {
	code: number;
	label: string;
}

interface DistrictType {
	code: number;
	label: string;
}

const schema = yup
	.object({
		name: yup.string().required('Nome obrigatório'),
		email: yup.string().email().required('Email obrigatório'),
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
	})
	.required();

export default function SignUpPcD() {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			state: null,
			city: null,
			district: null,
		},
	});

	const onSubmit = data => console.log(data);

	return (
		<Container component="main" maxWidth="sm">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container direction={'column'}>
					<Grid xs>
						<Typography
							variant="h4"
							sx={{ textAlign: 'center', fontWeight: 'bold' }}
						>
							PcD
						</Typography>
					</Grid>

					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Nome"
								variant="outlined"
								error={!!errors.name}
								helperText={errors.name?.message}
							/>
						)}
					/>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Email"
								variant="outlined"
								type="email"
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
								label="Senha"
								variant="outlined"
								type="password"
								error={!!errors.password}
								helperText={errors.password?.message}
							/>
						)}
					/>

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
								getOptionLabel={option => (option.label ? option.label : '')}
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
										label="Estado"
										variant="outlined"
										error={!!errors.state}
										helperText={errors.state?.message}
									/>
								)}
							/>
						)}
					/>

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
								getOptionLabel={option => (option.label ? option.label : '')}
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
										label="Cidade"
										variant="outlined"
										error={!!errors.state}
										helperText={errors.state?.message}
									/>
								)}
							/>
						)}
					/>

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
								getOptionLabel={option => (option.label ? option.label : '')}
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
										label="Bairro"
										variant="outlined"
										error={!!errors.state}
										helperText={errors.state?.message}
									/>
								)}
							/>
						)}
					/>

					{/* <Autocomplete
						id="state"
						options={countries}
						autoHighlight
						getOptionLabel={option => option.label}
						renderInput={params => (
							<Controller
								name="state"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										{...params}
										inputProps={{
											...params.inputProps,
											autoComplete: 'new-password',
										}}
										label="Estado"
										variant="standard"
										error={!!errors.state}
										helperText={errors.state?.message}
									/>
								)}
							/>
						)}
					/> */}
				</Grid>

				<Button
					variant="contained"
					sx={{
						marginTop: 2.5,
						width: 128,
						alignSelf: 'center',
					}}
					type="submit"
				>
					Cadastrar
				</Button>
			</form>
		</Container>
	);
}

const states: readonly StateType[] = [
	{ code: 'SP', label: 'SP' },
	{
		code: 'MG',
		label: 'MG',
	},
	{ code: 'RJ', label: 'RJ' },
];

const cities: readonly CityType[] = [
	{ code: 1, label: 'São Paulo' },
	{
		code: 2,
		label: 'Belo Horizonte',
	},
	{ code: 3, label: 'Rio de Janeiro' },
];

const districts: readonly DistrictType[] = [
	{ code: 1, label: 'Jardim Primavera' },
	{
		code: 2,
		label: 'Zona Rural',
	},
	{ code: 3, label: 'Rio de Janeiro' },
];
