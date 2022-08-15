import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function usePathStore() {
  const router = useRouter();

  const storePathValues = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    const prevPath = storage.getItem('currentPath');
    storage.setItem('prevPath', prevPath as string);
    storage.setItem('currentPath', globalThis.location.pathname + globalThis.location.search);
  };

  useEffect(() => storePathValues, [router.asPath]);
}
