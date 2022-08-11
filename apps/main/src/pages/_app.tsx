/* eslint-disable import/no-named-as-default */
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import ErrorBoundary from '~/components/ErrorBoundary';
import Layout from '~/components/Layout';
import Modals from '~/components/Modal';
import useUser from '~/hooks/useUser';
import * as gtag from '~/libs/gtag';
import { useModalStore } from '~/stores/modal';

import '~/styles/globals.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const SHALLOW_MODAL_URL_LIST = ['?ticketId'];

const isShallowModalUrl = (url: string) => SHALLOW_MODAL_URL_LIST.some(v => url.indexOf(v) !== -1);

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

  function scrollPositionRestorer() {
    const scrollMemories: { [asPath: string]: number } = {};
    let isPop = false;

    if (process.browser) {
      window.history.scrollRestoration = 'manual';
      window.onpopstate = () => {
        isPop = true;
      };
    }

    Router.events.on('routeChangeStart', () => {
      saveScroll();
    });

    Router.events.on('routeChangeComplete', (url: string) => {
      if (isPop) {
        restoreScroll();
        isPop = false;
      } else {
        !isShallowModalUrl(url) && scrollToTop();
      }
    });

    const saveScroll = () => {
      scrollMemories[Router.asPath] = window.scrollY;
    };

    const restoreScroll = () => {
      const prevScrollY = scrollMemories[Router.asPath];
      if (prevScrollY !== undefined) {
        window.requestAnimationFrame(() => window.scrollTo(0, prevScrollY));
      }
    };

    const scrollToTop = () => {
      window.requestAnimationFrame(() => window.scrollTo(0, 0));
    };
  }

  useUser();

  const storePathValues = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    const prevPath = storage.getItem('currentPath');
    storage.setItem('prevPath', prevPath as string);
    storage.setItem('currentPath', globalThis.location.pathname + globalThis.location.search);
  };

  useEffect(() => storePathValues, [router.asPath]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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

  useEffect(() => {
    scrollPositionRestorer();
  }, []);

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
