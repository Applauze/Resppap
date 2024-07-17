import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Divisor_Select = (props) => {
  return (
    <div>
      <Form.Select
        value={props.Value}
        onChange={(e) =>
          props.GetTheValue(props.Index, e.target.value, props.Source)
        }
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

export default Divisor_Select;
