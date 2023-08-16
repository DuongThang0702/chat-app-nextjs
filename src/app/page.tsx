"use client";
import { Routes } from "@/utils/contants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push(`/${Routes.AUTH}/${Routes.LOGIN}`);
  }, []);
  return <div>Home Page</div>;
}
