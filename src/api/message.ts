import axiosClient from "@/utils/config";

export const apiGetMessageFromConversation = (idConversation: string) =>
  axiosClient({
    url: `/message/${idConversation}`,
    method: "get",
  });
