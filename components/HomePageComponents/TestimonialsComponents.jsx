import React from "react";
import BorderedCardNoHover from "../Cards/BorderedCardNoHover";
import { kanit, rubik, pt_Sans } from "@/app/util/fonts";
const TestimonialsComponents = (props) => {
  return (
    <BorderedCardNoHover MyStyle={props.col}>
      <p className={`${kanit} text-justify`}>{props.Tes}</p>
      <hr className="px-1 mx-1" />
      <p className="text-end mb-0">{props.Pers}</p>
    </BorderedCardNoHover>
  );
};

export default TestimonialsComponents;
