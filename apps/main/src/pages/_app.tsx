import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast, { Toaster } from 'react-hot-toast';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

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

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const { hideModal } = useModalStore();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const getLayout = Component.getLayout ?? ((page: ReactElement) => <Layout>{page}</Layout>);

  useUser();

  useEffect(() => {
    const handleComplete = () => {
      toast.dismiss();
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
        <Hydrate state={pageProps.dehydratedState}>
          <ErrorBoundary>
            {getLayout(<Component {...pageProps} />)}
            <Toaster containerStyle={{ top: 300 }} />
            <Modals />
          </ErrorBoundary>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
