import { User } from "@/utils/type";
import { FC, memo } from "react";
import Image from "next/image";

interface channelHeader {
  user: User;
}

const Page: FC<channelHeader> = ({ user }) => {
  return (
    <>
      <div className="bg-main fixed border-b border-whiteOpacity pb-2 z-20 left-[36rem] right-0">
        <div className="flex items-center gap-x-4">
          <Image
            src={user.avatar === null ? "/avatarDefault.png" : user.avatar}
            width={100}
            height={100}
            alt="avatar"
            className="block w-[5rem] h-[5rem] rounded-full"
          />
          <h1 className="text-2xl font-bold">
            {user.firstname} {user.lastname}
          </h1>
        </div>
      </div>
    </>
  );
};

export default memo(Page);
