import Image from "next/image";
import { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import ReactLoading from "react-loading";

const Image_Modal = (props) => {
  return (
    <>
      <Modal show={props.Open} keyboard={false} size="lg" onHide={props.Exit}>
        <Modal.Body>
          <Row className="justify-content-around pr-2">
            <Col md={12} lg={12} sm={12} xs={12}>
              <Image
                src={props.Img}
                alt={props.Alt}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Image_Modal;
