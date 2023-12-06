import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

interface Props {
  icon?: string;
}

const Icon = ({ icon }: Props) => {
  let selectedIcon;

  switch (icon) {
    case "view":
      selectedIcon = faEye;
      break;
    case "edit":
      selectedIcon = faEdit;
      break;
    case "delete":
      selectedIcon = faTrash;
      break;
    case "complete":
      selectedIcon = faCheck;
      break;
    default:
      selectedIcon = faEye;
  }
  return <FontAwesomeIcon icon={selectedIcon} size="1x" />;
};

export default Icon;
