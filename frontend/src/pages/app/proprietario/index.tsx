import {
	Avatar,
	Box,
	Button,
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
import AuditivaSvg from '../../../../public/disabilities/auditiva.svg';
import AutismoSvg from '../../../../public/disabilities/autismo.svg';
import FisicaSvg from '../../../../public/disabilities/fisica.svg';
import Idoso80Svg from '../../../../public/disabilities/idoso80.svg';
import IntelectualSvg from '../../../../public/disabilities/intelectual.svg';
import VisualSvg from '../../../../public/disabilities/visual.svg';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

const items = [
	{
		url: '/companies/1/1.png',
	},
	{
		url: '/companies/1/2.png',
	},
	{
		url: '/companies/1/3.png',
	},
	{
		url: '/companies/1/4.png',
	},
];

interface Item {
	item: {
		url: string;
	};
}

function Item(props: Item) {
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
			<Image src={props.item.url} alt="logo" fill priority />
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

export default function Index() {
	return (
		<>
			<Head>
				<title>Proprietário</title>
			</Head>
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
						{items.map((item, i) => (
							<Item key={i} item={item} />
						))}
					</Carousel>

					<Grid
						container
						direction={'column'}
						justifyContent={'center'}
						alignContent={'center'}
					>
						<Typography variant="h6" fontWeight={700} textAlign={'center'}>
							Fazenda Harmonia
						</Typography>

						<Typography
							variant="subtitle2"
							fontWeight={700}
							color={'rgb(0 0 0 / 41%)'}
							textAlign={'center'}
						>
							Estrada da Paz S/N, Zona Rural, Nova Esperança - SP, CEP:
							12345-678.
						</Typography>

						<Typography
							variant="subtitle2"
							fontWeight={700}
							color={'rgb(0 0 0 / 41%)'}
							textAlign={'center'}
						>
							(11) 1234-5678
						</Typography>
					</Grid>

					<Box p={4} position={'relative'}>
						<Typography variant="h6" fontWeight={700}>
							Acessibilidades
						</Typography>

						<FisicaSvg width={40} height={40} />

						<VisualSvg width={40} height={40} />

						<AuditivaSvg width={40} height={40} />

						<Idoso80Svg width={40} height={40} />

						<IntelectualSvg width={40} height={40} />

						<AutismoSvg width={40} height={40} />

						<Box mt={2} />

						<Typography variant="h6" fontWeight={700}>
							Descrição
						</Typography>

						<Typography variant="subtitle2">
							A Fazenda Harmonia é um lugar onde pessoas com e sem deficiência
							podem desfrutar de um ambiente rural acolhedor e inclusivo. Com
							infraestrutura adaptada e equipe especializada, a fazenda oferece
							atividades e experiências diversas, como passeios a cavalo,
							trilhas, jardinagem e artesanato. O objetivo é promover a
							integração e a igualdade de oportunidades entre todos os
							visitantes, em um ambiente tranquilo e cheio de harmonia.
						</Typography>

						<Box position={'absolute'} bottom={4} right={4}>
							<IconButton
								sx={{ color: 'black' }}
								onClick={() => console.log('Editar proprietário')}
							>
								<EditIcon sx={{ fontSize: 48 }} />
							</IconButton>
						</Box>
					</Box>
				</Paper>
			</Container>
		</>
	);
}
