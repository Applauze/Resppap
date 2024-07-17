import { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import ReactLoading from "react-loading";

const Processing_Modal = (props) => {
  return (
    <>
      <Modal
        show={props.Show}
        onHide={props.AfterEvent}
        backdrop="static"
        keyboard={false}
        size={props.size}
        style={{ backgroundColor: "212733" }}
      >
        <Modal.Header>
          <Modal.Title className="small">Please wait...</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pr-2">
          <Row className="justify-content-around pr-2">
            <Col md={4} lg={4} sm={4} xs={4}>
              <ReactLoading
                type={"bars"}
                color={"brown"}
                height={"40%"}
                width={"70%"}
              />
            </Col>
            <Col
              md={8}
              lg={8}
              sm={8}
              xs={8}
              style={{
                backgroundColor: "brown",
                color: "white",
                fontSize: "11px",
                fontStyle: "Times New Roman",
                padding: "10px",
                borderRadius: "3px",
              }}
            >
              {props.message}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Processing_Modal;
