import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createToDo, updateToDo } from "../state/ToDoListSlice";

import Button from "../components/Button";
import FormInput from "../components/FormInput";
import FormLabel from "../components/FormLabel";
import FormSelect from "../components/FormSelect";
import { getRandomInt, isEmptyObject } from "../utils/Helper";

interface Props {
  show?: boolean;
  modalHeading?: string;
  list?: any;
  action?: string;
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
}: Props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    to_do_desc: "",
    username: "",
    dueDate: "",
    dueTime: "",
    status: "NO_START",
  });

  const [taskId, setTaskId] = useState(0);

  const [errors, setErrors] = useState({
    to_do_desc: "",
    username: "",
    dueDate: "",
    dueTime: "",
  });

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
    if (formData.to_do_desc.trim() === "") {
      formIsValid = false;
      newErrors.to_do_desc = "Description is required";
    } else {
      newErrors.to_do_desc = "";
    }

    if (formData.username.trim() === "") {
      formIsValid = false;
      newErrors.username = "username is required";
    } else {
      newErrors.username = "";
    }

    if (formData.dueDate === "") {
      formIsValid = false;
      newErrors.dueDate = "Due Date is required";
    } else {
      newErrors.dueDate = "";
    }

    if (formData.dueTime === "") {
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
        dispatch(
          updateToDo({
            id: taskId,
            ...formData,
          })
        );
      } else {
        dispatch(
          createToDo({
            id: getRandomInt(1000, 9999),
            ...formData,
          })
        );
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
  }, [list]);

  return (
    <div style={{ display: "block", position: "initial" }}>
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <div className="text-danger">{errors.to_do_desc}</div>
                  <FormInput
                    type="text"
                    value={formData?.to_do_desc || ""}
                    onChange={(value) => handleChange("to_do_desc", value)}
                  />
                  <FormLabel text={"Enter description"} />
                </div>
              </div>

              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <div className="text-danger">{errors.username}</div>
                  <FormInput
                    type="text"
                    value={formData?.username || ""}
                    onChange={(value) => handleChange("username", value)}
                  />
                  <FormLabel text={"Enter User name"} />
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <div className="text-danger">{errors.dueDate}</div>
                  <FormInput
                    type="date"
                    value={formData?.dueDate || ""}
                    onChange={(value) => handleChange("dueDate", value)}
                  />
                  <FormLabel text={"Select a due date"} />
                </div>
              </div>

              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <div className="text-danger">{errors.dueTime}</div>
                  <FormInput
                    type="time"
                    value={formData?.dueTime || ""}
                    onChange={(value) => handleChange("dueTime", value)}
                  />
                  <FormLabel text={"Select a due Time"} />
                </div>
              </div>
            </div>

            <div className="form-check d-flex justify-content-center mb-5">
              <div>
                <FormSelect
                  value={formData?.status}
                  onChange={(value) => {
                    handleChange("status", value);
                  }}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button text="Close" color="btn btn-secondary" onClick={onHide} />
          <Button text="Save" color="btn btn-primary" onClick={OnSubmit} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ToDoForm;
