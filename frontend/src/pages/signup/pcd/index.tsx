import { Autocomplete, Button, Container, TextField } from '@mui/material';
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
		},
	});

	const onSubmit = data => console.log(data);

	return (
		<Container component="main" maxWidth="xs">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container direction={'column'}>
					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Nome"
								variant="standard"
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
								variant="standard"
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
								variant="standard"
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
								options={countries}
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
										variant="standard"
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
								options={countries}
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
										variant="standard"
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
								options={countries}
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
										variant="standard"
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

const state: readonly StateType[] = [
	{ code: 'SP', label: 'São Paulo' },
	{
		code: 'MG',
		label: 'Minas Gerais',
	},
	{ code: 'RJ', label: 'Rio de Janeiro' },
];

const city: readonly CityType[] = [
	{ code: 1, label: 'São Paulo' },
	{
		code: 2,
		label: 'Belo Horizonte',
	},
	{ code: 3, label: 'Rio de Janeiro' },
];

const district: readonly DistrictType[] = [
	{ code: 'SP', label: 'São Paulo' },
	{
		code: 'MG',
		label: 'Minas Gerais',
	},
	{ code: 'RJ', label: 'Rio de Janeiro' },
];
