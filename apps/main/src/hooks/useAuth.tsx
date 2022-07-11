import { deleteCookie, setCookie } from 'cookies-next';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { postUserLogIn } from '~/apis/users';
import SingUpForm from '~/components/auth/SignUpForm';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';
import { getKlipAccessMethod, getKlipRequest } from '~/utils/klip';

export const useKlipLogin = () => {
  const method = getKlipAccessMethod();

  const [qrvalue, setQrvalue] = useState('DEFAULT');
  const { setKlaytnAddress, setIsLoggedIn } = useUserStore();
  const { showModal, hideModal } = useModalStore();

  useEffect(() => {
    let intervalId: NodeJS.Timer;

    (async () => {
      const requestKey = await getKlipRequest(method, setQrvalue);

      intervalId = setInterval(async () => {
        const { status, klaytnAddress, jwt, isNew } = await postUserLogIn(requestKey);

        if (status === 'completed') {
          setCookie('auth', jwt, { maxAge: 60 * 24, httpOnly: true, secure: true, sameSite: 'strict' });

          if (isNew) {
            setKlaytnAddress(klaytnAddress as string);
            showModal('Sign Up', <SingUpForm />);
          } else {
            setIsLoggedIn(true);
            console.log('hide');
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
  const { resetUserState } = useUserStore();
  const logOut = useCallback(() => {
    deleteCookie('auth');
    resetUserState();
    toast.success('로그아웃 되었습니다.');
  }, []);

  return logOut;
};
