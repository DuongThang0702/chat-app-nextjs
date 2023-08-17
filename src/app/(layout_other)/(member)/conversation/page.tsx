"use client";
import { AppDispatch, RootState } from "@/redux/store";
import { Routes } from "@/utils/contants";
import { useRouter } from "next/navigation";
import { FC, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page: FC = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, current } = useSelector((state: RootState) => state.user);

  if (!isLoggedIn && !current) router.push(`/${Routes.AUTH}/${Routes.LOGIN}`);
  useEffect(() => {}, []);

  return <>Converstation</>;
};

export default memo(Page);
