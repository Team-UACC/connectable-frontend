import { useEffect } from 'react';

import { getUser } from '~/apis/users';
import { useUserStore } from '~/stores/user';

export default function useUser() {
  const { setIsLoggedIn, addUserState, resetUserState, isLoggedIn } = useUserStore();

  const initializeUser = async () => {
    const response = await getUser();

    if (response.status === 'success') {
      const { nickname, klaytnAddress, phoneNumber } = response;
      addUserState(nickname as string, klaytnAddress as string, phoneNumber as string);
      setIsLoggedIn(true);
    } else {
      resetUserState();
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    initializeUser();
  }, [isLoggedIn]);
}
