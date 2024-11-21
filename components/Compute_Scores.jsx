"use client";
import React, { useState, useEffect, useContext } from "react";
import PermissionContext from "@/Store/permission-context";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import Import_Scores_File from "./Import_Scores_File";
import Enter_Scores from "./Enter_Scores";
import Cookies from "universal-cookie";
import { DisplayNotification } from "./Notification";
import BorderedCard from "./Cards/BorderedCard";

const Compute_Scores = (props) => {
  const cookies = new Cookies();
  const PCtx = useContext(PermissionContext);
  useEffect(() => {
    PCtx.setMenuClicked(false);
  }, []);
  const displayN = (msg) => {
    DisplayNotification("Error", msg, "danger", "top-center", 7000);
  };
  return (
    <Row className="p-2">
      <ReactNotifications />
      <Col md={12} lg={12} sm={12} xs={12}>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={12} lg={12} sm={12} xs={12} className="h-100">
            <BorderedCard MyStyle={{ width: "100%" }}>
              <p className="text-center h3 mt-2">SCORES COMPUTATION</p>
            </BorderedCard>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={12} lg={12} sm={12} xs={12}>
            <Enter_Scores Subjects={props.Subjects} Notify={displayN} />
            {/* <Tabs defaultActiveKey="Upload" id="uncontrolled-tab-example">
              <Tab
                eventKey="Enter"
                title="Enter Scores"

                // className={classes.margin4printing}
              >
               
              </Tab>
              <Tab
                eventKey="Upload"
                title="Upload a File"
                // className={classes.margin4printing}
              >
                <Import_Scores_File
                  Subjects={props.Subjects}
                  Notify={displayN}
                />
              </Tab>
            </Tabs> */}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Compute_Scores;
