import { atom } from 'recoil';

export type FullScreenModalProps = {
  modalName: string;
  children: React.ReactNode;
};

export const modalState = atom<FullScreenModalProps | null>({
  key: 'modalStateKey',
  default: null,
});

export const modalOepnState = atom<boolean>({
  key: 'modalOpenStateKey',
  default: false,
});
