import { useRouter } from 'next/router';
import { useEffect } from 'react';

import * as gtag from '~/libs/gtag';

export default function useGtag() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
}
