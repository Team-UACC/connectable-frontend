import axios from 'axios';
import { useEffect } from 'react';

import { useUserStore } from '~/stores/user';

const getUser = async () => {
  const res = await axios.get('/api/users');

  return res.data;
};

export default function useUser() {
  const { setLoginState } = useUserStore();

  const initializeUser = async () => {
    const data = await getUser();
    console.log(data);

    if (data.status === 'success') setLoginState(true);
    else setLoginState(false);
  };

  useEffect(() => {
    initializeUser();
  }, []);
}
