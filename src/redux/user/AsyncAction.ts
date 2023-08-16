import { apiCurrentUser } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const currentUser = createAsyncThunk(
  "user/currrent",
  async (_, { rejectWithValue }) => {
    const response = await apiCurrentUser();
    if (response.status >= 400 && response.status <= 599)
      return rejectWithValue(response);
    return response.data;
  }
);
