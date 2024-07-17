import React from "react";
import FormInputSelect from "@/components/Inputs/FormInputSelect";

const GeneralClass = (props) => {
  return (
    <FormInputSelect
      Data={["JS1", "JS2", "JS3", "SS1", "SS2", "SS3"]}
      Label="Class"
      GetValue={props.setClaz}
      Color="brown"
      Owner={props.Claz}
      Disabled={props.Disabled}
    />
  );
};

export default GeneralClass;
