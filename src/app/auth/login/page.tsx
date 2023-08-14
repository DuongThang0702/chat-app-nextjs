"use client";
import { Button, InputField } from "@/app/components";
import { LoginForm } from "@/utility/type";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiLogin } from "@/api";
import { useRouter } from "next/navigation";
import { Routes } from "@/utility/contants";

const Page: FC = ({}) => {
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
      .then((rs) => {
        if (rs.status >= 100 && rs.status <= 399)
          router.push(`/${Routes.CONVERSTATION}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div className="bg-[#313338] w-[80rem] h-[50rem] rounded-xl">
        <div className="p-12">
          <div className="flex flex-col justify-center items-center">
            <span className="text-white text-[3rem] font-title tracking-wider">
              Welcome back!
            </span>
            <span className="text-white opacity-70 text-xl">
              We're so excited to see you again!
            </span>
          </div>
          <div className="w-2/3 mx-auto">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
