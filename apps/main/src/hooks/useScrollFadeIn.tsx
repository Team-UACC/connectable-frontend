import { useCallback, useEffect, useRef } from 'react';

interface Props {
  duration?: number;
  delay?: number;
  direction?: 'UP' | 'DOWN' | 'RIGHT' | 'LEFT';
}

const TRANSLATE3D_DIRECTION = {
  UP: 'translate3d(0, 50%, 0)',
  DOWN: 'translate3d(0, -50%, 0)',
  RIGHT: 'translate3d(50%, 0, 0)',
  LEFT: 'translate3d(-50%, 0, 0)',
};

export const useScrollFadeIn = ({ duration = 1, delay = 0, direction = 'UP' }: Props) => {
  const dom = useRef<any>(null);

  const handleScroll: IntersectionObserverCallback = useCallback(([entry]) => {
    const { current } = dom;

    if (!current) return;

    if (entry.isIntersecting) {
      current.style.transitionProperty = 'all';
      current.style.transitionDuration = `${duration}s`;
      current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
      current.style.transitionDelay = `${delay}s`;
      current.style.opacity = '1';
      current.style.transform = 'translate3d(0, 0, 0)';
    }
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0 });
      observer.observe(current);

      return () => observer && observer.disconnect();
    }
  }, [handleScroll]);

  return {
    ref: dom,
    style: {
      opacity: 0,
      transform: TRANSLATE3D_DIRECTION[direction],
    },
  };
};
