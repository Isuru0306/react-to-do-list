import { ChangeEvent } from "react";

interface Props {
  placeholder?: string;
  type?: string;
  onChange?: (value: string) => void;
}

const FormInput = ({ type = "text", placeholder = "", onChange }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <input
      type={type}
      className="form-control"
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default FormInput;
