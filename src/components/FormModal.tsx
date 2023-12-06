import { ReactNode, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "./Button";

interface Props {
  show?: boolean;
  modalHeading?: string;
  children?: ReactNode;
  onHide?: () => void;
  onSave?: () => void;
}

function FormModal({
  show = false,
  modalHeading,
  children,
  onHide,
  onSave,
}: Readonly<Props>) {
  return (
    <div style={{ display: "block", position: "initial" }}>
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button text="Close" color="btn btn-secondary" onClick={onHide} />
          <Button text="Save" color="btn btn-primary" onClick={onSave} />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FormModal;
