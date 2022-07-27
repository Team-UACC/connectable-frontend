import { deleteCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

import { requestUserLogin } from '~/apis/users';
import SingUpForm from '~/components/Form/SignUpForm';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';
import { getKlipAccessMethod, getKlipRequest, getKlipRequestKey } from '~/utils/klip';

export const useKlipLogin = () => {
  const method = getKlipAccessMethod();

  const [qrvalue, setQrvalue] = useState('DEFAULT');
  const [refetchInterval, setRefetchInterval] = useState(1000);
  const [requestKey, setRequestKey] = useState('');

  const { setKlaytnAddress, setIsLoggedIn } = useUserStore();
  const { showModal, hideModal } = useModalStore();

  useQuery(['login', { requestKey }], () => requestUserLogin(requestKey), {
    onSuccess: data => {
      if (data.status === 'completed') {
        setRefetchInterval(0);

        const { jwt, isNew, klaytnAddress } = data;

        setCookie('auth', jwt);

        if (isNew) {
          setKlaytnAddress(klaytnAddress as string);
          showModal('Sign Up', <SingUpForm />);
        } else {
          setIsLoggedIn(true);
          hideModal();
        }
      }
    },
    refetchInterval,
  });

  useEffect(() => {
    (async () => {
      const fetchedRequestKey = await getKlipRequestKey();
      setRequestKey(fetchedRequestKey);

      getKlipRequest(fetchedRequestKey, method, setQrvalue);
    })();
  }, []);

  return [method, qrvalue];
};

export const useLogout = () => {
  const { setIsLoggedIn } = useUserStore();
  const logOut = () => {
    deleteCookie('auth');
    setIsLoggedIn(false);
    toast.success('로그아웃 되었습니다.');
  };

  return logOut;
};
