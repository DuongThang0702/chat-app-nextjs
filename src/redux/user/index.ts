import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { currentUser } from "./AsyncAction";
import { Current, initlaStateUser, PayloadLogin } from "@/utils/type";

const initialState: initlaStateUser = {
  loading: false,
  current: null as Current | null,
  isLoggedIn: false,
  accessToken: null as string | null,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<PayloadLogin>) => {
      state.isLoggedIn = payload.isLoggedIn;
      state.accessToken = payload.accessToken;
    },
  },
  extraReducers(builder) {
    builder.addCase(currentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(currentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.isLoggedIn = true;
      state.current = action.payload;
    });

    builder.addCase(currentUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
      state.isLoggedIn = false;
      state.current = null;
    });
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
