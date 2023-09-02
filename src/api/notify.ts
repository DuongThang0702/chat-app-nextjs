import axiosClient from "@/utils/config";

export const apiGetNotifies = (query?: {}) =>
  axiosClient({ url: `/notify?${query}`, method: "get" });

export const apiUpdateStatus = (status: boolean, idConversation: string) =>
  axiosClient({
    url: "/notify",
    method: "patch",
    data: { status, idConversation },
  });
