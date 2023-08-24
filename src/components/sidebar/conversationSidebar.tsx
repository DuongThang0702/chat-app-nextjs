"use client";
import { Dispatch, FC, SetStateAction, memo, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";
import { apiGetConversation } from "@/api/conversation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useForm } from "react-hook-form";
import { InputField } from "@/components";
import { Conversation, findUserFromInput } from "@/utils/type";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Routes } from "@/utils/contants";

type conversationSidebar = {
  isShowModal: Dispatch<SetStateAction<boolean>>;
  update: boolean;
};

const Page: FC<conversationSidebar> = ({ isShowModal, update }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<findUserFromInput>();
  const [conversation, setConversation] =
    useState<Partial<Conversation> | null>();

  const fetchGetConversation = async () => {
    await apiGetConversation()
      .then((rs: AxiosResponse) => {
        if (rs.status >= 100 && rs.status <= 399) {
          setConversation(rs.data);
        }
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
  const handleSearchName = async () => {};

  useEffect(() => {
    fetchGetConversation();
  }, [update]);
  return (
    <div className="w-full relative">
      <div className="text-white w-[36rem] bg-main p-6 mt-2 h-screen">
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
        <div className="mt-8">Hello</div>
      </div>
    </div>
  );
};

export default memo(Page);
