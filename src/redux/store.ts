import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import appSlice from "./app";
import conversationSlice from "./conversation";
import { persistReducer, persistStore } from "redux-persist";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;

const userConfig = {
  key: "chat-app/user",
  storage,
  whitelist: ["accessToken", "isLoggedIn", "current"],
};

export const store = configureStore({
  reducer: {
    user: persistReducer<any>(userConfig, userSlice),
    app: appSlice,
    conversation: conversationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
