"use client";
import React, { useState, useEffect, useContext } from "react";
import PermissionContext from "@/Store/permission-context";
import { AutoComplete } from "rsuite";
import "rsuite/dist/rsuite.css";
import axioscall from "./API_Call/axioscall";
import { DisplayNotification } from "./Notification";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import classes from "./Change_Class.module.css";
import Session from "./SessionTermClass/Session";
import ButtonBackground from "./Inputs/ButtonBackground";
import Class from "./SessionTermClass/Class";
import Processing_Modal from "./ModalsAndAlerts/Processing_Modal";
import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import Cookies from "universal-cookie";

const Change_Class = (props) => {
  const [Message, setMessage] = useState("");
  const [Pclass, setPclass] = useState("");
  const [newclaz, setnewclaz] = useState("");
  const [AllStds, setAllStds] = useState([]);
  const [AllStdsIds, setAllStdsIds] = useState([]);
  const [PickedStudentName, setPickedStudentName] = useState("");
  const [PickedStudentSid, setPickedStudentSid] = useState("");
  const [session, setsession] = useState("Select");
  const [claz, setclaz] = useState("Select");
  const [activateSelector, setactivateSelector] = useState(false);
  const [activateButton, setactivateButton] = useState(false);
  const [showProcessing, setshowProcessing] = useState(false);
  const [displayChangeOptions, setdisplayChangeOptions] = useState(false);
  const cookies = new Cookies();
  const TheColor = "brown";
  const PCtx = useContext(PermissionContext);

  useEffect(() => {
    PCtx.setMenuClicked(false);
  }, []);
  useEffect(() => {
    const activateTheButton = () => {
      if (session != "Select") {
        setactivateButton(true);
      } else {
        setactivateButton(false);
      }
    };
    setdisplayChangeOptions(false);
    activateTheButton();
  }, [session]);

  useEffect(() => {
    const AllNms = JSON.parse(props.Stds);
    setAllStds(AllNms.AllStudentsNames);
    setAllStdsIds(AllNms.AllSttudentsID);
  }, []);

  const getStudentPicked = (snm) => {
    setPickedStudentName(snm);
    setPickedStudentSid(AllStdsIds[AllStds.indexOf(snm)]);
    if (AllStds.includes(snm)) {
      setactivateSelector(true);
    } else {
      setactivateSelector(false);
      setsession("Select");
      setclaz("Select");
    }
  };

  const BringOutClass = async (e) => {
    e.preventDefault();
    setMessage(`The system is loading ${PickedStudentName}'s present class`);
    setshowProcessing(true);

    let StData = {
      SID: PickedStudentSid,
      Session: session,
    };

    const ClassInSession = await axioscall("get_present_class", StData);

    console.log(ClassInSession);
    setPclass(ClassInSession);
    setdisplayChangeOptions(true);
    setshowProcessing(false);
  };

  const ChangeTheClass = async () => {
    if (Pclass === newclaz) {
      DisplayNotification(
        "Error",
        `No change has been made to ${PickedStudentName} class. You have selected the same class as the previous class`,
        "warning",
        "top-center",
        5000
      );
    } else {
      setMessage(`The system is saving ${PickedStudentName}'s new class`);
      setshowProcessing(true);
      let newClassDetails = {
        SID: PickedStudentSid,
        Session: session,
        newClass: newclaz,
      };
      const ChangingClass = await axioscall(
        "change_student_class",
        newClassDetails
      );
      console.log(ChangingClass);
      setshowProcessing(false);
      if (!ChangingClass.includes("Failure")) {
        setdisplayChangeOptions(false);
        setsession("Select");
        DisplayNotification(
          "SUCCESS",
          `${PickedStudentName} new class changed successfully`,
          "success",
          "top-center",
          5000
        );
      } else {
        DisplayNotification(
          "ERROR",
          `${PickedStudentName} class could not be changed. Contact the Administrator for more help`,
          "danger",
          "top-center",
          5000
        );
      }
    }
  };

  return (
    <Container>
      <ReactNotifications />
      <Row>
        <Col md={12} lg={12} sm={12} xs={12}>
          <Row className="justify-content-around">
            <Col md={12} sm={12} lg={12} xs={12}>
              <h4 className="text-center"> CHANGE STUDENT'S CLASS</h4>
            </Col>
          </Row>
          <hr />
          <Form onSubmit={BringOutClass}>
            <Row className="justify-content-around">
              <Col lg={6} md={6} sm={11} xs={11}>
                <Form.Group>
                  <Form.Label style={{ color: "brown" }}>
                    Student's Name
                  </Form.Label>

                  <AutoComplete
                    data={AllStds}
                    value={PickedStudentName}
                    onChange={getStudentPicked}
                    onSelect={getStudentPicked}
                    style={{
                      border: "1px solid brown",
                      backgroundColor: "#b3ff66",
                      borderRadius: "3px",
                    }}
                  />
                </Form.Group>
              </Col>
              <hr className="d-md-none d-lg-none d-sm-block d-xs-block mt-3 mb-1" />
              <Col
                lg={3}
                md={3}
                sm={11}
                xs={11}
                className="align-items-center text-center "
              >
                <Session
                  Session={session}
                  setSession={setsession}
                  Disabled={!activateSelector}
                />
              </Col>
              <hr className="d-md-none d-lg-none d-sm-block d-xs-block mt-3 mb-1" />
            </Row>
            <hr />
            <Row className="justify-content-end">
              {/* <Col
                lg={3}
                md={3}
                sm={11}
                xs={11}
                className="align-items-center text-center "
              >
                <Class
                  Claz={claz}
                  setClaz={setclaz}
                  Disabled={!activateSelector}
                />
              </Col> */}
              <hr className="d-md-none d-lg-none d-sm-block d-xs-block mt-3 mb-1" />
              <Col lg={3} md={3} sm={11} xs={11} className="text-center">
                <ButtonBackground
                  ButtonName="Load Class"
                  ButtonType="submit"
                  ButtonAction={BringOutClass}
                  ButtonDisable={!activateButton}
                />
              </Col>
            </Row>
          </Form>
          <hr />

          {displayChangeOptions && (
            <Row className="justify-content-around">
              <Col lg={6} md={6} sm={11} xs={11}>
                <p className={classes.hhh}>
                  {PickedStudentName} Class in {session} Session is:{" "}
                  <b>{Pclass}</b>
                </p>
              </Col>
              <Col lg={6} md={6} sm={11} xs={11}>
                <p className={classes.hhh}>Change Class to : </p>
                <Class
                  Claz={newclaz}
                  setClaz={setnewclaz}
                  Disabled={!activateSelector}
                />
              </Col>
            </Row>
          )}
          <hr />
          {displayChangeOptions && (
            <Row className="justify-content-end">
              <Col lg={3} md={3} sm={11} xs={11}>
                <ButtonBackground
                  ButtonName="Change Class"
                  ButtonAction={ChangeTheClass}
                />
              </Col>
            </Row>
          )}
        </Col>
        <Processing_Modal
          Show={showProcessing}
          message={Message}
          variant="success"
          size="sm"
        />
      </Row>
    </Container>
  );
};

export default Change_Class;
