"use client";
import { FC, memo } from "react";
import Image from "next/image";
import { apiLogout } from "@/api";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logout } from "@/redux/user";

interface SubmenuHeader {
  avatar?: string;
  lastname: string;
  firstname: string;
}

const Page: FC<SubmenuHeader> = ({ avatar, lastname, firstname }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = async () =>
    await apiLogout()
      .then((rs: AxiosResponse) => {
        if (rs.status >= 100 && rs.status <= 399)
          setTimeout(() => dispatch(logout()), 800);

        if (rs.status >= 400 && rs.status <= 499) toast.error(rs.data.message);

        if (rs.status >= 500 && rs.status <= 599) {
          console.log(rs);
          toast.error("Something went wrong");
        }
      })
      .catch((err: AxiosError) => {
        toast.error("Something went wrong!");
        console.log(err);
      });

  return (
    <>
      <div
        className="bg-main absolute top-[6rem] w-[28rem] right-[1rem]
        p-12 rounded-b-xl flex flex-col items-start justify-center gap-y-12"
      >
        <div className="flex w-full items-center border-b">
          <div className="w-[6rem] h-[6rem]">
            <Image
              src={avatar ? avatar : "/avatarDefault.png"}
              height={100}
              width={100}
              alt="avatar"
            />
          </div>
          <div>
            <h1>
              {lastname} {firstname}
            </h1>
          </div>
        </div>
        <div>Profile</div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default memo(Page);
