import axios from "axios";
import { LocalStorage } from "./type";

let localStorage = window.localStorage.getItem("persist:chat-app/user");

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_SERVER,
  headers: {
    "content-type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: any) {
    if (localStorage && typeof localStorage === "string") {
      const data: LocalStorage = JSON.parse(localStorage);
      const token = JSON.parse(data?.accessToken);
      config.headers = { authorization: token };
      return config;
    } else return config;
  },
  function (error) {
    // Do something with request error
    return error.response;
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response;
  }
);
export default axiosClient;
