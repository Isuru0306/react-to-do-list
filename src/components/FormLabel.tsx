interface Props {
  text?: string;
}

const FormLabel = ({ text }: Props) => {
  return <label className="form-label">{text}</label>;
};

export default FormLabel;
