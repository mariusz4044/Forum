import { ReactNode } from "react";
import { useId } from "react";

interface FormInputProps {
  name: string;
}

export default function FormInput({ name }: FormInputProps) {
  const inputId = useId();

  return (
    <div className="flex flex-col my-2">
      <label htmlFor={inputId} className="label-input">
        {name}*
      </label>
      <input id={inputId} className="form-input" placeholder={name} required />
    </div>
  );
}
