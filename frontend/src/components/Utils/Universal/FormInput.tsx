import { useId } from "react";

interface FormInputProps {
  name: string;
  required?: boolean;
  defaultValue?: string | number;
  type?: "password" | "text" | "number";
  placeholder?: string;
  height?: number;
}

export function FormInputArea({ ...props }: FormInputProps) {
  const inputId = useId();

  return (
    <div className="flex flex-col my-2">
      <label htmlFor={inputId} className="label-input text-gray-300">
        {props.name}{" "}
        {props.required && <span className="required-input">Required</span>}
      </label>
      <textarea
        id={inputId}
        className={`form-input resize-none text-sm ${props.height && `h-${props.height}`}`}
        {...props}
      />
    </div>
  );
}

export function FormInput({ ...props }: FormInputProps) {
  const inputId = useId();

  return (
    <div className="flex flex-col my-2">
      <label htmlFor={inputId} className="label-input text-gray-300">
        {props.name}
        {/*{props.required && <span className="required-input">Required</span>}*/}
      </label>
      <input id={inputId} className="form-input text-sm" {...props} />
    </div>
  );
}
