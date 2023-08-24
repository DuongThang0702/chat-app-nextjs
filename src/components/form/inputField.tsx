import { InputField } from "@/utils/type";
import { FC, memo } from "react";

const Page: FC<InputField> = ({
  type,
  name,
  register,
  style,
  fullw,
  label,
  styleLabel,
  errors,
  placeholder,
  textarea,
}) => {
  return textarea ? (
    <>
      <div className="flex flex-col">
        {label && (
          <label
            htmlFor={name}
            className={`${
              styleLabel ? styleLabel : " text-xl text-white opacity-75 mb-4"
            }`}
          >
            {label}
          </label>
        )}
        <textarea
          rows={5}
          cols={1}
          id={name}
          placeholder={placeholder}
          className={`${
            style
              ? style
              : "p-4 rounded-md text-2xl bg-black text-white font-semibold opacity-70 outline-none"
          } ${fullw ? "w-full" : ""}`}
          {...register(name)}
        ></textarea>
      </div>
    </>
  ) : (
    <div>
      <div className="flex flex-col">
        {label && (
          <label
            htmlFor={name}
            className={`${
              styleLabel ? styleLabel : " text-xl text-white opacity-75 mb-4"
            }`}
          >
            {label}
          </label>
        )}
        <input
          id={name}
          placeholder={placeholder}
          className={`${
            style
              ? style
              : "p-4 rounded-md text-2xl bg-black text-white font-semibold opacity-70 outline-none"
          } ${fullw ? "w-full" : ""}`}
          type={type ? type : "text"}
          {...register(name)}
        />
        {errors && <div className="text-base text-red-700">{errors}</div>}
      </div>
    </div>
  );
};

export default memo(Page);
