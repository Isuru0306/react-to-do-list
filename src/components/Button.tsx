interface Props {
  text: string;
  color: string;
  onClick: () => void;
}

const Button = ({ text, color, onClick }: Props) => {
  return (
    <div className="d-grid gap-2 col-6 mx-auto">
      <button className={`btn ${color}`} type="button" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
