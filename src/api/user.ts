import axiosClient from "@/utility/config";
import { LoginForm, RegisterForm } from "@/utility/type";

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
