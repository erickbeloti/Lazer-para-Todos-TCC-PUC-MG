import { cities, disabilitiesTypes, districts, states } from '@/utils/utils';
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
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Grid from '@mui/material/Unstable_Grid2';

interface FormData {
	state: StateType | null;
	city: CityType | null;
	district: DistrictType | null;
	rating: number | null;
	disabilitiesTypes: DisabilityType[];
}

export default function AdvancedFilter() {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm<FormData>({
		defaultValues: {
			state: null,
			city: null,
			district: null,
			rating: null,
			disabilitiesTypes: [],
		},
	});

	const onSubmit: SubmitHandler<FormData> = data => console.log(data);

	return (
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
													label="Cidade"
													variant="filled"
												/>
											)}
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
													label="Bairro"
													variant="filled"
												/>
											)}
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
										console.log(field);
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
													label="Tipo de Deficiência"
													variant="filled"
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
					<ListItem sx={{ backgroundColor: '#6B3B82', borderRadius: 15 }}>
						<ListItemAvatar>
							<Avatar
								alt="Pão e Prosa"
								src="/companies/1.png"
								sx={{ width: 50, height: 50 }}
							/>
						</ListItemAvatar>
						<ListItemText
							primary="Pão e Prosa"
							primaryTypographyProps={{ fontWeight: 700 }}
							sx={{ color: '#fff' }}
						/>
					</ListItem>

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
	);
}
