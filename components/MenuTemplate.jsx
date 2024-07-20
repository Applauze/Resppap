"use client";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import classes from "./MenuTemplate.module.css";
import homepicture from "./Images/homepicture.png";
import Image from "next/image";
import BorderedCard from "./Cards/BorderedCard";
import Link from "next/link";
const MenuTemplate = (props) => {
  const [isHover, setisHover] = useState(false);
  const [Menu, setMenu] = useState(props.Menu);

  const changeBg = () => {
    setisHover(true);
  };
  const changeBg2 = () => {
    setisHover(false);
  };

  const ExFunc = (e, tt) => {
    if (tt === "Log Out") {
      e.preventDefault();
      console.log("I am Exiting");
      props.Ex();
    }
  };

  const DCss = Menu.IsReal
    ? { visibility: "visible" }
    : { visibility: "hidden" };

  return (
    <BorderedCard MyStyle={{ ...DCss, padding: "0px", height: "150px" }}>
      <Link
        href={Menu.link}
        className={classes.theLinks}
        onClick={(e) => ExFunc(e, Menu.Title)}
      >
        <Row
          className={classes.TemplateDimension}
          onMouseOver={changeBg}
          onMouseLeave={changeBg2}
        >
          <Col md={12} sm={12} lg={12} xs={12} className="h-100">
            <Row className="justify-content-center align-items-center h-100">
              <Col md={4} lg={4} sm={4} xs={4} className="text-center">
                <Image
                  src={Menu.Icon}
                  width={90}
                  height={90}
                  alt="Menu Images"
                />
              </Col>
              <Col
                md={8}
                lg={8}
                sm={8}
                xs={8}
                className={
                  isHover
                    ? `d-flex h-100 justify-content-center align-items-center ${classes.TitleColumnHover}`
                    : `d-flex h-100 justify-content-center align-items-center ${classes.TitleColumn}`
                }
              >
                <h4 className={`h4 text-center ${classes.TitleText}`}>
                  {Menu.Title.toUpperCase()}
                </h4>
              </Col>
            </Row>
          </Col>
        </Row>
      </Link>
    </BorderedCard>
  );
};

export default MenuTemplate;
