import React from "react";
import BorderedCardNoHover from "../Cards/BorderedCardNoHover";
import { kanit, rubik, pt_Sans } from "@/app/util/fonts";
import classes from "./NumberRecordDescription.module.css";
import CountUp from "react-countup";
const NumberRecordsDescription = (props) => {
  return (
    <BorderedCardNoHover MyStyle={{ width: "80%", margin: "auto" }}>
      <p className={`${pt_Sans} ${classes.NumberRecord}`}>
        <CountUp
          enableScrollSpy={true}
          scrollSpyDelay={500}
          scrollSpyOnce={true}
          end={props.figure}
        />
        +
      </p>
      <p className={`${kanit} ${classes.NumberDescription}`}>{props.Desc}</p>
    </BorderedCardNoHover>
  );
};

export default NumberRecordsDescription;
