import { button } from "@/utils/type";
import { FC, memo } from "react";

const Page: FC<button> = ({ title, style, submit, fullw }) => {
  return (
    <>
      <button
        type={submit ? "submit" : "button"}
        className={`${
          style
            ? style
            : "bg-[#4752C4] px-4 py-6 text-white text-2xl font-semibold"
        } ${fullw ? "w-full" : ""}`}
      >
        {title}
      </button>
    </>
  );
};

export default memo(Page);
