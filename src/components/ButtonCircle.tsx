import Icon from "./Icon";

interface Props {
  title?:string;
  icon?: string;
  color?: string;
  onClick?: () => void;
}

const Button = ({ title, icon, color, onClick }: Props) => {
  return (
    <div className="">
      <button
        title={title}
        className={`btn ${color} mx-0 p-1 rounded-circle btn-sm focus-outline-none focus-ring-2 focus-ring-offset-2 focus-ring-primary`}
        type="button"
        onClick={onClick}
      >
        <Icon icon={icon} />
      </button>
    </div>
  );
};

export default Button;
