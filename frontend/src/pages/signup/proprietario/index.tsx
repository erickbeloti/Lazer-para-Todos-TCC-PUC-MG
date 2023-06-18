import AddEditProprietario from '@/components/proprietario/AddEdit';
import Head from 'next/head';

export default function SignUpProprietario() {
	return (
		<>
			<Head>
				<title>Sign Up Proprietario</title>
			</Head>
			<AddEditProprietario title="Cadastrar" />
		</>
	);
}
