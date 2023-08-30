import { apiGetConversation, apiGetMessageFromConversation } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getConversations = createAsyncThunk(
  "conversation/fromuser",
  async (_, { rejectWithValue }) => {
    const response = await apiGetConversation();
    if (response.status >= 400 && response.status <= 599)
      return rejectWithValue(response);
    return response.data;
  }
);

export const getMessageFromConversation = createAsyncThunk(
  "conversation/messages",
  async (idConversation: string, { rejectWithValue }) => {
    const response = await apiGetMessageFromConversation(idConversation);
    if (response.status >= 400 && response.status <= 599)
      return rejectWithValue(response);
    return response.data;
  }
);
