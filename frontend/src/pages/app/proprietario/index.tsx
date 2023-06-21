import {
	Alert,
	Avatar,
	Backdrop,
	Box,
	Button,
	CircularProgress,
	ClickAwayListener,
	Container,
	IconButton,
	Paper,
	Tooltip,
	Typography,
} from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import Grid from '@mui/material/Unstable_Grid2';
import EditIcon from '@mui/icons-material/Edit';
import { Fragment, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import api from '@/services/api';
import DisabilityIcon from '@/components/disability';

interface ItemProps {
	item: ImagemProprietarioUserApiType;
}

function Item({ item }: ItemProps) {
	const [openTooltipEdit, setOpenTooltipEdit] = useState(false);
	const [openTooltipAvatar, setOpenTooltipAvatar] = useState(false);

	const handleTooltipEditClose = () => {
		setOpenTooltipEdit(false);
	};

	const handleTooltipEditOpen = () => {
		setOpenTooltipEdit(true);
	};

	const handleTooltipAvatarClose = () => {
		setOpenTooltipAvatar(false);
	};

	const handleTooltipAvatarOpen = () => {
		setOpenTooltipAvatar(true);
	};

	return (
		<Box position={'relative'} height={300}>
			<Box position={'absolute'} top={15} left={15}>
				<ClickAwayListener onClickAway={handleTooltipAvatarClose}>
					<div>
						<Tooltip
							PopperProps={{
								disablePortal: true,
							}}
							onClose={handleTooltipAvatarClose}
							open={openTooltipAvatar}
							disableFocusListener
							disableHoverListener
							disableTouchListener
							title="Função não implementada"
							placement="right"
						>
							<IconButton onClick={handleTooltipAvatarOpen}>
								<Avatar
									alt="Pão e Prosa"
									src="/companies/1/1.png"
									sx={{
										width: 80,
										height: 80,
										zIndex: 5,
										border: 2,
									}}
								/>
							</IconButton>
						</Tooltip>
					</div>
				</ClickAwayListener>
			</Box>
			<Image src={item.url} alt="logo" fill priority />
			<Box position={'absolute'} bottom={4} right={4}>
				<ClickAwayListener onClickAway={handleTooltipEditClose}>
					<div>
						<Tooltip
							PopperProps={{
								disablePortal: true,
							}}
							onClose={handleTooltipEditClose}
							open={openTooltipEdit}
							disableFocusListener
							disableHoverListener
							disableTouchListener
							title="Função não implementada"
							placement="left"
						>
							<IconButton
								onClick={handleTooltipEditOpen}
								sx={{
									':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
									color: '#fff',
								}}
							>
								<EditIcon sx={{ fontSize: 48 }} />
							</IconButton>
						</Tooltip>
					</div>
				</ClickAwayListener>
			</Box>
		</Box>
	);
}

const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function Index() {
	const router = useRouter();
	const { data: session } = useSession();

	const {
		data: proprietario,
		error,
		isLoading,
	} = useSWR<ProprietarioUserApiType>(
		session ? `/api/proprietarios/${session?.user.id}` : null,
		fetcher,
	);

	if (!isLoading && error)
		return (
			<Container component="main" maxWidth="sm">
				<Box m={2}>
					<Alert severity="error" sx={{ textAlign: 'center' }}>
						Erro ao tentar recuperar informações do proprietário.
						<Button href={router.asPath}>Tente novamente</Button>
					</Alert>
				</Box>
			</Container>
		);

	return (
		<>
			<Head>
				<title>Proprietário</title>
			</Head>

			{isLoading && (
				<Backdrop
					sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
					open
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}

			{!isLoading && session && (
				<Container component="main" maxWidth="md">
					<Box mt={2} />

					<Grid container justifyContent={'center'} mb={1}>
						<Button
							variant="contained"
							color="secondary"
							sx={{
								width: 250,
							}}
						>
							Visualizar estabelecimento
						</Button>
					</Grid>

					<Paper
						variant="outlined"
						sx={{
							borderRadius: '15px',
							border: 0,
							position: 'relative',
						}}
					>
						<Carousel
							navButtonsAlwaysVisible
							fullHeightHover={false}
							sx={{ borderRadius: 3.75 }}
						>
							{proprietario?.imagens.map(imagem => (
								<Item key={imagem.id} item={imagem} />
							))}
						</Carousel>

						<Grid
							container
							direction={'column'}
							justifyContent={'center'}
							alignContent={'center'}
						>
							<Typography variant="h6" fontWeight={700} textAlign={'center'}>
								{proprietario?.nomeEstabelecimento}
							</Typography>

							<Typography
								variant="subtitle2"
								fontWeight={700}
								color={'rgb(0 0 0 / 41%)'}
								textAlign={'center'}
							>
								{`${proprietario?.logradouro}, ${proprietario?.endereco.bairro}, ${proprietario?.endereco.cidade} - ${proprietario?.endereco.estado}`}
							</Typography>

							<Typography
								variant="subtitle2"
								fontWeight={700}
								color={'rgb(0 0 0 / 41%)'}
								textAlign={'center'}
							>
								{proprietario?.telefone}
							</Typography>
						</Grid>

						<Box p={4} position={'relative'}>
							<Typography variant="h6" fontWeight={700}>
								Acessibilidades
							</Typography>

							<Grid>
								{proprietario?.deficiencias.map(deficiencia => (
									<Fragment key={deficiencia.id}>
										<DisabilityIcon type={deficiencia.tipoDeDeficiencia} />
									</Fragment>
								))}
							</Grid>

							<Box mt={2} />

							<Typography variant="h6" fontWeight={700}>
								Descrição
							</Typography>

							<Typography variant="subtitle2">
								{proprietario?.descricao}
							</Typography>

							<Box position={'absolute'} bottom={4} right={4}>
								<IconButton
									sx={{ color: 'black' }}
									onClick={() =>
										router.push(`/app/proprietario/edit/${session?.user.id}`)
									}
								>
									<EditIcon sx={{ fontSize: 48 }} />
								</IconButton>
							</Box>
						</Box>
					</Paper>
				</Container>
			)}
		</>
	);
}
