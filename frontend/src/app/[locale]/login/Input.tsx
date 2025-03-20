import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  value?: string | number;
  updateValue?(value: unknown): void;
}

export const Input = ({
  label = "",
  id = "",
  value = "",
  updateValue = () => {},
  ...rest
}: InputProps) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => updateValue(event.target.value)}
        {...rest}
      />
    </>
  );
};
