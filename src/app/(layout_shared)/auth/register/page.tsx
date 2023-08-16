"use client";
import { apiregister } from "@/api";
import { Button, InputField } from "@/components";
import { Routes } from "@/utils/contants";
import { RegisterForm } from "@/utils/type";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Page: FC = ({}) => {
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    lastname: yup.string().required(),
    firstname: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data: RegisterForm) => {
    await apiregister(data)
      .then((rs: any) => console.log(rs))
      .catch((err: any) => console.log(err));
  };

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div className="bg-[#313338] w-[41rem] h-[62rem] rounded-xl">
        <div className="p-[3.2rem]">
          <h1 className="text-white opacity-70 text-[3rem] text-center">
            Create an account
          </h1>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex gap-y-12 flex-col my-12"
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
            <InputField
              label="FIRSTNAME"
              register={register}
              name="firstname"
              errors={errors?.firstname?.message}
            />
            <InputField
              label="LASTNAME"
              register={register}
              name="lastname"
              errors={errors?.lastname?.message}
            />
            <Button title="Register" submit />
            <Link className="text-[#2E70E2] text-xl" href={`${Routes.LOGIN}`}>
              Already have an account?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
