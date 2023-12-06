import Icon from "./Icon";

interface Props {
  icon: string;
  color: string;
  onClick: () => void;
}

const Button = ({ icon, color, onClick }: Props) => {
  return (
    <div className="flex items-center justify-center space-x-5">
      <button
        className={`btn ${color} p-1 rounded-circle btn-sm focus-outline-none focus-ring-2 focus-ring-offset-2 focus-ring-primary`}
        type="button"
        onClick={onClick}
      >
        <Icon icon={icon} />
      </button>
    </div>
  );
};

export default Button;
