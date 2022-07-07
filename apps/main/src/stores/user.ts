import create from 'zustand';

interface UserState {
  isLoggedIn: boolean;
  setLoginState: (_isLoggedIn: boolean) => void;
}

export const useUserStore = create<UserState>(set => ({
  isLoggedIn: false,
  setLoginState: (_isLoggedIn: boolean) => set(state => ({ ...state, isLoggedIn: _isLoggedIn })),
}));
