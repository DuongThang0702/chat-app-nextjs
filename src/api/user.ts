import axiosClient from "@/utility/config";
import { LoginForm } from "@/utility/type";

export const apiLogin = (data: LoginForm) =>
  axiosClient({
    url: "/auth/login",
    method: "post",
    data,
    withCredentials: true,
  });
