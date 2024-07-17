"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import schoollogo from "./Images/schoollogo.png";
import Image from "next/image";
import classes from "./TheHeader.module.css";
import MainLinks from "./MainLinks";
import ButtonBackground from "./Inputs/ButtonBackground";
import AllPanel from "./AllPanel";
const TheHeader = () => {
  return (
    <Row className={`${classes.TheMainRow} ${classes.Hide4Print}`}>
      <Col md={12} lg={12} sm={12} xs={12}>
        <Row style={{ height: "75%" }}>
          <Col md={8} lg={8} sm={12} xs={12} className="h-100">
            <Row className="h-100">
              <Col
                md={2}
                lg={2}
                sm={12}
                xs={12}
                className=" d-flex justify-content-md-end justify-content-sm-center justify-content-xs-center  align-items-center text-center  m-0 p-0"
              >
                <Image
                  src={schoollogo}
                  className={` ${classes.Logo}`}
                  alt="School Logo"
                />
              </Col>
              <Col
                md={10}
                lg={10}
                sm={12}
                xs={12}
                className="d-flex flex-column justify-content-md-center justify-content-sm-start align-items-md-start align-items-sm-center "
              >
                <h5 className={` m-0  px-md-0 ${classes.schoolname}`}>
                  EAUED MODEL HIGH SCHOOL, OYO
                </h5>
                <p className={`m-0 p-0 ${classes.forward}`}>
                  ...forward ever, backward never
                </p>
              </Col>
            </Row>
          </Col>
          <Col
            md={4}
            lg={4}
            sm={12}
            xs={12}
            className={`h-100 d-md-block d-sm-none`}
          >
            <Row className="h-100">
              <Col
                md={6}
                lg={6}
                sm={12}
                xs={12}
                className={`d-flex justify-content-end align-items-center h-100  ${classes.powered}`}
              >
                Powered By:
              </Col>
              <Col
                md={6}
                lg={6}
                sm={12}
                xs={12}
                className={`h-100 ${classes.waviy}`}
              >
                <span>A</span>
                <span>P</span>
                <span>P</span>
                <span>L</span>
                <span>A</span>
                <span>U</span>
                <span>S</span>
                <span>E</span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Col
            md={10}
            lg={10}
            sm={12}
            xs={12}
            className="d-flex justify-content-center align-items-center "
          >
            <ul className=" m-0  p-0">
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks LinkName="HOME" thepath="/" />
              </li>
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks
                  LinkName="REGISTRATION"
                  ThePanel={
                    <AllPanel
                      TheLink={[
                        {
                          title: "Student's Registration",
                          desc: "This opens a new form to register a newly admitted student who has no record on the software yet.",
                        },
                        {
                          title: "Teacher's Registration",
                          desc: "This opens a new form to register a new teacher and provide the teacher with necessary login details",
                        },
                        {
                          title: "Subjects' Registration",
                          desc: "This opens a new form to register all the subjects offered by a  subject here",
                        },
                      ]}
                    />
                  }
                />
              </li>
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks
                  LinkName="COMPUTATION"
                  ThePanel={
                    <AllPanel
                      TheLink={[
                        {
                          title: "Scores Computation",
                          desc: "Subject Teachers input the scores of their students by selecting the necessary details",
                        },
                        {
                          title: "Students Attribute",
                          desc: "Class Teachets input the attributes of students in their class. This include the psychomotor and thhe affective domain",
                        },
                      ]}
                    />
                  }
                />
              </li>
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks
                  LinkName="DISPLAY"
                  ThePanel={
                    <AllPanel
                      TheLink={[
                        {
                          title: "View Report Sheet",
                          desc: "Students completed Report Sheet can be viewed and printed or exported to parents here",
                        },
                        {
                          title: "View Broad Sheet",
                          desc: "Teachers view the cummulative broadsheet of scores of all the students in all subjects  in their class here",
                        },
                      ]}
                    />
                  }
                />
              </li>
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks LinkName="AWARDS" />
              </li>
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks LinkName="ABOUT" />
              </li>
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks LinkName="LOG OUT" />
              </li>
            </ul>
          </Col>
          <Col md={2} lg={2} sm={12}>
            <ButtonBackground
              ButtonName="12:00:00"
              ButtonCss={{ display: "block" }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TheHeader;
