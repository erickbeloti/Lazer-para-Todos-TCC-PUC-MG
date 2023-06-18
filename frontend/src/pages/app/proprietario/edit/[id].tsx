import AddEditProprietario from '@/components/proprietario/AddEdit';
import api from '@/services/api';
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

const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function EditPcD() {
	const { query, asPath } = useRouter();
	const { id } = query;
	const {
		data: user,
		error,
		isLoading,
	} = useSWR(`/api/proprietarios/${id}`, fetcher);

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

			{isLoading && (
				<Backdrop
					sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
					open
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}

			{!isLoading && <AddEditProprietario user={user} title="Salvar" />}
		</>
	);
}
