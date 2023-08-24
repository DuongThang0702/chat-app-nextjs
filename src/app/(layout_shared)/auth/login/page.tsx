"use client";
import { Button, InputField } from "@/components";
import { LoginForm } from "@/utils/type";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiLogin } from "@/api";
import { useRouter } from "next/navigation";
import { Routes } from "@/utils/contants";
import Link from "next/link";
import { toast } from "react-toastify";
import { AxiosResponse, AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/user";

const Page: FC = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data: LoginForm) => {
    await apiLogin(data)
      .then((rs: AxiosResponse) => {
        if (rs.status >= 100 && rs.status <= 399) {
          dispatch(
            login({ isLoggedIn: true, accessToken: rs.data.accessToken })
          );
          router.push(`/${Routes.CONVERSATION}`);
        }
        if (rs.status >= 400 && rs.status <= 599) toast.error(rs.data.message);
      })

      .catch((err: AxiosError) => {
        console.log(err);
        toast.error("Somthing went wrong!");
      });
  };

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div className="bg-[#313338] w-[41rem] h-[50rem] rounded-xl">
        <div className="p-[3.2rem]">
          <div className="flex flex-col justify-center items-center">
            <span className="text-white text-[3rem] font-title tracking-wider">
              Welcome back!
            </span>
            <span className="text-white opacity-70 text-xl">
              We're so excited to see you again!
            </span>
          </div>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col gap-y-12 mt-8"
          >
            <InputField
              label="EMAIL"
              register={register}
              name="email"
              errors={errors?.email?.message}
            />
            <InputField
              type="password"
              label="PASSWORD"
              register={register}
              name="password"
              errors={errors?.password?.message}
            />
            <Button title="Log in" submit />
          </form>
          <div className="text-white mt-4 text-xl">
            <span className=" opacity-60">Need an account?</span>{" "}
            <Link
              className="text-[#2E70E2] opacity-100"
              href={`${Routes.REGISTER}`}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
