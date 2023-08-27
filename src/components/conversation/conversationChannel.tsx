"use client";
import { Message, User } from "@/utils/type";
import { FC, memo, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ChannelHeader, InputField, MessagesContainer } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";

import { apiCreateMessage, apiGetMessageFromConversation } from "@/api";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { SocketContext } from "@/context";

interface ConversationChannel {
  idConvesation: string;
  infoUser: User;
}

const Page: FC<ConversationChannel> = ({ idConvesation, infoUser }) => {
  const { register, handleSubmit, reset, setValue, formState } = useForm({
    defaultValues: { content: "" },
  });
  const [messages, setMessages] = useState<Message[] | []>([]);
  const socket = useContext(SocketContext);

  const fetchMessageFromConversation = async (idConversation: string) => {
    await apiGetMessageFromConversation(idConversation)
      .then((rs: AxiosResponse) => {
        if (rs.status >= 100 && rs.status <= 399) setMessages(rs.data);
        if (rs.status >= 400 && rs.status <= 499) {
          console.log(rs);
          toast.error(rs.data.message);
        }
        if (rs.status >= 500 && rs.status <= 599) {
          console.log(rs);
          toast.error("Something went wrong");
        }
      })
      .catch((err: AxiosError) => {
        toast.error("Something went wrong!");
        console.log(err);
      });
  };

  const createMessage = async (data: { content: string }) => {
    await apiCreateMessage({ ...data, IdConversation: idConvesation })
      .then((rs: AxiosResponse) => {
        console.log(rs);
      })
      .catch((err: AxiosError) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setValue("content", "");
      reset({ content: "" });
    }
  }, [formState.isSubmitSuccessful]);

  useEffect(() => {
    fetchMessageFromConversation(idConvesation);
  }, [idConvesation]);

  useEffect(() => {
    socket.on("connected", () => console.log("connected"));
    socket.on("onMessage", (msg: Message) => {
      setMessages((prev) => [msg, ...prev]);
    });
    return () => {
      socket.off("connected");
      socket.off("onMessage");
    };
  }, []);

  return (
    <div
      className="bg-main h-full w-screen text-xl
    text-white flex flex-col"
    >
      <ChannelHeader user={infoUser} />
      <div className="w-full flex-none h-[5rem]"></div>
      {messages && infoUser && (
        <MessagesContainer messages={messages} infoUser={infoUser} />
      )}
      <div className="px-12 mt-8 bg-main w-full py-5 flex items-center border-t border-whiteOpacity">
        <form
          onSubmit={handleSubmit(createMessage)}
          className="flex items-center z-30 w-full gap-x-6"
        >
          <InputField
            name="content"
            register={register}
            placeholder="Aa"
            fullw
            validate={{ required: true }}
            style="bg-whiteOpacity w-full rounded-full block py-4 px-6 text-xl focus:outline-0"
          />
          <button type="submit">
            <FontAwesomeIcon
              icon={icon.faPaperPlane}
              className="text-2xl text-blue-500"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(Page);
