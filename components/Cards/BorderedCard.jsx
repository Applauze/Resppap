import React from "react";
import classes from "./BorderedCard.module.css";

const BorderedCard = (props) => {
  return (
    <div className={classes.cardcss} style={props.MyStyle}>
      {props.children}
    </div>
  );
};

export default BorderedCard;
