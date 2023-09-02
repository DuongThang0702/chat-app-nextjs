"use client";
import { RootState } from "@/redux/store";
import icon from "@/utils/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { FC, Fragment, memo, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SubMenuHeader } from "..";
import { SocketContext } from "@/context";
import { Notify } from "@/utils/type";
import { apiGetNotifies } from "@/api";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const Page: FC = ({}) => {
  const socket = useContext(SocketContext);
  const { current } = useSelector((state: RootState) => state.user);
  const [isShowSubMenu, setIsShowSubMenu] = useState<boolean>(false);
  const [isShowNotify, setIsShowNotify] = useState<boolean>(false);
  const [notify, setNotify] = useState<Notify[] | []>([]);

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

  useEffect(() => {
    fetchNotifies();
  }, []);
  useEffect(() => {
    socket.on("onNotify", (data: Notify) =>
      setNotify((prev) => [data, ...prev])
    );
  }, []);
  // need method check isChecked notify
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
          <div>
            <FontAwesomeIcon icon={icon.faHouse} />
          </div>
          <div>
            <FontAwesomeIcon icon={icon.faUserGroup} />
          </div>
        </div>
        <div className="flex gap-x-11 text-3xl items-center">
          <div className="rounded-full bg-menu p-3 relative">
            <div className="opacity-75">
              <FontAwesomeIcon icon={icon.faBell} />
            </div>
            {current &&
              notify.length > 0 &&
              notify.map((el, index) => {
                return current._id === el.author._id ? (
                  <></>
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
              <div className="w-[5rem] h-[5rem] cursor-pointer rounded-full">
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
              <div className="w-[5rem] h-[5rem] cursor-pointer">
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
