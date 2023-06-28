import {
	Avatar,
	Box,
	ClickAwayListener,
	IconButton,
	SxProps,
	Tooltip,
} from '@mui/material';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';

interface ItemProps {
	imagem: ImagemProprietarioUserApiType;
	nome: string;
	urlIcone: string;
	showEditButton?: boolean;
	showAvatarButton?: boolean;
}

export function ImageItem({
	imagem,
	nome,
	urlIcone,
	showEditButton = true,
	showAvatarButton = true,
}: ItemProps) {
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
			{showAvatarButton && (
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
										alt={nome}
										src={urlIcone}
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
			)}
			<Image src={imagem.url} alt="logo" fill sizes="100vw" />
			{showEditButton && (
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
			)}
		</Box>
	);
}

interface ImagemProprietarioProps {
	proprietario?: ProprietarioUserApiType;
	showEditButton?: boolean;
	showAvatarButton?: boolean;
	sx?: SxProps;
}

export default function ImagemProprietario({
	proprietario,
	showEditButton,
	showAvatarButton,
	sx = { borderRadius: 3.75 },
}: ImagemProprietarioProps) {
	return (
		<Carousel navButtonsAlwaysVisible fullHeightHover={false} sx={sx}>
			{proprietario?.imagens.length === 0 ? (
				<ImageItem
					key={proprietario.id}
					imagem={{ id: proprietario.id, url: '/no-image-icon.svg' }}
					nome={proprietario.nomeEstabelecimento}
					urlIcone={proprietario.urlIcone}
					showEditButton={showEditButton}
					showAvatarButton={showAvatarButton}
				/>
			) : (
				proprietario?.imagens.map(imagem => (
					<ImageItem
						key={imagem.id}
						imagem={imagem}
						nome={proprietario.nomeEstabelecimento}
						urlIcone={proprietario.urlIcone}
						showEditButton={showEditButton}
						showAvatarButton={showAvatarButton}
					/>
				))
			)}
		</Carousel>
	);
}
