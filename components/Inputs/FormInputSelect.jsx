import React, { useState } from "react";
import { Form } from "react-bootstrap";

const FormInputSelect = (props) => {
  return (
    <div>
      <Form.Label
        style={{
          color: props.Color,
          fontWeight: "bold",
        }}
      >
        {props.Label}
      </Form.Label>
      <Form.Select
        value={props.Owner}
        onChange={(e) => props.GetValue(e.target.value)}
        disabled={props.Disabled}
      >
        <option> Select</option>
        {props.Data.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default FormInputSelect;
