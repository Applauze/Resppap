"use client";
import React, { useState, useEffect } from "react";
import BorderedCardNoHover from "./Cards/BorderedCardNoHover";
import classes from "./MainLinks.module.css";
const MainLinks = (props) => {
  const [displayPanel, setdisplayPanel] = useState(false);
  const [isHover, setisHover] = useState(false);
  return (
    <div
      className={`${classes.Container}`}
      onMouseEnter={() => setdisplayPanel(true)}
      onMouseLeave={() => setdisplayPanel(false)}
    >
      <a
        href={props.thepath}
        className={
          isHover ? `${classes.StillHovering}` : `${classes.TheMainLink}`
        }
      >
        {props.LinkName}
      </a>
      <div
        className={classes.Gap}
        onMouseEnter={() => setisHover(true)}
        onMouseLeave={() => setisHover(false)}
      >
        <div
          className={
            displayPanel && props.ThePanel ? classes.ArrowOn : classes.ArrowOff
          }
          onMouseEnter={() => setisHover(true)}
          onMouseLeave={() => setisHover(false)}
        ></div>
      </div>

      <div
        className={
          displayPanel && props.ThePanel
            ? classes.TheDropDownPanel
            : classes.TheDropDownPanelHidden
        }
        onMouseEnter={() => setisHover(true)}
        onMouseLeave={() => setisHover(false)}
      >
        <BorderedCardNoHover MyStyle={{ zIndex: "1", padding: "0px" }}>
          {props.ThePanel}
        </BorderedCardNoHover>
      </div>
    </div>
  );
};

export default MainLinks;
