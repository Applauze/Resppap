"use client";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { rubik, pt_Sans } from "@/app/util/fonts";
import classes from "./FormInputText.module.css";
const FormInputSelect = (props) => {
  return (
    <div>
      <Form.Label
        className={pt_Sans}
        style={{
          color: props.Color,
          fontWeight: "bold",
        }}
      >
        {props.Label}
        {props.Compulsory && (
          <span className={classes.CompulsoryItem}>
            <sup> * </sup>
          </span>
        )}
      </Form.Label>
      <Form.Select
        value={props.Owner}
        onChange={(e) => props.GetValue(e.target.value)}
        disabled={props.Disabled}
        className={pt_Sans}
      >
        <option> Select</option>
        {props.Data.map((cat, index) => (
          <option key={index} value={cat} className={rubik}>
            {cat}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default FormInputSelect;
