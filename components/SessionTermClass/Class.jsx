import React from "react";
import FormInputSelect from "@/components/Inputs/FormInputSelect";

const Class = (props) => {
  return (
    <FormInputSelect
      Data={[
        "JS1M",
        "JS1O",
        "JS1D",
        "JS1E",
        "JS1L",
        "JS1H",
        "JS1S",
        "JS2M",
        "JS2O",
        "JS2D",
        "JS2E",
        "JS2L",
        "JS2H",
        "JS2S",
        "JS3M",
        "JS3O",
        "JS3D",
        "JS3E",
        "JS3L",
        "JS3H",
        "JS3S",
        "SS1M",
        "SS1O",
        "SS1D",
        "SS1E",
        "SS1L",
        "SS1H",
        "SS1S",
        "SS2M",
        "SS2O",
        "SS2D",
        "SS2E",
        "SS2L",
        "SS2H",
        "SS2S",
        "SS3M",
        "SS3O",
        "SS3D",
        "SS3E",
        "SS3L",
        "SS3H",
        "SS3S",
      ]}
      Label="Class"
      GetValue={props.setClaz}
      Color="brown"
      Owner={props.Claz}
      Disabled={props.Disabled}
    />
  );
};

export default Class;
