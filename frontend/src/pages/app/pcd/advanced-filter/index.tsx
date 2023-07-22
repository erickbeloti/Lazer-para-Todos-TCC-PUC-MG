import {
	Autocomplete,
	Avatar,
	Box,
	Button,
	Chip,
	Container,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Rating,
	TextField,
} from '@mui/material';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';
import api from '@/lib/api';

interface FormData {
	state: StateApiType | null;
	city: CityApiType | null;
	district: DistrictApiType | null;
	rating: number | null;
	disabilitiesTypes: DisabilityApiType[];
}

const fetcher = ({ url, params }: { url: string; params: unknown }) =>
	api.get(url, { params }).then(res => res.data);

export default function AdvancedFilter() {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
		setValue,
	} = useForm<FormData>({
		defaultValues: {
			state: null,
			city: null,
			district: null,
			rating: null,
			disabilitiesTypes: [],
		},
	});

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

	const state = useWatch({ control, name: 'state' });
	const city = useWatch({ control, name: 'city' });

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

	const onSubmit: SubmitHandler<FormData> = data => console.log(data);

	return (
		<>
			<Head>
				<title>Filtro Avançado PcD</title>
			</Head>
			<Container component="main" maxWidth="md">
				<Box mt={2} />
				<Paper
					variant="outlined"
					sx={{
						borderRadius: '15px',
						border: 0,
						padding: 5,
					}}
				>
					<form onSubmit={handleSubmit(onSubmit)} noValidate>
						<Grid container direction={'column'} rowSpacing={2}>
							<Grid container>
								<Grid xs={6} md={3}>
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
													!isLoadingStates && !errorStates && states
														? states
														: []
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
														label="Estado"
														variant="filled"
													/>
												)}
											/>
										)}
									/>
								</Grid>

								<Grid xs={6} md>
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
													!isLoadingCities && !errorCities && cities
														? cities
														: []
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
														label="Cidade"
														variant="filled"
													/>
												)}
												disabled={!state}
											/>
										)}
									/>
								</Grid>
							</Grid>

							<Grid container justifyContent={'center'} alignItems={'center'}>
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
													value === null ||
													option.enderecoId === value.enderecoId
												}
												renderInput={params => (
													<TextField
														{...params}
														inputProps={{
															...params.inputProps,
															autoComplete: 'new-password',
														}}
														label="Bairro"
														variant="filled"
													/>
												)}
												disabled={!city}
											/>
										)}
									/>
								</Grid>

								<Grid
									display={'flex'}
									justifyContent={{ xs: 'center', md: 'end' }}
									alignSelf={{ xs: 'center', md: 'end' }}
									xs={12}
									md={3}
								>
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
							</Grid>

							<Grid container>
								<Grid xs={12} md>
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
													option.tipoDeDeficiencia
														? option.tipoDeDeficiencia
														: ''
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
														label="Tipo de Deficiência"
														variant="filled"
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

								<Grid
									display={'flex'}
									justifyContent={'end'}
									alignSelf={'end'}
									xs={12}
									md={3}
								>
									<Button
										variant="contained"
										color="secondary"
										sx={{
											width: 134,
										}}
										type="submit"
										disabled={isSubmitting}
									>
										Filtrar
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</form>
				</Paper>

				<Box mt={2} />
				<Paper
					variant="outlined"
					sx={{
						borderRadius: '15px',
						border: 0,
						padding: 5,
					}}
				>
					<List sx={{ display: 'flex', flexDirection: 'column' }}>
						<Link
							href="/app/estabelecimento/1"
							passHref
							style={{ textDecoration: 'none' }}
						>
							<ListItem sx={{ backgroundColor: '#6B3B82', borderRadius: 15 }}>
								<ListItemAvatar>
									<Avatar
										alt="Pão e Prosa"
										src="/companies/1/1.png"
										sx={{ width: 50, height: 50 }}
									/>
								</ListItemAvatar>
								<ListItemText
									primary="Pão e Prosa"
									primaryTypographyProps={{ fontWeight: 700 }}
									sx={{ color: '#fff' }}
								/>
							</ListItem>
						</Link>

						<Box component="li" m={1} />

						<ListItem sx={{ backgroundColor: '#6B3B82', borderRadius: 15 }}>
							<ListItemAvatar>
								<Avatar
									alt="Sabores do Interior"
									src="/companies/2.png"
									sx={{ width: 50, height: 50 }}
								/>
							</ListItemAvatar>
							<ListItemText
								primary="Sabores do Interior"
								primaryTypographyProps={{ fontWeight: 700 }}
								sx={{ color: '#fff' }}
							/>
						</ListItem>

						<Box component="li" m={1} />

						<ListItem sx={{ backgroundColor: '#6B3B82', borderRadius: 15 }}>
							<ListItemAvatar>
								<Avatar
									alt="Parque dos Ipês"
									src="/companies/3.png"
									sx={{ width: 50, height: 50 }}
								/>
							</ListItemAvatar>
							<ListItemText
								primary="Parque dos Ipês"
								primaryTypographyProps={{ fontWeight: 700 }}
								sx={{ color: '#fff' }}
							/>
						</ListItem>

						<Box component="li" m={1} />

						<ListItem sx={{ backgroundColor: '#6B3B82', borderRadius: 15 }}>
							<ListItemAvatar>
								<Avatar
									alt="Rancho do Vô João"
									src="/companies/4.png"
									sx={{ width: 50, height: 50 }}
								/>
							</ListItemAvatar>
							<ListItemText
								primary="Rancho do Vô João"
								primaryTypographyProps={{ fontWeight: 700 }}
								sx={{ color: '#fff' }}
							/>
						</ListItem>

						<Box component="li" m={1} />

						<ListItem sx={{ backgroundColor: '#6B3B82', borderRadius: 15 }}>
							<ListItemAvatar>
								<Avatar
									alt="Parque Aquático Splash"
									src="/companies/5.png"
									sx={{ width: 50, height: 50 }}
								/>
							</ListItemAvatar>
							<ListItemText
								primary="Parque Aquático Splash"
								primaryTypographyProps={{ fontWeight: 700 }}
								sx={{ color: '#fff' }}
							/>
						</ListItem>

						<Box component="li" m={1} />

						<ListItem sx={{ backgroundColor: '#6B3B82', borderRadius: 15 }}>
							<ListItemAvatar>
								<Avatar
									alt="Fazenda do Vale"
									src="/companies/6.png"
									sx={{ width: 50, height: 50 }}
								/>
							</ListItemAvatar>
							<ListItemText
								primary="Fazenda do Vale"
								primaryTypographyProps={{ fontWeight: 700 }}
								sx={{ color: '#fff' }}
							/>
						</ListItem>
					</List>
				</Paper>
			</Container>
		</>
	);
}
