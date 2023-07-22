import AddEditProprietario from '@/components/proprietario/AddEdit';
import useApiAuth from '@/lib/hooks/useApiAuth';
import {
	Alert,
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Container,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function EditPcD() {
	const { apiAuth, isLoadingApi } = useApiAuth();
	const fetcher = (url: string) => apiAuth.get(url).then(res => res.data);
	const { query, asPath } = useRouter();
	const { id } = query;

	const { data: user, error } = useSWR(
		!isLoadingApi && id ? `/api/proprietarios/${id}` : null,
		fetcher,
	);

	if (error)
		return (
			<Container component="main" maxWidth="sm">
				<Box m={2}>
					<Alert severity="error" sx={{ textAlign: 'center' }}>
						Erro ao tentar recuperar informações do usuário.
						<Button href={asPath}>Tente novamente</Button>
					</Alert>
				</Box>
			</Container>
		);

	return (
		<>
			<Head>
				<title>Editar Proprietário</title>
			</Head>

			{!user && (
				<Backdrop
					sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
					open
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}

			{user && <AddEditProprietario user={user} title="Salvar" />}
		</>
	);
}
