import AddEditPcD from '@/components/pcd/AddEdit';
import Head from 'next/head';

export default function SignUpPcD() {
	return (
		<>
			<Head>
				<title>Sign Up PcD</title>
			</Head>
			<AddEditPcD title="Cadastrar" />
		</>
	);
}
