import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from '~/components/Layout';
import Modals from '~/components/Modal';
import useUser from '~/hooks/useUser';

import '~/styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1분
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  useUser();

  return (
    <>
      <Head>
        <title>Connectable - 디지털 티켓의 새로운 패러다임</title>
        <meta property="og:title" content="Connectable - 디지털 티켓의 새로운 패러다임" />
        <meta property="og:image" content="" />
        <meta name="description" content="" />
        <meta property="og:description" content="" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
          <Toaster containerStyle={{ top: 300 }} />
          <Modals />
        </Layout>
      </QueryClientProvider>
    </>
  );
}
