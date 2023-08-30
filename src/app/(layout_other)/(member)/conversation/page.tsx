"use client";

import {
  ConversationChannel,
  ConversationSidebar,
  CreateConversation,
} from "@/components";
import {
  getConversations,
  getMessageFromConversation,
} from "@/redux/conversation/AsyncAction";
import { AppDispatch } from "@/redux/store";
import { User } from "@/utils/type";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Page: FC = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [infoUser, setInfoUser] = useState<User | null>(null);
  const [idConversation, setIdConversation] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getConversations());
  }, [update]);

  useEffect(() => {
    if (idConversation) dispatch(getMessageFromConversation(idConversation));
  }, [idConversation]);
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
            update={setUpdate}
            idConvesation={idConversation}
            infoUser={infoUser}
          />
        )}
      </div>
    </>
  );
};

export default Page;
