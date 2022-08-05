import axios from 'axios';
import { getCookie } from 'cookies-next';

export const authorizationOptions = () => {
  const jwt = getCookie('auth');

  if (!jwt) return;

  return {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
};

const _axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 5000,
});

_axiosInstance.interceptors.response.use(response => {
  console.log(response);
  if (response.status >= 400) {
    console.log(response.data);
    throw Error(response.data.message);
  }
  return response.data;
});

export const axiosInstance = _axiosInstance;
