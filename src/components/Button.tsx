interface Props {
  text: string;
  color: string;
  onClick?: () => void;
}

const Button = ({ text, color, onClick }: Props) => {
  return (
    <div className="">
      <button className={`btn ${color}`} type="button" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
