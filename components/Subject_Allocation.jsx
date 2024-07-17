"use client";
import React, { useState, useEffect } from "react";
import axioscall from "./API_Call/axioscall";
import Session from "./SessionTermClass/Session";
import Class from "./SessionTermClass/GeneralClass";
import Term from "./SessionTermClass/Term";
import Subjects from "./SessionTermClass/Subjects";
import { ReactNotifications } from "react-notifications-component";
import { DisplayNotification } from "./Notification";
import "react-notifications-component/dist/theme.css";
import OK_Modal from "./ModalsAndAlerts/OK_Modal";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import BorderedCardNoHover from "./Cards/BorderedCardNoHover";
import Processing_Modal from "./ModalsAndAlerts/Processing_Modal";
import { AutoComplete, Divider } from "rsuite";
import "rsuite/dist/rsuite.css";
import Cookies from "universal-cookie";
import Login_Page from "./Login_Page";

const Subject_Allocation = (props) => {
  const cookies = new Cookies();
  const [session, setsession] = useState("Select");
  const [claz, setclaz] = useState("Select");
  const [term, setterm] = useState("Select");
  const [Teachername, setTeachername] = useState("");
  const [LoadedSubjects, setLoadedSubjects] = useState([]);
  const [LoadedTeachers, setLoadedTeachers] = useState([]);
  const [AllTheTeachers, setAllTheTeachers] = useState([]);
  const [AllTheTeachersID, setAllTheTeachersID] = useState([]);
  const [AllServerSubjects, setAllServerSubjects] = useState([]);
  const [pickedSubject, setpickedSubject] = useState("Select");
  const [activateSelector, setactivateSelector] = useState(true);
  const [activateButton, setactivateButton] = useState(false);
  const [showProcessing, setshowProcessing] = useState(false);
  const [Message, setMessage] = useState("");
  useEffect(() => {
    const AllSubs = JSON.parse(props.Subjects);
    setAllServerSubjects(AllSubs);
    const AllTeachers = JSON.parse(props.TeachersNames);
    setLoadedTeachers(AllTeachers);
    console.log(AllTeachers);
    setAllTheTeachersID(AllTeachers.AllTeachersID);
    setAllTheTeachers(AllTeachers.AllTeachersNames);
  }, []);

  useEffect(() => {
    if (claz.includes("JS")) {
      setLoadedSubjects(GetClassSubjects("Junior"));
    } else {
      setLoadedSubjects(GetClassSubjects("Senior"));
    }
  }, [claz]);

  useEffect(() => {
    const activateTheButton = () => {
      if (
        session != "Select" &&
        claz != "Select" &&
        pickedSubject != "Select" &&
        term != "Select"
      ) {
        setactivateButton(true);
      } else {
        setactivateButton(false);
      }
    };

    activateTheButton();
  }, [session, claz, term, pickedSubject]);

  const GetClassSubjects = (clx) => {
    let DisplayedSubjects = [];
    let AllRSub = AllServerSubjects.filter(
      (el) => el.subject_type === "All" || el.subject_type === clx
    );
    AllRSub.forEach((element) => {
      DisplayedSubjects = [...DisplayedSubjects, element.subject_name];
    });
    return DisplayedSubjects;
  };

  const AuthorizeTeacher = async (e) => {
    e.preventDefault();
    setshowProcessing(true);
    setMessage(`The system is authorizing ${Teachername}`);
    let m = AllTheTeachers.indexOf(Teachername);
    console.log(m);
    let AllIDs = [...AllTheTeachersID];
    let Allocation = {
      TeacherID: AllIDs[m],
      Subject: pickedSubject,
      Session: session,
      Term: term,
      Claz: claz,
    };

    let SaveTheAllocation = await axioscall(
      "save_subject_teacher_allocation",
      Allocation
    );

    if (SaveTheAllocation === "Saved Successfully") {
      setshowProcessing(false);
      DisplayNotification(
        "Success",
        `${Teachername} successfully authorized for ${pickedSubject} in ${claz} for ${term} Term, ${session} Session`,
        "success",
        "top-center",
        5000
      );

      setTeachername("");
      setterm("Select");
      setsession("Select");
      setclaz("Select");
      setpickedSubject("Select");
    }
  };

  const getTeachernameSelection = async (it) => {
    setTeachername(it);
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
                <h4 className="text-center h4">
                  SUBJECT TEACHER'S AUTHORIZATION
                </h4>
              </Col>
            </Row>
            <hr />
            <Row className="justify-content-around">
              <Col md={6}>
                <Form.Group>
                  <Form.Label style={{ color: "brown" }}>
                    Teacher's Name
                  </Form.Label>
                  <AutoComplete
                    data={AllTheTeachers}
                    value={Teachername}
                    onChange={setTeachername}
                    onSelect={getTeachernameSelection}
                  />
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <Row>
              <Form onSubmit={AuthorizeTeacher}>
                <Row className="justify-content-around">
                  <Col lg={3} md={3} sm={11} xs={11} className=" ">
                    <Session
                      Session={session}
                      setSession={setsession}
                      Disabled={!activateSelector}
                    />
                  </Col>
                  <Col lg={3} md={3} sm={11} xs={11}>
                    <Term
                      Term={term}
                      setTerm={setterm}
                      Disabled={!activateSelector}
                    />
                  </Col>

                  <hr className="d-md-none d-lg-none d-sm-block d-xs-block mt-3 mb-1" />
                  <Col lg={3} md={3} sm={11} xs={11}>
                    <Class
                      Claz={claz}
                      setClaz={setclaz}
                      Disabled={!activateSelector}
                    />
                  </Col>
                  <hr className="d-md-none d-lg-none d-sm-block d-xs-block mt-3 mb-1" />
                  <Col lg={3} md={3} sm={11} xs={11}>
                    <Subjects
                      Subject={pickedSubject}
                      setSubject={setpickedSubject}
                      Disabled={!activateSelector}
                      TheSubjects={LoadedSubjects}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col
                    lg={3}
                    md={3}
                    sm={11}
                    xs={11}
                    className="mt-2 col-offset-9"
                  >
                    <Button
                      variance="info"
                      type="submit"
                      disabled={!activateButton}
                    >
                      Authorize
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Row>
          </BorderedCardNoHover>
        </Col>
      </Row>
      <Processing_Modal
        Show={showProcessing}
        message={Message}
        variant="success"
        size="sm"
      />
    </Container>
  );
};

export default Subject_Allocation;
