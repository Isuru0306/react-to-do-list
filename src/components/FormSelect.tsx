import { useState, ChangeEvent, useEffect } from "react";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

const FormSelect = ({ value = "NOT_START", onChange }: Props) => {
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
        <option value="NOT_START">NOT_START</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>
    </div>
  );
};

export default FormSelect;
