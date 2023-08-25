import { Message, User } from "@/utils/type";
import { FC, memo } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "..";

interface ConversationChannel {
  messages: Message[];
  infoUser: User;
}

const Page: FC<ConversationChannel> = ({ messages, infoUser }) => {
  console.log(infoUser);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const createMessage = async () => {};
  console.log(messages);

  return (
    <div className="bg-main h-full w-screen flex flex-col">
      <div>
        <h1></h1>
      </div>
      <div className="text-xl">
        {messages.map((el) => (
          <div key={el._id} className="text-white">
            {el.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(createMessage)}>
        <InputField
          name="message"
          register={register}
          placeholder="Message...."
        />
      </form>
    </div>
  );
};

export default memo(Page);
