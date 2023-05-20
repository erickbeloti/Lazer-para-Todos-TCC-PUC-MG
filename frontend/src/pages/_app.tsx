import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../../src/theme';
import createEmotionCache from '../../src/createEmotionCache';
import { AppBar, Button, GlobalStyles, Toolbar } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	const router = useRouter();
	const showButtonAppBar = router.pathname === '/login' ? true : false;

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<GlobalStyles
					styles={{
						body: { backgroundColor: '#463B85', color: '#fff' },
					}}
				/>

				<AppBar position="static" sx={{ backgroundColor: '#7465B4' }}>
					<Toolbar sx={{ justifyContent: 'flex-end' }}>
						{showButtonAppBar && (
							<Link href="/signup" passHref>
								<Button color="primary" variant="contained">
									Cadastre-se
								</Button>
							</Link>
						)}
					</Toolbar>
				</AppBar>

				<Component {...pageProps} />
			</ThemeProvider>
		</CacheProvider>
	);
}
