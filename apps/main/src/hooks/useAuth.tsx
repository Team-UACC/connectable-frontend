import { deleteCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

import { requestUserLogin } from '~/apis/users';
import SignUpForm from '~/components/Form/SignUpForm';
import { event } from '~/libs/gtag';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';
import { getKlipAccessMethod, getKlipRequest, getKlipRequestKey } from '~/utils/klip';

export const useKlipLogin = () => {
  const method = getKlipAccessMethod();

  const [qrvalue, setQrvalue] = useState('DEFAULT');
  const [refetchInterval, setRefetchInterval] = useState(0);
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
          event({ action: 'try_sign_up', category: 'engagement', label: `try_sign_up: ${klaytnAddress}`, value: 1 });
          setKlaytnAddress(klaytnAddress as string);
          showModal('회원가입', <SignUpForm />);
        } else {
          event({ action: 'login', category: 'engagement', label: `login_success: ${klaytnAddress}`, value: 1 });
          setIsLoggedIn(true);
          toast.success('로그인되었습니다.');
          hideModal();
        }
      }
    },
    refetchInterval,
    enabled: refetchInterval > 0,
  });

  useEffect(() => {
    (async () => {
      const fetchedRequestKey = await getKlipRequestKey();
      setRequestKey(fetchedRequestKey);

      getKlipRequest(fetchedRequestKey, method, setQrvalue);

      setRefetchInterval(1000);
    })();
  }, []);

  return [method, qrvalue];
};

export const useLogout = () => {
  const { setIsLoggedIn, klaytnAddress } = useUserStore();
  const logOut = () => {
    deleteCookie('auth');
    setIsLoggedIn(false);
    event({ action: 'logout', category: 'engagement', label: `logut_success: ${klaytnAddress}`, value: 1 });
    toast.success('로그아웃 되었습니다.');
  };

  return logOut;
};
