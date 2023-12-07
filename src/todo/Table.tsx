import { useSelector } from "react-redux";
import ButtonCircle from "../components/ButtonCircle";
import { RootState } from "../state/store";

interface Props {
  headers?: string[];
}

const Table = ({ headers }: Props) => {
  const toDoList = useSelector((state: RootState) => state.toDo);
  const lists = toDoList.task_list;
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
                  <ButtonCircle title="Edit" icon="edit" color="btn-primary" />
                </div>
                <div className="col-4 text-center">
                  <ButtonCircle
                    title="Complete"
                    icon="complete"
                    color="btn-primary"
                  />
                </div>
                <div className="col-4 text-center">
                  <ButtonCircle
                    title="Delete"
                    icon="delete"
                    color="btn-danger"
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
