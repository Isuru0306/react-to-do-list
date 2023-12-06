import { ReactNode, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "./Button";

interface Props {
  show?: boolean;
  modalHeading?: string;
  children?: ReactNode;
}

function FormModal({ show = false, modalHeading, children }: Readonly<Props>) {
  const [showModal, setShowModal] = useState(show);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    setShowModal(false);
  };

  return (
    <div style={{ display: "block", position: "initial" }}>
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button
            text="Close"
            color="btn btn-secondary"
            onClick={handleClose}
          />
          <Button
            text="Save Changes"
            color="btn btn-primary"
            onClick={handleSave}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FormModal;
