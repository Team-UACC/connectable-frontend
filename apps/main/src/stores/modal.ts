import { ReactNode } from 'react';
import create from 'zustand';

interface ModalState {
  isOpen: boolean;
  setIsOpen: (_isOpen: boolean) => void;
  modalName: ReactNode | null;
  children: React.ReactNode;
  setModalContent: (modalName: ReactNode | null, children: React.ReactNode) => void;
  showModal: (modalName: ReactNode | null, children: React.ReactNode) => void;
  hideModal: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  setIsOpen: (_isOpen: boolean) => set(state => ({ ...state, isOpen: _isOpen })),
  modalName: null,
  children: null,
  setModalContent: (_modalName, _children) => set(state => ({ ...state, modalName: _modalName, children: _children })),

  showModal: (_modalName, _children) =>
    set(state => ({ ...state, isOpen: true, modalName: _modalName, children: _children })),
  hideModal: () => set(state => ({ ...state, isOpen: false, modalName: null, children: null })),
}));
