import {
	Avatar,
	Box,
	Button,
	Container,
	Paper,
	Rating,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import AuditivaSvg from '../../../../public/disabilities/auditiva.svg';
import AutismoSvg from '../../../../public/disabilities/autismo.svg';
import FisicaSvg from '../../../../public/disabilities/fisica.svg';
import Idoso80Svg from '../../../../public/disabilities/idoso80.svg';
import IntelectualSvg from '../../../../public/disabilities/intelectual.svg';
import VisualSvg from '../../../../public/disabilities/visual.svg';

const items = [
	{
		url: '/companies/1/1.png',
	},
	{
		url: '/companies/1/2.png',
	},
	{
		url: '/companies/1/3.png',
	},
	{
		url: '/companies/1/4.png',
	},
];

interface Item {
	item: {
		url: string;
	};
}

function Item(props: Item) {
	return (
		<Box position={'relative'} height={300}>
			<Image src={props.item.url} alt="logo" fill priority />
		</Box>
	);
}

export default function Estabelecimento() {
	return (
		<Container component="main" maxWidth="md">
			<Box mt={2} />
			<Paper
				variant="outlined"
				sx={{
					borderRadius: '15px',
					border: 0,
					position: 'relative',
				}}
			>
				<Grid container alignItems={'center'} gap={1} pt={1}>
					<Grid xs={12} md={1} pl={1}>
						<Avatar
							alt="Pão e Prosa"
							src="/companies/1/1.png"
							sx={{ width: 70, height: 70 }}
						/>
					</Grid>

					<Grid xs={12} md>
						<Grid container direction={'column'} pl={1}>
							<Typography variant="h6" fontWeight={700}>
								Pão e Prosa
							</Typography>
							<Typography
								variant="subtitle2"
								fontWeight={700}
								color={'rgb(0 0 0 / 41%)'}
							>
								Rua dos Poetas, 123 - Vila das Artes, São Paulo - SP, 01234-567
							</Typography>
							<Typography
								variant="subtitle2"
								fontWeight={700}
								color={'rgb(0 0 0 / 41%)'}
							>
								(11) 5555-5555
							</Typography>

							<Box position={'absolute'} top={8} right={8}>
								<Button
									variant="contained"
									color="secondary"
									sx={{
										width: 103,
									}}
								>
									Seguir
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Grid>

				<Grid container justifyContent={'end'} mr={1}>
					<Rating precision={0.5} size="large" value={4} readOnly />
				</Grid>

				<Carousel navButtonsAlwaysVisible>
					{items.map((item, i) => (
						<Item key={i} item={item} />
					))}
				</Carousel>

				<Box p={2}>
					<Typography
						variant="subtitle2"
						fontWeight={700}
						color={'rgb(0 0 0 / 41%)'}
					>
						Acessibilidades confirmadas
					</Typography>

					<FisicaSvg width={40} height={40} />

					<VisualSvg width={40} height={40} />

					<AuditivaSvg fill="rgb(0 0 0 / 35%)" width={40} height={40} />

					<Idoso80Svg width={40} height={40} />

					<IntelectualSvg fill="rgb(0 0 0 / 35%)" width={40} height={40} />

					<AutismoSvg fill="rgb(0 0 0 / 35%)" width={40} height={40} />

					<Typography variant="h6" fontWeight={700}>
						Descrição
					</Typography>

					<Typography variant="subtitle2">
						A cafeteria Pão e Prosa é um ambiente acolhedor e inclusivo, pensado
						para receber pessoas de todas as habilidades e necessidades. Com
						cardápio variado, que inclui opções sem glúten e sem lactose, e
						ambiente acessível, a cafeteria busca proporcionar uma experiência
						agradável para todos os clientes. Além disso, a Pão e Prosa valoriza
						a diversidade e a inclusão, buscando promover um ambiente de
						convivência harmônica e respeitosa.
					</Typography>
				</Box>
			</Paper>

			<Box mt={2} />

			<Paper
				variant="outlined"
				sx={{
					borderRadius: '15px',
					border: 0,
					p: 2,
					display: 'flex',
					flexDirection: 'column',
					gap: 3,
				}}
			>
				<Box>
					<Typography variant="h6" fontWeight={700}>
						Ana Silva
					</Typography>

					<Paper
						variant="outlined"
						sx={{
							borderRadius: '15px',
							border: 0,
							backgroundColor: '#6B3B82',
							color: '#fff',
							p: 2,
						}}
					>
						<Grid container justifyContent={'end'}>
							<Grid xs={12} md>
								<Typography variant="subtitle2">
									A Pão e Prosa é um lugar super aconchegante, com uma decoração
									rústica que cria um ambiente convidativo para todos. Gostei
									especialmente da disponibilidade de rampas e corrimões para
									pessoas com mobilidade reduzida, o que mostra que eles se
									preocupam com a acessibilidade. A única coisa que poderia ser
									melhor é o tamanho da fonte no cardápio, que é um pouco
									pequena para quem tem dificuldades visuais.
								</Typography>
							</Grid>

							<Grid container direction={'column'}>
								<Grid>
									<Rating precision={0.5} size="large" value={4} readOnly />
								</Grid>

								<Grid container>
									<FisicaSvg fill="rgb(0 0 0 / 35%)" width={25} height={25} />

									<VisualSvg fill="rgb(0 0 0 / 35%)" width={25} height={25} />

									<AuditivaSvg fill="rgb(0 0 0 / 35%)" width={25} height={25} />

									<Idoso80Svg width={25} height={25} />

									<IntelectualSvg
										fill="rgb(0 0 0 / 35%)"
										width={25}
										height={25}
									/>

									<AutismoSvg fill="rgb(0 0 0 / 35%)" width={25} height={25} />
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</Box>

				<Box>
					<Typography variant="h6" fontWeight={700}>
						Maria Oliveira
					</Typography>

					<Paper
						variant="outlined"
						sx={{
							borderRadius: '15px',
							border: 0,
							backgroundColor: '#6B3B82',
							color: '#fff',
							p: 2,
						}}
					>
						<Grid container justifyContent={'end'}>
							<Grid xs={12} md>
								<Typography variant="subtitle2">
									Sou apaixonada por essa cafeteria! Além de um ambiente
									charmoso, eles possuem cardápio com opções veganas e sem
									glúten, que é ótimo para quem tem restrições alimentares. Eu
									também gostei da sinalização em braile nos cardápios, o que
									torna o lugar ainda mais inclusivo.
								</Typography>
							</Grid>

							<Grid container direction={'column'}>
								<Grid>
									<Rating precision={0.5} size="large" value={5} readOnly />
								</Grid>

								<Grid container>
									<FisicaSvg fill="rgb(0 0 0 / 35%)" width={25} height={25} />

									<VisualSvg width={25} height={25} />

									<AuditivaSvg fill="rgb(0 0 0 / 35%)" width={25} height={25} />

									<Idoso80Svg fill="rgb(0 0 0 / 35%)" width={25} height={25} />

									<IntelectualSvg
										fill="rgb(0 0 0 / 35%)"
										width={25}
										height={25}
									/>

									<AutismoSvg fill="rgb(0 0 0 / 35%)" width={25} height={25} />
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</Box>

				<Box>
					<Typography variant="h6" fontWeight={700}>
						Pedro Rocha
					</Typography>

					<Paper
						variant="outlined"
						sx={{
							borderRadius: '15px',
							border: 0,
							backgroundColor: '#6B3B82',
							color: '#fff',
							p: 2,
						}}
					>
						<Grid container justifyContent={'end'}>
							<Grid xs={12} md>
								<Typography variant="subtitle2">
									A Pão e Prosa tem um café delicioso, mas senti falta de mais
									opções de cadeiras e mesas acessíveis para cadeirantes. No
									entanto, fiquei feliz em ver que eles possuem um banheiro
									acessível, que é um item básico de acessibilidade que muitos
									lugares ignoram.
								</Typography>
							</Grid>

							<Grid container direction={'column'}>
								<Grid>
									<Rating precision={0.5} size="large" value={3} readOnly />
								</Grid>

								<Grid container>
									<FisicaSvg width={25} height={25} />

									<VisualSvg fill="rgb(0 0 0 / 35%)" width={25} height={25} />

									<AuditivaSvg fill="rgb(0 0 0 / 35%)" width={25} height={25} />

									<Idoso80Svg fill="rgb(0 0 0 / 35%)" width={25} height={25} />

									<IntelectualSvg
										fill="rgb(0 0 0 / 35%)"
										width={25}
										height={25}
									/>

									<AutismoSvg fill="rgb(0 0 0 / 35%)" width={25} height={25} />
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</Box>
			</Paper>
		</Container>
	);
}
