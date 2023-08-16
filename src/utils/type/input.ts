import { UseFormRegister } from "react-hook-form";

export type InputField = {
  type?: string;
  name: string;
  register: UseFormRegister<any>;
  style?: string;
  fullw?: boolean;
  errors?: string;

  label?: string;
  styleLabel?: string;
};
