"use client";
import React, { useState, useEffect, useRef } from "react";
import Session from "./SessionTermClass/Session";
import Class from "./SessionTermClass/Class";
import Term from "./SessionTermClass/Term";
import ButtonBackground from "./Inputs/ButtonBackground";
import Processing_Modal from "./ModalsAndAlerts/Processing_Modal";
import classes from "./View_Pins.module.css";
import QRCode from "qrcode.react";
import generatePDF from "react-to-pdf";
import Image from "next/image";
import "./bootstrap.css";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  ListGroup,
} from "react-bootstrap";
import axioscall from "./API_Call/axioscall";
import { DisplayNotification } from "./Notification";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import BorderedCardNoHover from "./Cards/BorderedCardNoHover";
import Cookies from "universal-cookie";
import SchoolLogo from "./Images/schoollogo.png";

const Display_Results = () => {
  const [session, setsession] = useState("Select");
  const [claz, setclaz] = useState("Select");
  const [term, setterm] = useState("Select");
  const [showProcessing, setshowProcessing] = useState(false);
  const [Message, setMessage] = useState("");
  const [QRCodeString, setQRCodeString] = useState("");
  const [activateSelector, setactivateSelector] = useState(true);
  const [activateButton, setactivateButton] = useState(false);
  const [displayStudents, setdisplayStudents] = useState(false);
  const [RetrievedPINS, setRetrievedPINS] = useState([]);

  const [ct_remark, setct_remark] = useState("");
  const [p_remark, setp_remark] = useState("");
  const [DisplayCardPanel, setDisplayCardPanel] = useState(false);
  const [DisplayMainCard, setDisplayMainCard] = useState(false);
  const [st_id, setst_id] = useState("");
  const [Fullname, setFullname] = useState("");
  const [DisplayMode, setDisplayMode] = useState("Print");
  const targetRef = useRef();

  useEffect(() => {
    const activateTheButton = () => {
      if (session != "Select" && claz != "Select" && term != "Select") {
        setactivateButton(true);
      } else {
        setactivateButton(false);
      }
    };
    setdisplayStudents(false);
    activateTheButton();
  }, [session, claz, term]);

  useEffect(() => {
    if (DisplayMode === "PDF") {
      generatePDF(targetRef, {
        filename: `${Fullname}`,
        page: {
          format: "A4",
        },
        resolution: 1,
      });
      setDisplayMode("Print");
    }
  }, [DisplayMode]);

  const GetThePins = async (e) => {
    e.preventDefault();
    let PinInfo = { Session: session, Term: term, Claz: claz };
    let PINDetails = await axioscall("get_class_pins", PinInfo);

    if (PINDetails === "Error") {
    } else {
      var CryptoJS = require("crypto-js");
      var ConvertedPINS = [];
      PINDetails.forEach((element) => {
        var bytes = CryptoJS.AES.decrypt(element.gate, "Applause143");
        var Allowance = bytes.toString(CryptoJS.enc.Utf8);

        let newelement = { ...element, gate: Allowance };
        ConvertedPINS = [...ConvertedPINS, newelement];
      });

      setRetrievedPINS(ConvertedPINS);
    }
  };

  const PrintPins = () => {
    window.print();
  };

  return (
    <div fluid className={classes.Margin4Print}>
      <ReactNotifications />
      <div>
        <BorderedCardNoHover MyStyle={{ borderRadius: "0px" }}>
          <Row className={classes.Hide4Print}>
            <Col md={12} lg={12} sm={11} xs={11}>
              <h4 className="text-center h4">DISPLAY STUDENTS PIN</h4>
            </Col>
          </Row>
          {/* <hr /> */}
          <Row className={classes.Hide4Print}>
            <Form onSubmit={GetThePins}>
              <Row className="justify-content-around">
                <Col md={12} lg={12} sm={11} xs={11}>
                  <h6 className="text-center h6">
                    Please fill in the details of the class you want to work on
                  </h6>
                </Col>
                <hr />
                <Col lg={4} md={4} sm={11} xs={11} className=" ">
                  <Session
                    Session={session}
                    setSession={setsession}
                    Disabled={!activateSelector}
                  />
                </Col>
                <Col lg={4} md={4} sm={11} xs={11}>
                  <Term
                    Term={term}
                    setTerm={setterm}
                    Disabled={!activateSelector}
                  />
                </Col>

                <hr className="d-md-none d-lg-none d-sm-block d-xs-block mt-3 mb-1" />
                <Col lg={4} md={4} sm={11} xs={11}>
                  <Class
                    Claz={claz}
                    setClaz={setclaz}
                    Disabled={!activateSelector}
                  />
                </Col>
                <hr className="d-md-none d-lg-none d-sm-block d-xs-block mt-3 mb-1" />
              </Row>
              <Row className="justify-content-end">
                <Col
                  lg={3}
                  md={3}
                  sm={11}
                  xs={11}
                  className="mt-2 col-offset-9"
                >
                  <ButtonBackground
                    ButtonType="submit"
                    ButtonDisable={!activateButton}
                    ButtonName="Retrieve Students"
                  />
                </Col>
              </Row>
            </Form>
          </Row>
        </BorderedCardNoHover>
        <Row className="justify-content-around p-3">
          <Col md={12} lg={12} sm={12}>
            {`RESULT CHECKING DETAILS FOR ${claz} IN ${term.toUpperCase()} TERM , ${session} SESSION`}
          </Col>
          <hr />
          {RetrievedPINS.map((pd, index) => (
            <Col md={6} lg={6} sm={12}>
              <div className={classes.PinColumn}>
                <p className="text-center my-0">EAUED MODEL HIGH SCHOOL, OYO</p>
                <h6 className="text-center">RESULT CHECKING DETAILS</h6>
                <h6>{`${pd.surname} ${pd.firstname} ${pd.middlename}`}</h6>
                <p className={classes.PinP}>STUDENT ID: {pd.student_id}</p>
                <p className={classes.PinP}>SESSION: {pd.Session}</p>
                <p className={classes.PinP}>TERM: {pd.Term}</p>
                <p className={classes.PinP}>CLASS: {pd.Class}</p>
                <p className={classes.PinP}>PIN: {pd.gate}</p>
                <hr />
                <p className={classes.PINUrl}>
                  visit: https://eauedmhs.com.ng/resultchecker
                </p>
              </div>
            </Col>
          ))}
        </Row>
        <Row className={classes.Hide4Print}>
          <Col md={12} lg={12} sm={12}>
            <ButtonBackground
              type="button"
              ButtonName="PRINT"
              ButtonCss={{ marginTop: "7px" }}
              ButtonAction={PrintPins}
            />
          </Col>
        </Row>
      </div>
      <Processing_Modal
        Show={showProcessing}
        message={Message}
        variant="success"
        size="sm"
      />
    </div>
  );
};

export default Display_Results;
