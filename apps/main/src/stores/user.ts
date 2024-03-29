import create from 'zustand';

interface UserState {
  isLoggedIn: boolean;
  userName: string;
  klaytnAddress: string;
  phoneNumber: string;

  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setKlaytnAddress: (klaytnAddress: string) => void;
  addUserState: (userName: string, klaytnAddress: string, phoneNumber: string) => void;
  resetUserState: () => void;
}

export const useUserStore = create<UserState>(set => ({
  isLoggedIn: false,
  userName: 'iHoHyeon',
  klaytnAddress: '0xD466B3aafb86446FFD466B3aafb86446FF',
  phoneNumber: '010-5248-4170',

  setIsLoggedIn: (isLoggedIn: boolean) => set(state => ({ ...state, isLoggedIn })),

  setKlaytnAddress: (klaytnAddress: string) => set(state => ({ ...state, klaytnAddress })),

  addUserState: (userName: string, klaytnAddress: string, phoneNumber: string) =>
    set(state => ({ ...state, userName, klaytnAddress, phoneNumber })),

  resetUserState: () =>
    set(state => ({ ...state, isLoggedIn: false, userName: '', klaytnAddress: '', phoneNumber: '' })),
}));
