import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createToDo, updateToDo } from "../state/ToDoListSlice";
import { getAllToDoList } from "../controllers/ToDoListApiController";

import Button from "../components/Button";
import FormInput from "../components/FormInput";
import FormLabel from "../components/FormLabel";
import FormSelect from "../components/FormSelect";
import {
  getRandomInt,
  isEmptyObject,
  isEmptyOrNot,
  storeDataInLocal,
} from "../utils/Helper";

interface Props {
  show?: boolean;
  modalHeading?: string;
  list?: any;
  action?: string;
  isFetchData?: boolean;
  onHide?: () => void;
  onSave?: () => void;
}

const ToDoForm = ({
  show = false,
  modalHeading,
  list,
  onHide,
  onSave,
  action = "ADD",
  isFetchData,
}: Props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    to_do_desc: "",
    username: "",
    dueDate: "",
    dueTime: "",
    status: "NOT_START",
  });

  const [taskId, setTaskId] = useState(0);

  const [errors, setErrors] = useState({
    to_do_desc: "",
    username: "",
    dueDate: "",
    dueTime: "",
  });

  const [isDataFetched, setIsDataFetched] = useState(false);

  const setCreateFormData = (fieldName: string, value: string | boolean) => {
    setFormData((prevData) => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));

      const newData = {
        ...prevData,
        [fieldName]: value,
      };
      return newData;
    });
  };

  const handleChange = (fieldName: string, value: string | boolean) => {
    setCreateFormData(fieldName, value);
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { ...errors };
    if (!isEmptyOrNot(formData.to_do_desc)) {
      formIsValid = false;
      newErrors.to_do_desc = "Description is required";
    } else {
      newErrors.to_do_desc = "";
    }

    if (!isEmptyOrNot(formData.username)) {
      formIsValid = false;
      newErrors.username = "username is required";
    } else {
      newErrors.username = "";
    }

    if (!isEmptyOrNot(formData.dueDate)) {
      formIsValid = false;
      newErrors.dueDate = "Due Date is required";
    } else {
      newErrors.dueDate = "";
    }

    if (!isEmptyOrNot(formData.dueTime)) {
      formIsValid = false;
      newErrors.dueTime = "Due Time is required";
    } else {
      newErrors.dueTime = "";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const OnSubmit = () => {
    if (validateForm()) {
      if (taskId !== 0) {
        let newData = {
          id: taskId,
          ...formData,
        };
        dispatch(updateToDo(newData));
        storeDataInLocal(newData);
      } else {
        let editData = {
          id: getRandomInt(1000, 9999),
          ...formData,
        };
        dispatch(createToDo(editData));
        storeDataInLocal(editData);
      }

      if (onSave) {
        onSave();
        setFormData((prevData) => ({
          ...prevData,
          to_do_desc: "",
          username: "",
          dueDate: "",
          dueTime: "",
        }));
      }
    }
  };

  const clearFields = () => {
    if (onHide) {
      onHide();
      setCreateFormData("to_do_desc", "");
      setCreateFormData("username", "");
      setCreateFormData("dueDate", "");
      setCreateFormData("dueTime", "");
      setCreateFormData("statue", "");
    }
  };

  useEffect(() => {
 
    const isEmpty: boolean = isEmptyObject(list);
    if (!isEmpty) {
      setTaskId(list?.id || 0);
      setCreateFormData("to_do_desc", list?.to_do_desc);
      setCreateFormData("username", list?.username);
      setCreateFormData("dueDate", list?.dueDate);
      setCreateFormData("dueTime", list?.dueTime);
      setCreateFormData("statue", list?.status);
    }

    if (!isDataFetched && isFetchData) {
      const temp = getAllToDoList();
      temp
        .then((data) => {
          data.forEach((task) => {
            dispatch(createToDo(task));
            storeDataInLocal(task);
          });
        })
        .catch((error) => {
          console.error(error);
        });

      setIsDataFetched(true);
    }
  }, [list, dispatch, isDataFetched, isFetchData]);

  return (
    <div style={{ display: "block", position: "initial" }}>
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <FormLabel text={"Enter description"} />

                  <FormInput
                    type="text"
                    value={formData?.to_do_desc || ""}
                    onChange={(value) => handleChange("to_do_desc", value)}
                  />
                  <div className="text-danger">{errors.to_do_desc}</div>
                </div>
              </div>

              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <FormLabel text={"Enter User name"} />
                  <FormInput
                    type="text"
                    value={formData?.username || ""}
                    onChange={(value) => handleChange("username", value)}
                  />
                  <div className="text-danger">{errors.username}</div>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <FormLabel text={"Select a due date"} />
                  <FormInput
                    type="date"
                    value={formData?.dueDate || ""}
                    onChange={(value) => handleChange("dueDate", value)}
                  />
                  <div className="text-danger">{errors.dueDate}</div>
                </div>
              </div>

              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <FormLabel text={"Select a due Time"} />

                  <FormInput
                    type="time"
                    value={formData?.dueTime || ""}
                    onChange={(value) => handleChange("dueTime", value)}
                  />
                  <div className="text-danger">{errors.dueTime}</div>
                </div>
              </div>
            </div>

            <div className="form-check d-flex justify-content-center mb-5">
              <div>
                {action !== "ADD" ? (
                  <FormSelect
                    options={["NOT_START", "IN_PROGRESS", "COMPLETED"]}
                    value={formData?.status}
                    onChange={(value) => {
                      handleChange("status", value);
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            text="Close"
            color="btn btn-secondary"
            onClick={clearFields}
          />
          <Button text="Save" color="btn btn-primary" onClick={OnSubmit} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ToDoForm;
