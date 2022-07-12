import { deleteCookie, getCookie } from 'cookies-next';
import { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { getUser } from '~/apis/users';

type Props = any;

export default function WithAuth(WrappedCompnent: NextComponentType<Props>) {
  return (props: Props) => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const accessToken = getCookie('auth');

      if (!accessToken) {
        router.replace('/');
        toast.error('로그인을 해주세요.');
      } else {
        (async () => {
          const data = await getUser();
          if (data.status === 'success') {
            setVerified(true);
          } else {
            deleteCookie('auth');
            router.replace('/');
            toast.error('로그인을 해주세요.');
          }
        })();
      }
    }, []);

    if (verified) return <WrappedCompnent {...props} />;
    else return null;
  };
}
