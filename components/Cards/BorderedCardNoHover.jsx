import React from "react";
import classes from "./BorderedCardNoHover.module.css";

const BorderedCardNoHover = (props) => {
  return (
    <div className={classes.cardcss} style={props.MyStyle}>
      {props.children}
    </div>
  );
};

export default BorderedCardNoHover;
