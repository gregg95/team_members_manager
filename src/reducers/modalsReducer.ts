import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ModalOption } from '../api/types';

interface ModalsState {
  openedModal: null | ModalOption;
  parameters?: null | {
    id?: string;
    message?: string;
  };
}

const initialState: ModalsState = {
  openedModal: null,
  parameters: null,
};

export interface OpenModalPayload {
  modal: ModalOption;
  parameters?: null | {
    id?: string;
    message?: string;
  };
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState: initialState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalPayload>) => {
      state.openedModal = action.payload.modal;
      state.parameters = action.payload.parameters;
    },
    closeModal: (state) => {
      state.openedModal = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
