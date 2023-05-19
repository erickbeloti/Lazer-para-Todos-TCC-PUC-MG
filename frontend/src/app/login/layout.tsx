'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#1AE6EF',
		},
		secondary: {
			main: '#11cb5f',
		},
	},
	typography: {
		button: {
			fontSize: 16,
			fontWeight: 700,
			textTransform: 'none',
		},
	},
});

export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<ThemeProvider theme={theme}>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position="static" sx={{ backgroundColor: '#7465B4' }}>
						<Toolbar sx={{ justifyContent: 'flex-end' }}>
							<Button color="primary" variant="contained">
								Cadastre-se
							</Button>
						</Toolbar>
					</AppBar>
				</Box>
				{children}
			</ThemeProvider>
		</section>
	);
}
