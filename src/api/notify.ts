import axiosClient from "@/utils/config";

export const apiGetNotifies = (query?: {}) =>
  axiosClient({ url: `/notify?${query}`, method: "get" });
