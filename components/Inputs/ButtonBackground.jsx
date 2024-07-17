import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
const ButtonBackground = (props) => {
  const buttonBackground = {
    backgroundColor: "#003152",
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.2) ",
  };

  return (
    <div>
      <Button
        variance="info"
        type={props.ButtonType}
        onClick={props.ButtonAction}
        style={{ ...buttonBackground, ...props.ButtonCss }}
        disabled={props.ButtonDisable}
      >
        {props.ButtonName}
      </Button>
    </div>
  );
};

export default ButtonBackground;
