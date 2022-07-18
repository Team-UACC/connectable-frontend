import { useEffect } from 'react';

import { fetchUser } from '~/apis/users';
import { useUserStore } from '~/stores/user';

export default function useUser() {
  const { setIsLoggedIn, addUserState, resetUserState, isLoggedIn } = useUserStore();

  const initializeUser = async () => {
    const response = await fetchUser();

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
