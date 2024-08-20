import React from "react";
import BorderedCardNoHover from "../Cards/BorderedCardNoHover";
import { kanit, rubik, pt_Sans } from "@/app/util/fonts";
import classes from "./NumberRecordDescription.module.css";
const NumberRecordsDescription = (props) => {
  return (
    <BorderedCardNoHover MyStyle={{ width: "80%" }}>
      <p className={`${pt_Sans} ${classes.NumberRecord}`}>{props.figure}+</p>
      <p className={`${kanit} ${classes.NumberDescription}`}>{props.Desc}</p>
    </BorderedCardNoHover>
  );
};

export default NumberRecordsDescription;
