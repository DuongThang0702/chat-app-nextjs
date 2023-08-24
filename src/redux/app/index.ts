import { initialStateApp } from "@/utils/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";

const initialState: initialStateApp = {
  isShowModal: false,
  modalChildren: null as ReactNode | null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showModal: (state, { payload }: PayloadAction<initialStateApp>) => {
      state.isShowModal = payload.isShowModal;
      state.modalChildren = payload.modalChildren;
    },
  },
});

export const { showModal } = appSlice.actions;

export default appSlice.reducer;
