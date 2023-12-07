import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createToDo } from "../state/ToDoListSlice";

import Button from "../components/Button";
import FormInput from "../components/FormInput";
import FormLabel from "../components/FormLabel";
import FormCheckBox from "../components/FormCheckBox";
import { getRandomInt } from "../utils/Helper";

interface Props {
  show?: boolean;
  modalHeading?: string;
  onHide?: () => void;
  onSave?: () => void;
}

const ToDoForm = ({ show = false, modalHeading, onHide, onSave }: Props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    to_do_desc: "",
    username: "",
    dueDate: "",
    dueTime: "",
    status: "",
    started: false,
  });

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
    if (fieldName === "started") {
      if (value) {
        setCreateFormData("status", "START");
      } else {
        setCreateFormData("status", "NO START");
      }
    }
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
      dispatch(
        createToDo({
          id: getRandomInt(1000, 9999),
          ...formData,
        })
      );

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
                    onChange={(value) => handleChange("dueTime", value)}
                  />
                  <FormLabel text={"Select a due Time"} />
                </div>
              </div>
            </div>

            <div className="form-check d-flex justify-content-center mb-4">
              <FormCheckBox
                status={false}
                onChange={(value) => handleChange("started", value)}
              />
              <FormLabel text={"Start"} />
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
