import { Message, User } from "@/utils/type";
import { FC, memo } from "react";
import { useForm } from "react-hook-form";
import { ChannelHeader, InputField } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";
import Image from "next/image";
import moment from "moment";

interface ConversationChannel {
  messages: Message[];
  infoUser: User;
}

const Page: FC<ConversationChannel> = ({ messages, infoUser }) => {
  const { register, handleSubmit } = useForm();
  const createMessage = async () => {};

  return (
    <div
      className="bg-main h-full w-screen text-xl
    text-white flex flex-col"
    >
      <ChannelHeader user={infoUser} />
      <div className="w-full flex-none h-[5rem]"></div>
      <div
        className="h-4/5 mt-12 px-6 text-2xl overflow-y-scroll relative
       box-border gap-y-8 flex flex-col-reverse"
      >
        {messages.map((el) => (
          <div
            key={el._id}
            className={`flex items-center gap-x-4 ${
              infoUser.email !== el.author.email
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {infoUser.email === el.author.email && (
              <div className="w-[3rem] h-[3rem] rounded-full">
                <Image
                  src={
                    el.author.avatar === null
                      ? "/avatarDefault.png"
                      : el.author.avatar
                  }
                  height={100}
                  width={100}
                  alt="avatar"
                />
              </div>
            )}
            <div
              className={`py-4 px-6 rounded-full ${
                infoUser.email !== el.author.email
                  ? "bg-blue-600"
                  : "bg-whiteOpacity"
              }`}
            >
              {el.content}
            </div>
            {infoUser.email === el.author.email && (
              <div className="opacity-60">
                {moment(el.createdAt).fromNow(true)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="px-12 bg-main w-full py-5 flex items-center border-t border-whiteOpacity">
        <form
          onSubmit={handleSubmit(createMessage)}
          className="flex items-center z-30 w-full gap-x-6"
        >
          <InputField
            name="message"
            register={register}
            placeholder="Aa"
            fullw
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
