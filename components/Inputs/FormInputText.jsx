import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import classes from "./FormInputText.module.css";
const FormInputText = (props) => {
  return (
    <Form.Group className="mb-0">
      <Form.Label style={{ color: props.Color, fontWeight: "bold" }}>
        {props.Label}
        {props.Compulsory && (
          <span className={classes.CompulsoryItem}>
            <sup>*</sup>
          </span>
        )}
      </Form.Label>
      <Form.Control
        type="text"
        value={props.Owner}
        onChange={(e) => props.GetValue(e.target.value)}
        name="Surname"
        required={true}
        readOnly={props.readonly}
      />
    </Form.Group>
  );
};

export default FormInputText;
