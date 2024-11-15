"use client";
import React, { useState } from "react";
import axioscall from "./API_Call/axioscall";
import Session from "./SessionTermClass/Session";
import classes from "./Promote_Students.module.css";
import { ReactNotifications } from "react-notifications-component";
import { DisplayNotification } from "./Notification";
import "react-notifications-component/dist/theme.css";
import { Container, Row, Col } from "react-bootstrap";
import BorderedCardNoHover from "./Cards/BorderedCardNoHover";
import "rsuite/dist/rsuite.css";
import { rubik } from "@/app/util/fonts";
import ButtonBackground from "./Inputs/ButtonBackground";

const Promote_Students = () => {
  const [session, setsession] = useState("Select");

  const PromoteTheStudents = async () => {
    let Sess = { Session: session, Status: "Check" };
    let CheckIfSessionExists = await axioscall("promote_the_students", Sess);
    console.log(CheckIfSessionExists);
    if (!CheckIfSessionExists) {
      let prevSession = (parseInt(session) - 10001).toString();
      let prevSess = { Session: prevSession, Status: "Check" };
      let CheckIfPrevSessionExists = await axioscall(
        "promote_the_students",
        prevSess
      );
      if (CheckIfPrevSessionExists) {
        console.log("Person");
        let Sess = { Session: session, Status: "Promote" };
        let PromotionAction = await axioscall("promote_the_students", Sess);
        console.log(PromotionAction);
        if (PromotionAction === "success") {
          DisplayNotification(
            "Success",
            `All Students succesfully promoted to ${session} Session`,
            "success",
            "top-center",
            5000
          );
        }
      } else {
        DisplayNotification(
          "Error",
          `${prevSession} Session has not existed before, hence Students cannot be promoted to ${session} Session`,
          "danger",
          "top-center",
          5000
        );
      }
    } else {
      DisplayNotification(
        "Error",
        `Students are already existing in ${session} Session`,
        "danger",
        "top-center",
        5000
      );
    }
  };

  return (
    <Container fluid>
      <ReactNotifications />
      <Row className="justify-content-around">
        <Col lg={12} md={12} sm={11} xs={11}>
          <BorderedCardNoHover
            MyStyle={{
              backgroundColor: "#eeeeee",
              paddingLeft: "40px",
              paddingRight: "40px",
              margin: "0px",
            }}
          >
            <Row>
              <Col md={12} lg={12} sm={11} xs={11}>
                <h4 className="text-center h4">STUDENTS PROMOTION</h4>
              </Col>
            </Row>
            <hr />
            <Row className="justify-content-around">
              <Col md={4} lg={4} sm={12}>
                <p className={`${rubik}  ${classes.PleaseSelect}`}>
                  Please select the Session which the students are to be
                  promoted to
                </p>
              </Col>
              <Col md={4} lg={4} sm={12} className="text-end">
                <Session Session={session} setSession={setsession} />
                <ButtonBackground
                  type="submit"
                  ButtonName="PROMOTE"
                  ButtonCss={{ marginTop: "7px" }}
                  ButtonAction={PromoteTheStudents}
                />
              </Col>
            </Row>
          </BorderedCardNoHover>
        </Col>
      </Row>
    </Container>
  );
};

export default Promote_Students;
