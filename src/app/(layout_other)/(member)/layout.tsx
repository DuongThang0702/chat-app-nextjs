"use client";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  ConversationHeader,
  ConversationSidebar,
  CreateConversation,
} from "@/components";
import { ToastContainer } from "react-toastify";
import { getConversations } from "@/redux/conversation/AsyncAction";
import { useRouter } from "next/navigation";
import { Routes } from "@/utils/contants";

export default function CheckLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { current, isLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (!current && !isLoggedIn)
      return router.push(`/${Routes.AUTH}/${Routes.LOGIN}`);
  }, [current, isLoggedIn]);
  useEffect(() => {
    dispatch(getConversations());
  }, [update]);

  return (
    <>
      <div className="w-full h-screen overflow-hidden flex-none bg-[#18191A]">
        <div className="fixed top-0 left-0 right-0 z-40">
          <ConversationHeader />
        </div>
        <div className="w-full h-[6rem]"></div>
        <div className="relative flex w-full h-full">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <ConversationSidebar isShowModal={setIsShowModal} update={update} />
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
          {children}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
}
