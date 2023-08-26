"use client";

import {
  ConversationChannel,
  ConversationSidebar,
  CreateConversation,
} from "@/components";
import { Message, User } from "@/utils/type";
import { FC, useState } from "react";

const Page: FC = ({}) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [message, setMessage] = useState<Message[] | null>(null);
  const [infoUser, setInfoUser] = useState<User | null>(null);
  return (
    <>
      <div className="relative flex w-full h-full">
        <div className="absolute top-0 bottom-0 left-0 right-0">
          <ConversationSidebar
            setInfoUser={setInfoUser}
            isShowModal={setIsShowModal}
            update={update}
            setMessage={setMessage}
          />
        </div>
        <div className="w-[36rem] flex-none"></div>
        {isShowModal && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-30">
            <CreateConversation
              isShowModal={setIsShowModal}
              update={setUpdate}
            />
          </div>
        )}
        {message !== null && infoUser && (
          <ConversationChannel messages={message} infoUser={infoUser} />
        )}
      </div>
    </>
  );
};

export default Page;
