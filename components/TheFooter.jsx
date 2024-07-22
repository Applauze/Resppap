"use client";
import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import classes from "./TheFooter.module.css";
const TheFooter = () => {
  const [FooterDetails, setFooterDetails] = useState([
    {
      header: "ABOUT US",
      body: "Our mission is to provide quality services to people in achieving optimum health as we deliver the best products and values to every stakeholder.",
    },
    {
      header: "OUR ADDRESS",
      body: "Idi Ose Junction, Opp. Musalat Petrol Station, Agunpopo, Oyo, Oyo State.",
    },
    {
      header: "CONTACT US",
      body: "PHONE NUMBERS: 08054247571, 07067088368",
    },
    {
      header: " OUR SOFTWARE DEVELOPER",
      body: "APPLAUSE INFOTECH",
      tel: "TELEPHONE:08033824233",
      email: "EMAIL:Upmosttony@gmail.com",
    },
  ]);

  return (
    <Row className={classes.Hide4Print}>
      <Col md={12} sm={12} xs={12}>
        <Card style={{ backgroundColor: "#d9ffff" }}>
          <Card.Body>
            <Row>
              {FooterDetails.map((ft, index) => (
                <Col md={3} sm={12} xs={12} key={index}>
                  <h6 className={classes.FootHeader} style={{ color: "brown" }}>
                    {ft.header}
                  </h6>
                  <hr className="my-1 " />
                  <p
                    className="text-justify m-0"
                    style={{ fontFamily: "Times New Roman" }}
                  >
                    {ft.body}
                  </p>
                  {ft.Add && (
                    <p
                      className="text-justify m-0"
                      style={{ fontFamily: "Times New Roman" }}
                    >
                      {ft.Add}
                    </p>
                  )}
                  {ft.tel && (
                    <p
                      className="text-justify m-0"
                      style={{ fontFamily: "Times New Roman" }}
                    >
                      {ft.tel}
                    </p>
                  )}
                  {ft.email && (
                    <p
                      className="text-justify m-0"
                      style={{ fontFamily: "Times New Roman" }}
                    >
                      {ft.email}
                    </p>
                  )}
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TheFooter;
