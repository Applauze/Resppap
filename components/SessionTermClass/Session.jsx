import React from "react";
import FormInputSelect from "@/components/Inputs/FormInputSelect";
const Session = (props) => {
  return (
    <FormInputSelect
      Data={["20222023", "20232024", "20242025", "20252026"]}
      Label="Session"
      GetValue={props.setSession}
      Color="brown"
      Owner={props.Session}
      Disabled={props.Disabled}
    />
  );
};

export default Session;
