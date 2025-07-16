import { ReactNode } from "react";
import { useId } from "react";

interface FormInputProps {
  name: string;
  required?: boolean;
}

export default function FormInput({ name, required = true }: FormInputProps) {
  const inputId = useId();

  return (
    <div className="flex flex-col my-2">
      <label htmlFor={inputId} className="label-input">
        {name} {required && <span className="required-input">Required</span>}
      </label>
      <input
        id={inputId}
        className="form-input"
        placeholder={name}
        required={required}
      />
    </div>
  );
}
