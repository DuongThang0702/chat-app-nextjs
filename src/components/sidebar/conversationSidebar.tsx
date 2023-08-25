"use client";
import {
  Dispatch,
  FC,
  SetStateAction,
  memo,
  useEffect,
  useState,
  Fragment,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";
import { useForm } from "react-hook-form";
import { InputField } from "..";
import { Conversation, Message, User, findUserFromInput } from "@/utils/type";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { apiGetMessageFromConversation, apiGetConversation } from "@/api";
import moment from "moment";

type conversationSidebar = {
  update: boolean;
  setInfoUser: Dispatch<SetStateAction<User | null>>;
  setMessage: Dispatch<SetStateAction<Message[] | null>>;
  isShowModal: Dispatch<SetStateAction<boolean>>;
};

const Page: FC<conversationSidebar> = ({
  update,
  isShowModal,
  setMessage,
  setInfoUser,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<findUserFromInput>();
  const [conversation, setConversation] = useState<Conversation[] | null>(null);
  const [selectConversation, setSelectConversation] = useState<string | null>(
    null
  );
  const { current } = useSelector((state: RootState) => state.user);

  const fetchGetConversation = async () => {
    await apiGetConversation()
      .then((rs: AxiosResponse) => {
        if (rs.status >= 100 && rs.status <= 399) setConversation(rs.data);
        if (rs.status >= 400 && rs.status <= 499) toast.error(rs.data.message);
        if (rs.status >= 500 && rs.status <= 599) {
          console.log(rs);
          toast.error("Something went wrong");
        }
      })
      .catch((err: AxiosError) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };

  const fetchMessageFromConversation = async (idConversation: string) => {
    await apiGetMessageFromConversation(idConversation)
      .then((rs: AxiosResponse) => {
        if (rs.status >= 100 && rs.status <= 399) setMessage(rs.data);
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

  const handleSearchName = async () => {};

  useEffect(() => {
    if (selectConversation) fetchMessageFromConversation(selectConversation);
  }, [selectConversation]);

  useEffect(() => {
    fetchGetConversation();
  }, [update]);

  return (
    <div className="w-full relative h-screen overflow-y-hidden">
      <div className="text-white w-[36rem] bg-main p-6 mt-2 h-screen overflow-y-scroll">
        <div className="w-full`">
          <div className="flex text-3xl justify-between items-center">
            <h1 className="font-bold text-4xl">Chat</h1>
            <div
              onClick={() => isShowModal((prev) => !prev)}
              className="cursor-pointer bg-whiteOpacity p-4 text-center rounded-full hover:bg-whiteOpacityHover"
            >
              <FontAwesomeIcon icon={icon.faPenToSquare} />
            </div>
          </div>
          <form onSubmit={handleSubmit(handleSearchName)}>
            <InputField
              name="findUser"
              register={register}
              errors={errors?.email?.message}
              fullw
              style="bg-whiteOpacity mt-8 p-4 rounded-full text-xl"
              placeholder="Search Something..."
            />
          </form>
        </div>
        <div className="mt-8">
          {current &&
            conversation &&
            conversation.length > 0 &&
            conversation.map((el) =>
              current.email !== el.creator.email ? (
                <Fragment key={el._id}>
                  <div
                    onClick={() => {
                      setInfoUser(el.creator);
                      setSelectConversation(el._id);
                    }}
                    className="flex items-center cursor-pointer hover:bg-whiteOpacityHover gap-x-4"
                  >
                    <div className="w-[5.6rem] h-[5.6rem] rounded-xl">
                      <Image
                        src={
                          el.recipient.avatar === null
                            ? "/avatarDefault.png"
                            : el.recipient.avatar
                        }
                        height={100}
                        width={100}
                        alt="avatar"
                      />
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <h1 className="text-xl font-semibold">
                        {el.creator.firstname} {el.creator.lastname}
                      </h1>
                      <span className="opacity-70 text-base">
                        {el.lastMessage.author !== current._id ? (
                          <>
                            {el.creator.lastname}: {el.lastMessage.content} *{" "}
                            {moment(el.lastMessage.updatedAt).format("LT")}
                          </>
                        ) : (
                          <>
                            You: {el.lastMessage} *{" "}
                            {moment(el.createdAt).format("LT")}
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <Fragment key={el._id}>
                  <div
                    onClick={() => {
                      setInfoUser(el.recipient);
                      setSelectConversation(el._id);
                    }}
                    className="flex items-center cursor-pointer hover:bg-whiteOpacityHover gap-x-4"
                  >
                    <div className="w-[5.6rem] h-[5.6rem] rounded-xl">
                      <Image
                        src={
                          el.creator.avatar === null
                            ? "/avatarDefault.png"
                            : el.creator.avatar
                        }
                        height={100}
                        width={100}
                        alt="avatar"
                      />
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <h1 className="text-xl font-semibold">
                        {el.recipient.firstname} {el.recipient.lastname}
                      </h1>
                      <span className="opacity-70 text-base">
                        {el.lastMessage.author !== current._id ? (
                          <>
                            {el.recipient.lastname}: {el.lastMessage.content} *{" "}
                            {moment(el.lastMessage.updatedAt).format("LT")}
                          </>
                        ) : (
                          <>
                            You: {el.lastMessage} *{" "}
                            {moment(el.createdAt).format("LT")}
                          </>
                        )}
                        {/* {el.lastMessage} * {moment(el.createdAt).format("LT")} */}
                      </span>
                    </div>
                  </div>
                </Fragment>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default memo(Page);
