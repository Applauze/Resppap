import React, { useEffect, useState } from "react";
import DatePicker, {
  DateObject,
  getAllDatesInRange,
} from "react-multi-date-picker";

const FormInputDate = (props) => {
  const [Dater, setDater] = useState("");
  const DS = props.DateString || "";
  const setValue = (val) => {
    setDater(val);
    props.GetValue(val.toString());
  };

  useEffect(() => {
    if (DS != "") {
      const dateString = props.DateString;
      const dateParts = dateString.split(" ");
      const month = dateParts[0];
      const day = dateParts[1].replace(",", "");
      const year = dateParts[2];
      const dateObject = new Date(`${month} ${day} ${year}`);
      console.log(dateObject);
      setDater(dateObject);
    }
  }, [props.DateString]);
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
        value={Dater}
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
