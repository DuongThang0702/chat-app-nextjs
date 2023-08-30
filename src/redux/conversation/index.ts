import { Conversation, Message, initialStateConversation } from "@/utils/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getConversations, getMessageFromConversation } from "./AsyncAction";

const initialState: initialStateConversation = {
  conversation: null as Conversation[] | null,
  isLoading: false,
  isError: false,
  messages: null as Message[] | null,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // get conversation
    builder.addCase(getConversations.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getConversations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.conversation = action.payload;
    });
    builder.addCase(getConversations.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    //get message from conversation
    builder.addCase(getMessageFromConversation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMessageFromConversation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages = action.payload;
      state.isError = false;
    });
    builder.addCase(getMessageFromConversation.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {} = conversationSlice.actions;

export default conversationSlice.reducer;
