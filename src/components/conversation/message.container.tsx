import { Message, User } from "@/utils/type";
import { FC, memo } from "react";
import Image from "next/image";
import moment from "moment";
interface MessageContainer {
  messages: Message[];
  infoUser: User;
}

const Page: FC<MessageContainer> = ({ messages, infoUser }) => {
  return (
    <>
      <div
        className="h-[77%] mt-12 px-6 text-2xl overflow-y-scroll overflow-hidden relative
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
    </>
  );
};

export default memo(Page);
