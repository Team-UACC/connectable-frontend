/* eslint-disable import/no-named-as-default */
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import ErrorBoundary from '~/components/ErrorBoundary';
import Layout from '~/components/Layout';
import Modals from '~/components/Modal';
import useGtag from '~/hooks/useGtag';
import usePathStore from '~/hooks/usePathStore';
import useScrollRestorer from '~/hooks/useScrollRestorer';
import useUser from '~/hooks/useUser';
import { useModalStore } from '~/stores/modal';

import '~/styles/globals.css';
import { isShallowModalUrl } from '../utils';

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
  usePathStore();
  useScrollRestorer();
  useGtag();

  useEffect(() => {
    const handleStart = () => {
      hideModal();
    };

    const handleComplete = (url: string, { shallow }: { shallow: boolean }) => {
      toast.dismiss();

      if (!isShallowModalUrl(url) && !shallow) {
        hideModal();
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [router]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ErrorBoundary>
            {getLayout(<Component {...pageProps} />)}
            <Toaster containerStyle={{ top: 300 }} toastOptions={{ duration: 3000 }} />
            <Modals />
          </ErrorBoundary>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
