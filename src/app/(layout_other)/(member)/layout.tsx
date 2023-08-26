"use client";
import { AppDispatch, RootState } from "@/redux/store";
import { Routes } from "@/utils/contants";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { currentUser } from "@/redux/user/AsyncAction";
import { ConversationHeader } from "@/components";
import { ToastContainer } from "react-toastify";

export default function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn) dispatch(currentUser());
      if (!isLoggedIn) router.push(`/${Routes.AUTH}/${Routes.LOGIN}`);
    }, 800);
  }, [isLoggedIn, dispatch]);

  return (
    <>
      <div className="w-full h-screen overflow-hidden flex-none bg-[#18191A]">
        <div className="fixed top-0 left-0 right-0 z-40">
          <ConversationHeader />
        </div>
        <div className="w-full h-[6rem]"></div>
        {children}
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
