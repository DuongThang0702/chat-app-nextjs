"use client";
import { AppDispatch, RootState } from "@/redux/store";
import { Routes } from "@/utils/contants";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { currentUser } from "@/redux/user/AsyncAction";
import {
  ConversationHeader,
  ConversationSidebar,
  CreateConversation,
} from "@/components";
import { ToastContainer } from "react-toastify";

export default function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  if (!isLoggedIn) {
    router.push(`/${Routes.AUTH}/${Routes.LOGIN}`);
  }

  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn) dispatch(currentUser());
    }, 800);
  }, [isLoggedIn, dispatch]);

  return (
    <>
      <div className="w-full h-screen overflow-y-hidden overflow-x-hidden bg-[#18191A]">
        <div className="fixed top-0 left-0 right-0 z-40">
          <ConversationHeader />
        </div>
        <div className="w-full h-[5.6rem]"></div>
        <div className="flex h-screen relative">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <ConversationSidebar isShowModal={setIsShowModal} update={update} />
          </div>
          <div className="w-[36rem] h-screen"></div>
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
