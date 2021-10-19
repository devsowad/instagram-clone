import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';

interface AppCustomProps extends AppProps {
  session?: any;
}

function MyApp({ Component, session, pageProps }: AppCustomProps) {
  return (
    <>
      <Head>
        <title>Instagram Clone</title>
      </Head>
      <SessionProvider session={session}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </SessionProvider>
    </>
  );
}
export default MyApp;
