"use client";
import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import classes from "./TheFooter.module.css";
const TheFooter = () => {
  const [FooterDetails, setFooterDetails] = useState([
    {
      header: "ABOUT US",
      body: "Our mission is to provide a supportive and inclusive learning environment that empowers students to achieve academic excellence, develop social responsibility, and become innovative leaders who positively impact their communities.",
    },
    {
      header: "OUR ADDRESS",
      body: "Opp. Old Oyo National Park, Isokun, Oyo",
    },
    {
      header: "CONTACT US",
      body: "PHONE NUMBERS: 08033824233",
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
