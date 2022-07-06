import { atom } from 'recoil';

export const LoginState = atom<boolean>({
  key: 'LoginState',
  default: false,
});
