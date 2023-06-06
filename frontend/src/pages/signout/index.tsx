import { Backdrop, CircularProgress } from '@mui/material';
import { signOut } from 'next-auth/react';
import Head from 'next/head';
import { useEffect } from 'react';

export default function SignOut() {
	useEffect(() => {
		signOut({ callbackUrl: '/signin' });
	}, []);

	return (
		<>
			<Head>
				<title>Sign Out</title>
			</Head>
			<Backdrop
				sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
				open
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</>
	);
}
