import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const OK_Modal = (props) => {
  return (
    <>
      <Modal
        show={props.ShowModal}
        onHide={props.AfterEvent}
        backdrop="static"
        keyboard={false}
        size={props.size}
        style={{ backgroundColor: "212733" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.AfterEvent}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OK_Modal;
