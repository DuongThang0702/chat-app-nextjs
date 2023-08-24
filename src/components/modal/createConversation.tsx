import { Dispatch, FC, SetStateAction, memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CreateConversation } from "@/utils/type";
import { Button, InputField } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "@/utils/icon";
import { apiCreateConversation } from "@/api/conversation";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

type CreateConversationProps = {
  isShowModal: Dispatch<SetStateAction<boolean>>;
  update: Dispatch<SetStateAction<boolean>>;
};

const Page: FC<CreateConversationProps> = ({ isShowModal, update }) => {
  const dispatch = useDispatch<AppDispatch>();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    message: yup.string().required(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateConversation>({
    resolver: yupResolver(schema),
  });

  const handleCreateConversation = async (data: CreateConversation) => {
    await apiCreateConversation(data)
      .then((rs: AxiosResponse) => {
        if (rs.status >= 100 && rs.status <= 399) {
          toast.success(rs.data.message);
          isShowModal((prev) => !prev);
          update((prev) => !prev);
        }
        if (rs.status >= 400 && rs.status <= 499) toast.error(rs.data.message);
        if (rs.status >= 500 && rs.status <= 599)
          toast.error("Something went wrong");
      })
      .catch((err: AxiosError) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <>
      <div className="bg-model h-screen w-screen flex items-center text-white">
        <div className="bg-main h-1/3 w-1/3 m-auto p-8 rounded-xl">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold mb-8">Create Conversation</h1>
            <FontAwesomeIcon
              onClick={() => isShowModal((prev) => !prev)}
              icon={icon.faXmark}
              className="text-4xl cursor-pointer"
            />
          </div>
          <form
            onSubmit={handleSubmit(handleCreateConversation)}
            className="flex flex-col gap-y-8"
          >
            <InputField
              name="email"
              register={register}
              errors={errors?.email?.message}
              placeholder="Recipient"
              style="bg-whiteOpacity p-4 rounded-xl"
            />

            <InputField
              name="message"
              register={register}
              errors={errors?.message?.message}
              placeholder="Message"
              textarea
              style="bg-whiteOpacity p-4 rounded-xl"
            />
            <Button title="Submit" submit />
          </form>
        </div>
      </div>
    </>
  );
};

export default memo(Page);
