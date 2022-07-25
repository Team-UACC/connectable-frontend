import { deleteCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import { requestUserLogin } from '~/apis/users';
import SingUpForm from '~/components/Form/SignUpForm';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';
import { getKlipAccessMethod, getKlipRequest, getKlipRequestKey } from '~/utils/klip';

export const useKlipLogin = () => {
  const method = getKlipAccessMethod();

  const [qrvalue, setQrvalue] = useState('DEFAULT');
  const { setKlaytnAddress, setIsLoggedIn } = useUserStore();
  const { showModal, hideModal } = useModalStore();

  useEffect(() => {
    let intervalId: NodeJS.Timer;

    (async () => {
      const requestKey = await getKlipRequestKey();

      getKlipRequest(requestKey, method, setQrvalue);

      intervalId = setInterval(async () => {
        const response = await requestUserLogin(requestKey);

        if (response.status === 'completed') {
          const { jwt, isNew, klaytnAddress } = response;

          setCookie('auth', jwt);

          if (isNew) {
            setKlaytnAddress(klaytnAddress as string);
            showModal('Sign Up', <SingUpForm />);
          } else {
            setIsLoggedIn(true);
            hideModal();
          }
          clearInterval(intervalId);
        }
      }, 1000);
    })();

    return () => {
      clearInterval(intervalId);
    };
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
