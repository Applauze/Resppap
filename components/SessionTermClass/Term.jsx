import React from "react";
import FormInputSelect from "@/components/Inputs/FormInputSelect";
const Term = (props) => {
  return (
    <FormInputSelect
      Data={["First", "Second", "Third"]}
      Label="Term"
      GetValue={props.setTerm}
      Color="brown"
      Owner={props.Term}
      Disabled={props.Disabled}
    />
  );
};

export default Term;
