import { createSlice } from "@reduxjs/toolkit";
import { currentUser } from "./AsyncAction";
import { initlaStateUser } from "@/utils/type/redux";
import { Current } from "@/utils/type";

const initialState: Partial<initlaStateUser> = {
  loading: false,
  current: null as Current | null,
  isLoggin: false,
  access_token: null as string | null,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(currentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(currentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.access_token = action.payload;
      state.isLoggin = true;
      state.current = action.payload;
    });

    builder.addCase(currentUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
      state.isLoggin = false;
      state.access_token = null;
      state.current = null;
    });
  },
});

export default userSlice.reducer;
