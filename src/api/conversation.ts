import axiosClient from "@/utils/config";
import { CreateConversation } from "@/utils/type";

export const apiGetConversation = () =>
  axiosClient({ url: "/conversation", method: "get" });

export const apiCreateConversation = (data: CreateConversation) =>
  axiosClient({ url: "/conversation", method: "post", data });

export const apiGetConversationById = (id: string) =>
  axiosClient({ url: `/conversation/${id}`, method: "get" });
