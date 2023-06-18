import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

export const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const theme = createTheme({
	palette: {
		primary: {
			main: '#1AE6EF',
		},
		secondary: {
			main: '#FFCD00',
		},
	},
	typography: {
		button: {
			fontSize: 16,
			fontWeight: 700,
			textTransform: 'none',
		},
	},
	components: {
		MuiFilledInput: {
			styleOverrides: {
				root: {
					':hover': {
						backgroundColor: 'rgb(255 255 255 / 80%)',
					},
					borderRadius: 15,
					backgroundColor: '#fff',
					'&.Mui-focused': {
						backgroundColor: '#fff',
					},
					'::before': {
						marginLeft: 10,
						marginRight: 10,
					},
					'::after': {
						marginLeft: 10,
						marginRight: 10,
						borderRadius: '15px',
					},
					'&.Mui-disabled': {
						backgroundColor: 'rgb(255 255 255 / 50%)',
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					'&.Mui-focused': {
						color: 'rgb(0 0 0 / 60%)',
					},
				},
			},
		},
	},
});

export default theme;
