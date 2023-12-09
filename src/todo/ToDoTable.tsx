import { useSelector, useDispatch } from "react-redux";
import ButtonCircle from "../components/ButtonCircle";
import { RootState } from "../state/store";
import { updateToDo, deleteToDo, createToDo } from "../state/ToDoListSlice";
import { search, removeDataInLocal, storeDataInLocal } from "../utils/Helper";

interface Props {
  headers?: string[];
  searchValue?: any;
  onClick?: (item: any, action: string) => void;
}

const Table = ({ headers, onClick, searchValue }: Props) => {
  const dispatch = useDispatch();
  const toDoList = useSelector((state: RootState) => state.toDo);
  let lists = toDoList.task_list;

  (() => {
    if (localStorage.getItem("dataList") !== null) {
      const data = localStorage.getItem("dataList");
      if (data !== null) {
        let localData = JSON.parse(data);
        if (Array.isArray(localData)) {
          if (lists !== null && lists !== undefined && lists.length !== 0) {
            lists.forEach((task: any) => {
              let id = localData.find((temp: any) => {
                if (task.id === temp.id) {
                  return task.id;
                } else {
                  return null;
                }
              });

              if (id === null) {
                dispatch(createToDo(task));
              }
            });
          } else {
            localData.forEach((temp: any) => {
              dispatch(createToDo(temp));
            });
          }
        }
      }
    }
  })();

  (() => {
    if (searchValue.filter === "All Task") {
      /***
       * TO DO
       * */
    } else if (searchValue.filter === "Not Started Task") {
      lists = search("status", "NOT_START", lists);
    } else if (searchValue.filter === "In Progress Task") {
      lists = search("status", "IN_PROGRESS", lists);
    } else if (searchValue.filter === "Completed Task") {
      lists = search("status", "COMPLETED", lists);
    }
  })();

  const handleRowDoubleClick = (item: any) => {
    let obj = { ...item };

    if (obj?.priority === "") {
      obj.priority = "table-primary";
    } else {
      obj.priority = "";
    }

    dispatch(updateToDo(obj));
    storeDataInLocal(obj);
  };

  const getId = (item: any, action: string) => {
    if (action === "edit") {
      if (onClick) {
        onClick(item, action);
      }
    } else if (action === "complete") {
      const updatedItem = { ...item, status: "COMPLETED" };
      dispatch(updateToDo(updatedItem));
      storeDataInLocal(updatedItem);
    } else {
      dispatch(deleteToDo(item));
      removeDataInLocal(item);
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
          <tr
            className={`text-center ${item.priority}`}
            key={index}
            onDoubleClick={() => {
              handleRowDoubleClick(item);
            }}
          >
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
                    color="btn-info"
                    onClick={() => getId(item, "edit")}
                  />
                </div>
                <div className="col-4 text-center">
                  <ButtonCircle
                    title="Complete"
                    icon="complete"
                    color="btn-success"
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
