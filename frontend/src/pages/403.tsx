import { Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import React from 'react';
const Custom403: NextPage = () => {
	return (
		<Container component="main" maxWidth="xs">
			<Grid container direction={'column'}>
				<Typography variant="h5" sx={{ textAlign: 'center', marginTop: 8 }}>
					Você não tem autorização para acessar essa página, saia da aplicação e
					tente fazer login novamente.
				</Typography>
				<Button
					variant="contained"
					sx={{
						marginTop: 2.5,
						width: 128,
						alignSelf: 'center',
					}}
					onClick={() => signOut({ callbackUrl: '/' })}
				>
					Sair
				</Button>
			</Grid>
		</Container>
	);
};

export default Custom403;
