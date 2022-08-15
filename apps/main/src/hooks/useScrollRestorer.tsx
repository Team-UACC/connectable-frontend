// eslint-disable-next-line import/no-named-as-default
import Router from 'next/router';
import { useEffect } from 'react';

import { isShallowModalUrl } from '../utils';

export default function useScrollRestorer() {
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
        window.requestAnimationFrame(() => window.scrollTo({ top: prevScrollY, behavior: 'smooth' }));
      }
    };

    const scrollToTop = () => {
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    };
  }

  useEffect(() => {
    scrollPositionRestorer();
  }, []);
}
