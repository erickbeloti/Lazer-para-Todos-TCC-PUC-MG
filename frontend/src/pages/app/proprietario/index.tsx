import { Button } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';

export default function Index() {
	const { data: session } = useSession();

	return (
		<>
			<h1>Protected Page Proprietario</h1>
			<p>{session?.user?.email}</p>
			<Button
				variant="contained"
				sx={{
					marginTop: 2.5,
					width: 128,
				}}
				onClick={() => signOut({ callbackUrl: '/signin' })}
			>
				Sign out
			</Button>
		</>
	);
}
