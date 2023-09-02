"use client";
import { AppDispatch, RootState } from "@/redux/store";
import icon from "@/utils/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { FC, Fragment, memo, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubMenuHeader } from "..";
import { SocketContext } from "@/context";
import { Notify } from "@/utils/type";
import { apiGetNotifies, apiUpdateStatus } from "@/api";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { currentUser } from "@/redux/user/AsyncAction";
import { useRouter } from "next/navigation";
import { Routes } from "@/utils/contants";

const Page: FC = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const { current, isLoggedIn } = useSelector((state: RootState) => state.user);
  const [isShowSubMenu, setIsShowSubMenu] = useState<boolean>(false);
  const [isShowNotify, setIsShowNotify] = useState<boolean>(false);
  const [notify, setNotify] = useState<Notify[] | []>([]);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn) dispatch(currentUser());
    }, 300);
  }, [isLoggedIn, dispatch]);

  const fetchNotifies = async () => {
    await apiGetNotifies()
      .then((rs: AxiosResponse) => {
        if (rs.status >= 100 && rs.status <= 399) setNotify(rs.data);
        if (rs.status >= 400 && rs.status <= 599) {
          toast.error("Something went wrong!");
          console.log(rs);
        }
      })
      .catch((err: AxiosError) => {
        toast.error("Something went wrong!");
        console.log(err);
      });
  };

  const handleCheckNotify = async (status: boolean, idConversation: string) => {
    await apiUpdateStatus(status, idConversation)
      .then((rs: AxiosResponse) => {
        if (rs.status >= 100 && rs.status <= 399) {
          setUpdate((prev) => !prev);
          router.push(`/${Routes.CONVERSATION}/${idConversation}`);
        }
        if (rs.status >= 400 && rs.status <= 599) {
          toast.error("Some thing went wrong!");
          console.log(rs);
        }
      })
      .catch((err: AxiosError) => console.log(err));
  };
  useEffect(() => {
    const handleShowOption = (e: MouseEvent) => {
      const notify = document.getElementById("notify");
      const options = document.getElementById("options");
      if (!notify?.contains(e.target as Node)) setIsShowNotify(false);
      if (!options?.contains(e.target as Node)) setIsShowSubMenu(false);
    };
    document.addEventListener("click", handleShowOption);
    return () => {
      document.removeEventListener("click", handleShowOption);
    };
  }, []);
  useEffect(() => {
    fetchNotifies();
  }, [update]);
  useEffect(() => {
    socket.on("onNotify", (data: Notify) =>
      setNotify((prev) => [data, ...prev])
    );
  }, []);

  return (
    <>
      <div
        className="flex justify-between text-white items-center bg-main 
      px-12 py-6 h-[6rem] border-b border-whiteOpacity relative"
      >
        <div className="w-[4.8rem] h-[4.8rem]">
          <Image
            src={`/logo.png`}
            height={100}
            width={100}
            alt="logo"
            className="rounded-full"
          />
        </div>
        <div className="flex gap-x-20 text-3xl opacity-60">
          <FontAwesomeIcon icon={icon.faHouse} className="block" />
          <FontAwesomeIcon icon={icon.faUserGroup} className="block" />
        </div>
        <div className="flex gap-x-11 text-3xl items-center">
          <div className="rounded-full bg-menu p-3 relative">
            <div
              className="opacity-75 relative cursor-pointer"
              id="notify"
              onClick={() => setIsShowNotify(true)}
            >
              <FontAwesomeIcon icon={icon.faBell} />
              {isShowNotify && (
                <div className="absolute top-[4.5rem] right-[-10rem] px-2 py-6 flex items-start flex-col w-[36rem] bg-main rounded-xl gap-y-4">
                  {notify.map((el) => (
                    <div
                      key={el._id}
                      className="px-2 py-4 flex hover:bg-whiteOpacity"
                      onClick={() => handleCheckNotify(true, el.idConversation)}
                    >
                      <div className="w-[8rem] h-[8rem] rounded-full">
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
                      <div className="flex items-center">
                        <div className="font-bold text-2xl">
                          <span>
                            {el.author.lastname} {el.author.firstname}
                          </span>{" "}
                          <span className="font-light">
                            gửi cho bạn một tin nhắn: {el.content}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {isLoggedIn &&
              current &&
              notify.length > 0 &&
              notify.map((el, index) => {
                return current._id === el.author._id ? (
                  <Fragment key={index}></Fragment>
                ) : (
                  <Fragment key={index}>
                    <div className="text-white bg-red-700 absolute p-1 top-[-1rem] right-[-1rem] rounded-full">
                      {notify.length}
                    </div>
                  </Fragment>
                );
              })}
          </div>
          <>
            {current && current.avatar !== null ? (
              <div
                className="w-[5rem] h-[5rem] cursor-pointer rounded-full"
                id="options"
              >
                <Image
                  onClick={() => setIsShowSubMenu((prev) => !prev)}
                  src={current?.avatar}
                  height={100}
                  width={100}
                  alt="avatar"
                />
                {isShowSubMenu && (
                  <SubMenuHeader
                    avatar={current?.avatar}
                    lastname={current?.lastname}
                    firstname={current?.firstname}
                  />
                )}
              </div>
            ) : (
              <div className="w-[5rem] h-[5rem] cursor-pointer" id="options">
                <Image
                  onClick={() => setIsShowSubMenu((prev) => !prev)}
                  src={`/avatarDefault.png`}
                  height={100}
                  width={100}
                  alt="avatar"
                />
                {isShowSubMenu && (
                  <SubMenuHeader
                    lastname={current?.lastname}
                    firstname={current?.firstname}
                  />
                )}
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default memo(Page);
