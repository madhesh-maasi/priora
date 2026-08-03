import { create } from 'zustand';

export type ModalType = 'createTask' | 'editTask' | 'taskDetails' | 'settings' | 'createCategory';

interface Modal {
  type: ModalType;
  isOpen: boolean;
  data?: Record<string, unknown>;
}

interface ModalState {
  modals: Record<ModalType, Modal>;
  openModal: (type: ModalType, data?: Record<string, unknown>) => void;
  closeModal: (type: ModalType) => void;
  closeAllModals: () => void;
}

const createInitialModals = (): Record<ModalType, Modal> => ({
  createTask: { type: 'createTask', isOpen: false },
  editTask: { type: 'editTask', isOpen: false },
  taskDetails: { type: 'taskDetails', isOpen: false },
  settings: { type: 'settings', isOpen: false },
  createCategory: { type: 'createCategory', isOpen: false },
});

export const useModalStore = create<ModalState>((set) => ({
  modals: createInitialModals(),

  openModal: (type, data) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [type]: { ...state.modals[type], isOpen: true, data },
      },
    })),

  closeModal: (type) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [type]: { ...state.modals[type], isOpen: false, data: undefined },
      },
    })),

  closeAllModals: () =>
    set({
      modals: createInitialModals(),
    }),
}));
