import axiosClient from "@/utils/config";

export const apiGetMessageFromConversation = (idConversation: string) =>
  axiosClient({
    url: `/message/${idConversation}`,
    method: "get",
  });

export const apiCreateMessage = (data: {
  content: string;
  IdConversation: string;
}) => axiosClient({ url: "/message", method: "post", data });
