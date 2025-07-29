import { useId } from "react";

interface FormInputProps {
  name: string;
  required?: boolean;
  defaultValue?: string;
  type?: "password" | "text";
}

export default function FormInput({ ...props }: FormInputProps) {
  const inputId = useId();

  return (
    <div className="flex flex-col my-2">
      <label htmlFor={inputId} className="label-input text-gray-400">
        {props.name}{" "}
        {props.required && <span className="required-input">Required</span>}
      </label>
      <input id={inputId} className="form-input" {...props} />
    </div>
  );
}
