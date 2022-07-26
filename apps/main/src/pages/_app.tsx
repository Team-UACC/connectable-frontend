import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import ErrorBoundary from '~/components/ErrorBoundary';
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>Connectable</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
          <Toaster containerStyle={{ top: 300 }} />
          <Modals />
        </Layout>
      </QueryClientProvider>
    </>
  );
}
