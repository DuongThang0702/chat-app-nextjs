import React from "react";
import { UseFormRegister } from "react-hook-form";

export type RegisterForm = {
  email: string;
  password: string;
  lastname: string;
  firstname: string;
};

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
  author: User;
  idConversation: string;
  content: string;
};

//Conversation

export type CreateConversation = {
  email: string;
  message: string;
};

export type Conversation = {
  createdAt: string;
  updatedAt: string;
  creator: User;
  recipient: User;
  lastMessage: string;
  message: Message[];
};
