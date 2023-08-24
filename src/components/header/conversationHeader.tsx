"use client";
import { RootState } from "@/redux/store";
import icon from "@/utils/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { FC, memo, useState } from "react";
import { useSelector } from "react-redux";
import { SubMenuHeader } from "..";

const Page: FC = ({}) => {
  const { current } = useSelector((state: RootState) => state.user);
  const [isShowSubMenu, setIsShowSubMenu] = useState<boolean>(false);

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
          <div className="rounded-full bg-menu p-3">
            <span className="opacity-75">
              <FontAwesomeIcon icon={icon.faBell} />
            </span>
          </div>
          <>
            {current && current?.avatar !== null ? (
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
