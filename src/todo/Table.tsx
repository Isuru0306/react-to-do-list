import { useSelector, useDispatch } from "react-redux";
import ButtonCircle from "../components/ButtonCircle";
import { RootState } from "../state/store";
import { updateToDo, deleteToDo } from "../state/ToDoListSlice";
interface Props {
  headers?: string[];
  onClick?: (item: any, action: string) => void;
}

const Table = ({ headers, onClick }: Props) => {
  const dispatch = useDispatch();
  const toDoList = useSelector((state: RootState) => state.toDo);
  const lists = toDoList.task_list;

  const getId = (item: any, action: string) => {
    if (action === "edit") {
      if (onClick) {
        onClick(item, action);
      }
    } else if (action === "complete") {
      const updatedItem = { ...item, status: "COMPLETED" };
      dispatch(updateToDo(updatedItem));
    } else {
      dispatch(deleteToDo(item));
    }
  };

  return (
    <table className="table mb-4">
      <thead>
        <tr className="text-center">
          {headers?.map((columnName, index) => (
            <th scope="col" key={columnName}>
              {columnName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lists?.length === 0 && (
          <tr>
            <th colSpan={7} className="text-center">
              <p>No records available</p>
            </th>
          </tr>
        )}
        {lists?.map((item, index) => (
          <tr className="text-center" key={index}>
            <th scope="row">{item.id}</th>
            <td>{item.to_do_desc}</td>
            <td>{item.status}</td>
            <td>{item.username}</td>
            <td>{item.dueDate}</td>
            <td>{item.dueTime}</td>
            <td>
              <div className="row">
                <div className="col-4 text-center">
                  <ButtonCircle
                    title="Edit"
                    icon="edit"
                    color="btn-primary"
                    onClick={() => getId(item, "edit")}
                  />
                </div>
                <div className="col-4 text-center">
                  <ButtonCircle
                    title="Complete"
                    icon="complete"
                    color="btn-primary"
                    onClick={() => getId(item, "complete")}
                  />
                </div>
                <div className="col-4 text-center">
                  <ButtonCircle
                    title="Delete"
                    icon="delete"
                    color="btn-danger"
                    onClick={() => getId(item.id, "delete")}
                  />
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
