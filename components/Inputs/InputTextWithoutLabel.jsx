import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import classes from "./FormInputText.module.css";
const FormInputText = (props) => {
  return (
    <Form.Group className="mb-0 d-inline-block">
      <Form.Control
        type="text"
        value={props.TheValue}
        onChange={(e) =>
          props.GetTheValue(props.Index, e.target.value, props.Source)
        }
        required={true}
        readOnly={props.readonly}
        style={{
          width: "90px",
          height: "35px",
          display: "inline-block",
          backgroundColor: props.BackGrd,
        }}
      />
    </Form.Group>
  );
};

export default FormInputText;
