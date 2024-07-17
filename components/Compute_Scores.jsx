"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { ReactNotifications } from "react-notifications-component";
import Import_Scores_File from "./Import_Scores_File";
import Enter_Scores from "./Enter_Scores";
import Cookies from "universal-cookie";
import Login_Page from "./Login_Page";
const Compute_Scores = (props) => {
  const cookies = new Cookies();
  return (
    <Container>
      <ReactNotifications />
      <Row>
        <Col md={11} lg={11} sm={11} xs={11}>
          <h4 className="text-center h4">SCORES COMPUTATION</h4>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={12} lg={12} sm={12} xs={12}>
          <Tabs defaultActiveKey="Upload" id="uncontrolled-tab-example">
            <Tab
              eventKey="Upload"
              title="Upload a File"
              // className={classes.margin4printing}
            >
              <Import_Scores_File Subjects={props.Subjects} />
            </Tab>

            <Tab
              eventKey="Enter"
              title="Enter Scores"

              // className={classes.margin4printing}
            >
              <Enter_Scores Subjects={props.Subjects} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Compute_Scores;
