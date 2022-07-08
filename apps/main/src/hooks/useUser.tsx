import axios from 'axios';
import { useEffect } from 'react';

import { GetUserLoginRes } from '~/pages/api/users';
import { useUserStore } from '~/stores/user';

const getUser = async () => {
  const res = await axios.get('/api/users');

  return res.data;
};

export default function useUser() {
  const { setIsLoggedIn } = useUserStore();

  const initializeUser = async () => {
    const { status }: GetUserLoginRes = await getUser();

    if (status === 'success') setIsLoggedIn(true);
    else setIsLoggedIn(false);
  };

  useEffect(() => {
    initializeUser();
  }, []);
}
