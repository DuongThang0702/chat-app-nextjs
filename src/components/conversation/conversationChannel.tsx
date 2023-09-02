"use client";
import { Message, User } from "@/utils/type";
import {
  Dispatch,
  FC,
  SetStateAction,
  memo,
  useContext,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { ChannelHeader, InputField, MessagesContainer } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";

import { apiCreateMessage } from "@/api";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { SocketContext } from "@/context";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ConversationChannel {
  idConvesation: string;
  update: Dispatch<SetStateAction<boolean>>;
}

const Page: FC<ConversationChannel> = ({ idConvesation, update }) => {
  const { register, handleSubmit, reset, setValue, formState } = useForm({
    defaultValues: { content: "" },
  });
  const [Messages, setMessages] = useState<Message[] | []>([]);
  const socket = useContext(SocketContext);
  const { messages, infoConversation } = useSelector(
    (state: RootState) => state.conversation
  );

  const createMessage = async (data: { content: string }) =>
    await apiCreateMessage({ ...data, IdConversation: idConvesation })
      .then((rs: AxiosResponse) => update((prev) => !prev))
      .catch((err: AxiosError) => {
        console.log(err);
        toast.error("Something went wrong!");
      });

  useEffect(() => {
    if (messages) setMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setValue("content", "");
      reset({ content: "" });
    }
  }, [formState.isSubmitSuccessful]);

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
      <ChannelHeader user={infoConversation as User} />
      <div className="w-full flex-none h-[5rem]"></div>
      {Messages && infoConversation && (
        <MessagesContainer messages={Messages} infoUser={infoConversation} />
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
