import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import ErrorBoundary from '~/components/ErrorBoundary';
import Layout from '~/components/Layout';
import Modals from '~/components/Modal';
import useUser from '~/hooks/useUser';
import { useModalStore } from '~/stores/modal';

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
  const router = useRouter();
  const { hideModal } = useModalStore();

  useUser();

  useEffect(() => {
    const handleComplete = () => {
      hideModal();
    };
    router.events.on('routeChangeComplete', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [router]);

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
