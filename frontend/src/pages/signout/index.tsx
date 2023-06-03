import { Backdrop, CircularProgress } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function SignOut() {
	useEffect(() => {
		signOut({ callbackUrl: '/signin' });
	}, []);

	return (
		<Backdrop
			sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
			open
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}
