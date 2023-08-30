import React from "react";
import { UseFormRegister } from "react-hook-form";

export type Menu = {
  id: number;
  title: string;
  link?: string;
};

export type RegisterForm = {
  email: string;
  password: string;
  lastname: string;
  firstname: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type LocalStorage = {
  isLoggedIn: boolean;
  accessToken: string;
};

export type InputField = {
  type?: string;
  name: string;
  register: UseFormRegister<any>;
  style?: string;
  fullw?: boolean;
  errors?: string;
  placeholder?: string;
  label?: string;
  styleLabel?: string;
  textarea?: boolean;
  defaultValue?: string;
  validate?: object;
};

export type button = {
  title: string;
  style?: string;
  submit?: boolean;
  fullw?: boolean;
};

export type findUserFromInput = {
  email?: string;
};

//User
export type Current = {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
};

export interface User extends Current {
  avatar: string | null;
}

export type PayloadLogin = {
  isLoggedIn: boolean;
  accessToken: string;
};
//Message

export type Message = {
  _id: string;
  author: User;
  idConversation: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

//Conversation

export type CreateConversation = {
  email: string;
  message: string;
};

export type Conversation = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  creator: User;
  recipient: User;
  lastMessage: Message;
  message: Message[];
};

//Redux
export type initlaStateUser = {
  loading: boolean;
  current: any;
  isLoggedIn: boolean;
  accessToken: string | null;
  error: boolean;
};

export type initialStateApp = {
  isShowModal: boolean;
  modalChildren: React.ReactNode;
};

export type initialStateConversation = {
  isLoading: boolean;
  conversation: Conversation[] | null;
  isError: boolean;
  messages: Message[] | null;
};
