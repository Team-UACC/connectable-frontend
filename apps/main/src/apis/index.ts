import axios from 'axios';
import { getCookie } from 'cookies-next';

export const authorizationOptions = () => ({
  headers: {
    Authorization: `Bearer ${getCookie('auth')}`,
  },
});

const _axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 5000,
});

_axiosInstance.interceptors.response.use(response => {
  return response.data;
});

export const axiosInstance = _axiosInstance;
