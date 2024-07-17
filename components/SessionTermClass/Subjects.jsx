import React from "react";
import FormInputSelect from "@/components/Inputs/FormInputSelect";
const Subjects = (props) => {
  return (
    <FormInputSelect
      Data={props.TheSubjects}
      Label="Subject"
      GetValue={props.setSubject}
      Color="brown"
      Owner={props.Subject}
      Disabled={props.Disabled}
    />
  );
};

export default Subjects;
