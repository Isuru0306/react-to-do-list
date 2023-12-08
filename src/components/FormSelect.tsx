import { useState, ChangeEvent, useEffect } from "react";

interface Props {
  value?: string;
  options?: string[];
  onChange?: (value: string) => void;
}

const FormSelect = ({ value = "NOT_START", onChange, options }: Props) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  return (
    <div>
      <select
        className="form-select"
        id="selectOption"
        name="selectOption"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        {options?.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
