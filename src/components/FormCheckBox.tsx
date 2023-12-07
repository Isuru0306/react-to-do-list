interface Props {
  value?: string;
  status?: boolean;
  onChange?: (value: boolean) => void;
}

const FormCheckBox = ({
  status = false,
  value = "",
  onChange,
}: Readonly<Props>) => {
  const handle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };
  return (
    <div>
      <input
        className="form-check-input me-2"
        type="checkbox"
        value={value}
        defaultChecked={status}
        onChange={handle}
      />
    </div>
  );
};

export default FormCheckBox;
