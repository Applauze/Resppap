"use client";
import React, { useState, useEffect, useContext } from "react";
import PermissionContext from "@/Store/permission-context";
import axioscall from "./API_Call/axioscall";
import Session from "./SessionTermClass/Session";
import Class from "./SessionTermClass/Class";
import Term from "./SessionTermClass/Term";
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

const Class_Allocation = (props) => {
  const cookies = new Cookies();
  const [session, setsession] = useState("Select");
  const [claz, setclaz] = useState("Select");
  const [term, setterm] = useState("Select");
  const [Teachername, setTeachername] = useState("");

  const [LoadedTeachers, setLoadedTeachers] = useState([]);
  const [AllTheTeachers, setAllTheTeachers] = useState([]);
  const [AllTheTeachersID, setAllTheTeachersID] = useState([]);

  const [activateSelector, setactivateSelector] = useState(true);
  const [activateButton, setactivateButton] = useState(false);
  const [showProcessing, setshowProcessing] = useState(false);
  const [Message, setMessage] = useState("");
  const PCtx = useContext(PermissionContext);

  useEffect(() => {
    PCtx.setMenuClicked(false);
  }, []);

  useEffect(() => {
    const AllTeachers = JSON.parse(props.TeachersNames);
    setLoadedTeachers(AllTeachers);

    setAllTheTeachersID(AllTeachers.AllTeachersID);
    setAllTheTeachers(AllTeachers.AllTeachersNames);
  }, []);

  useEffect(() => {
    const activateTheButton = () => {
      if (session != "Select" && claz != "Select" && term != "Select") {
        setactivateButton(true);
      } else {
        setactivateButton(false);
      }
    };

    activateTheButton();
  }, [session, claz, term]);

  const AuthorizeTeacher = async (e) => {
    e.preventDefault();
    setshowProcessing(true);
    setMessage(`The system is authorizing ${Teachername}`);
    let m = AllTheTeachers.indexOf(Teachername);
    console.log(m);
    let AllIDs = [...AllTheTeachersID];
    let Allocation = {
      TeacherID: AllIDs[m],
      Session: session,
      Term: term,
      Claz: claz,
    };

    let SaveTheAllocation = await axioscall(
      "save_class_teacher_allocation",
      Allocation
    );

    if (SaveTheAllocation === "Saved Successfully") {
      setshowProcessing(false);
      DisplayNotification(
        "Success",
        `${Teachername} successfully authorized for  ${claz}, ${term} Term, ${session} Session`,
        "success",
        "top-center",
        5000
      );

      setTeachername("");
      setterm("Select");
      setsession("Select");
      setclaz("Select");
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
                  CLASS TEACHER'S AUTHORIZATION
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

export default Class_Allocation;
