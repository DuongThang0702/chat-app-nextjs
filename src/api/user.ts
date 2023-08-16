import axiosClient from "@/utils/config";
import { LoginForm, RegisterForm } from "@/utils/type";

export const apiLogin = (data: LoginForm) =>
  axiosClient({
    url: "/auth/login",
    method: "post",
    data,
    withCredentials: true,
  });

export const apiregister = (data: RegisterForm) =>
  axiosClient({
    url: "/auth/register",
    method: "post",
    data,
  });

export const apiCurrentUser = () =>
  axiosClient({ url: "/auth/current", method: "get" });
