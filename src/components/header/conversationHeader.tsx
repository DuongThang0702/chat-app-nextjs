import icon from "@/utils/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { FC, memo } from "react";

const Page: FC = ({}) => {
  return (
    <>
      <div
        className="flex justify-between text-white items-center bg-main 
      px-12 py-6 h-[6rem] border-b border-whiteOpacity"
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
          <div>
            <FontAwesomeIcon icon={icon.faUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Page);
