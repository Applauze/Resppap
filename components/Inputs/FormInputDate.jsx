import React, { useState } from "react";
import DatePicker, {
  DateObject,
  getAllDatesInRange,
} from "react-multi-date-picker";

const FormInputDate = (props) => {
  const [Date, setDate] = useState("");
  const setValue = (val) => {
    setDate(val);
    props.GetValue(val.toString());
  };
  return (
    <label
      style={{
        color: props.Color,
        fontWeight: "bold",
        display: "inline-block",
      }}
    >
      {props.Label}
      <br />
      <DatePicker
        value={Date}
        editable={false}
        style={{
          height: "35px",
          paddingLeft: "10px",
          marginTop: "8px",
          width: "100%",
        }}
        onChange={(dateObjects) => {
          setValue(dateObjects);
        }}
        format="MMM DD, YYYY"
        shadow={true}
      />
    </label>
  );
};

export default FormInputDate;
