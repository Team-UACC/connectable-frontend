import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import ErrorBoundary from '~/components/ErrorBoundary';
import Layout from '~/components/Layout';
import Modals from '~/components/Modal';
import useUser from '~/hooks/useUser';
import { useModalStore } from '~/stores/modal';

import '~/styles/globals.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

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

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const { hideModal } = useModalStore();

  const getLayout = Component.getLayout ?? ((page: ReactElement) => <Layout>{page}</Layout>);

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
        <ErrorBoundary>
          {getLayout(<Component {...pageProps} />)}
          <Toaster containerStyle={{ top: 300 }} />
          <Modals />
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
}
