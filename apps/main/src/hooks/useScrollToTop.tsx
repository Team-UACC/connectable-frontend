import { MutableRefObject, useEffect } from 'react';

export default function useScrollToTop(ref: MutableRefObject<HTMLElement | null>) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, 0);
    }
  }, []);
}
