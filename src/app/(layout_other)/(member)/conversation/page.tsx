"use client";

import {
  ConversationChannel,
  ConversationSidebar,
  CreateConversation,
} from "@/components";
import { User } from "@/utils/type";
import { FC, useState } from "react";

const Page: FC = ({}) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [infoUser, setInfoUser] = useState<User | null>(null);
  const [idConversation, setIdConversation] = useState<string | null>(null);
  return (
    <>
      <div className="relative flex w-full h-full">
        <div className="absolute top-0 bottom-0 left-0 right-0">
          <ConversationSidebar
            setInfoUser={setInfoUser}
            isShowModal={setIsShowModal}
            update={update}
            setIdConversation={setIdConversation}
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
        {idConversation && infoUser && (
          <ConversationChannel
            idConvesation={idConversation}
            infoUser={infoUser}
          />
        )}
      </div>
    </>
  );
};

export default Page;
