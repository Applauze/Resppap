"use client";
import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import classes from "./TheFooter.module.css";
import Link from "next/link";
import { kanit } from "@/app/util/fonts";
const TheFooter = () => {
  const [FooterDetails, setFooterDetails] = useState([
    {
      header: "ABOUT US",
      p1: "History",
      p2: "University Management",
      p3: "School Management",
      p4: "Our Mission",
      p5: "Our Vision",
    },
    {
      header: "Academics",
      p1: "Overview",
      p2: "Curriculum",
      p3: "Junior Secondary School",
      p4: "Senior Secondary School",
      p5: "External Examinations",
    },
    {
      header: "INFORMATION",
      p1: "School Calendar",
      p2: "News & Events",
      p3: "Photo Gallery",
      p4: "Video Gallery",
    },
    {
      header: " FACILITIES",
      p1: "Hostels",
      p2: "School Laboratories",
      p3: "ICT Center",
      p3: "Medical Center",
      p4: "Library",
      p5: "School Buses",
    },
  ]);

  return (
    <Row className={classes.Hide4Print}>
      <Col md={12} sm={12} xs={12}>
        <Card style={{ backgroundColor: "#d9ffff" }}>
          <Card.Body>
            <Row>
              <h4 className={`${kanit} mb-3`}>QUICK LINKS</h4>
              {FooterDetails.map((ft, index) => (
                <Col md={3} sm={12} xs={12} key={index}>
                  <h6 className={classes.FootHeader} style={{ color: "brown" }}>
                    {ft.header}
                  </h6>
                  <hr className="my-1 " />
                  <p
                    href="#"
                    className="text-justify m-0"
                    style={{ fontFamily: "Times New Roman" }}
                  >
                    <Link href="#" className={classes.QuickLinks}>
                      {ft.p1}
                    </Link>
                  </p>
                  <p
                    href="#"
                    className="text-justify m-0"
                    style={{ fontFamily: "Times New Roman" }}
                  >
                    <Link href="#" className={classes.QuickLinks}>
                      {ft.p2}
                    </Link>
                  </p>
                  <p
                    href="#"
                    className="text-justify m-0"
                    style={{ fontFamily: "Times New Roman" }}
                  >
                    <Link href="#" className={classes.QuickLinks}>
                      {ft.p3}
                    </Link>
                  </p>
                  <p
                    href="#"
                    className="text-justify m-0"
                    style={{ fontFamily: "Times New Roman" }}
                  >
                    <Link href="#" className={classes.QuickLinks}>
                      {ft.p4}
                    </Link>
                  </p>
                  <p
                    href="#"
                    className="text-justify m-0"
                    style={{ fontFamily: "Times New Roman" }}
                  >
                    <Link href="#" className={classes.QuickLinks}>
                      {ft.p5}
                    </Link>
                  </p>
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
