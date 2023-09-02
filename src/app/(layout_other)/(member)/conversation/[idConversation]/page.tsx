"use client";

import { ConversationChannel } from "@/components";
import {
  getConversations,
  getMessageFromConversation,
} from "@/redux/conversation/AsyncAction";
import { AppDispatch } from "@/redux/store";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Page: FC = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const param = useParams();
  const [update, setUpdate] = useState<boolean>(false);
  const { idConversation } = param;

  useEffect(() => {
    if (idConversation)
      dispatch(getMessageFromConversation(idConversation.toString()));
  }, [idConversation]);

  useEffect(() => {
    dispatch(getConversations());
  }, [update]);

  return (
    <>
      {idConversation && (
        <ConversationChannel
          update={setUpdate}
          idConvesation={idConversation.toString()}
        />
      )}
    </>
  );
};

export default Page;
