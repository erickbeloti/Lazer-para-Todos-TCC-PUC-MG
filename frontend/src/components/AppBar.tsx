import {
	AppBar,
	Avatar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

export default function MyAppBar() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const showButtonAppBar = router.pathname === '/signin' ? true : false;
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleSignOut = () => {
		handleCloseUserMenu();
		signOut({ callbackUrl: '/signin' });
	};

	return (
		<AppBar position="sticky" sx={{ backgroundColor: '#7465B4' }}>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Link href="/" passHref>
					<Image src="/logo.svg" alt="logo" width="48" height="48" priority />
				</Link>

				{showButtonAppBar && (
					<Link href="/signup" passHref>
						<Button color="primary" variant="contained">
							Cadastre-se
						</Button>
					</Link>
				)}

				{status === 'authenticated' && !showButtonAppBar && (
					<Box sx={{ flexGrow: 0 }}>
						<Box
							display={'flex'}
							flexDirection={'column'}
							justifyContent={'center'}
							alignItems={'center'}
						>
							<Tooltip title="Configurações">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar
										alt={session?.user?.name || 'avatar'}
										sx={{ width: 30, height: 30 }}
									/>
								</IconButton>
							</Tooltip>
							<Typography textAlign="center" sx={{ color: '#fff' }}>
								{session.user?.name}
							</Typography>
						</Box>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem onClick={handleCloseUserMenu}>
								<Typography textAlign="center">Editar Cadastro</Typography>
							</MenuItem>
							<MenuItem onClick={handleSignOut}>
								<Typography textAlign="center">Sair da Aplicação</Typography>
							</MenuItem>
						</Menu>
					</Box>
				)}
			</Toolbar>
		</AppBar>
	);
}
