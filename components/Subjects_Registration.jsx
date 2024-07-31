"use client";
import React, { useState, useEffect, useContext } from "react";
import PermissionContext from "@/Store/permission-context";
import { AutoComplete } from "rsuite";
import "rsuite/dist/rsuite.css";
import axioscall from "./API_Call/axioscall";
import { DisplayNotification } from "./Notification";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import classes from "./Subjects_Registration.module.css";
import Session from "./SessionTermClass/Session";
import Class from "./SessionTermClass/Class";
import Processing_Modal from "./ModalsAndAlerts/Processing_Modal";
import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import Image from "next/image";
import Cookies from "universal-cookie";

const Subjects_Registration = (props) => {
  const cookies = new Cookies();
  const [Message, setMessage] = useState("");
  const [AllStds, setAllStds] = useState([]);
  const [AllStdsIds, setAllStdsIds] = useState([]);
  const [AllStdsPixUrls, setAllStdsPixUrls] = useState([]);
  const [AllSubjects, setAllSubjects] = useState([]);
  const [AllPreviouslyRegisteredSubjects, setAllPreviouslyRegisteredSubjects] =
    useState([]);
  const [
    ActivePreviouslyRegisteredSubjects,
    setActivePreviouslyRegisteredSubjects,
  ] = useState([]);
  const [
    InactivePreviouslyRegisteredSubjects,
    setInactivePreviouslyRegisteredSubjects,
  ] = useState([]);
  const [SuggestedSubjects, setSuggestedSubjects] = useState([]);
  const [PickedStudentName, setPickedStudentName] = useState("");
  const [PickedStudentSid, setPickedStudentSid] = useState("");
  const [PixUrl, setPixUrl] = useState("");
  const [session, setsession] = useState("Select");
  const [claz, setclaz] = useState("Select");
  const [activateSelector, setactivateSelector] = useState(false);
  const [activateButton, setactivateButton] = useState(false);
  const [showProcessing, setshowProcessing] = useState(false);
  const [displaySubjects, setdisplaySubjects] = useState(false);
  const [PickedSubjectsNumber, setPickedSubjectsNumber] = useState(0);
  const [PickedSubjects, setPickedSubjects] = useState([]);
  const TheColor = "brown";
  const PCtx = useContext(PermissionContext);
  useEffect(() => {
    PCtx.setMenuClicked(false);
  }, []);
  useEffect(() => {
    const activateTheButton = () => {
      if (session != "Select" && claz != "Select") {
        setactivateButton(true);
      } else {
        setactivateButton(false);
      }
      setPickedSubjects([]);
      setdisplaySubjects(false);
    };
    activateTheButton();
  }, [session, claz]);

  useEffect(() => {
    const AllNms = JSON.parse(props.Stds);
    setAllStds(AllNms.AllStudentsNames);
    setAllStdsIds(AllNms.AllSttudentsID);
    setAllStdsPixUrls(AllNms.AllPictureUrl);

    const AllSubs = JSON.parse(props.Subjects);
    setAllSubjects(AllSubs);
  }, []);

  const getStudentPicked = (snm) => {
    setPickedStudentName(snm);
    setPickedStudentSid(AllStdsIds[AllStds.indexOf(snm)]);
    setPixUrl(AllStdsPixUrls[AllStds.indexOf(snm)]);
    if (AllStds.includes(snm)) {
      setactivateSelector(true);
    } else {
      setactivateSelector(false);
      setsession("Select");
      setclaz("Select");
      setPickedSubjects([]);
      setdisplaySubjects(false);
    }
  };

  const BringOutSubjects = async (e) => {
    e.preventDefault();
    setMessage(`The system is loading ${PickedStudentName}'s subjects`);
    setshowProcessing(true);
    let AllAlreadyRegistered = [];
    let AlreadyRegistered = [];
    let InactiveAlreadyRegistered = [];

    let StData = {
      SID: PickedStudentSid,
      Session: session,
      Claz: claz,
    };

    const AlreadyRegisteredString = await axioscall(
      "load_students_registered_subjects",
      StData
    );

    if (AlreadyRegisteredString != "Error") {
      const AR = JSON.parse(AlreadyRegisteredString);
      const AlreadyReg = AR.AlreadyRegistered;

      AlreadyReg.forEach((element) => {
        AllAlreadyRegistered = [...AllAlreadyRegistered, element.subject_name];
        if (element.status === "Active") {
          AlreadyRegistered = [...AlreadyRegistered, element.subject_name];
        } else {
          InactiveAlreadyRegistered = [
            ...InactiveAlreadyRegistered,
            element.subject_name,
          ];
        }
      });
      setAllPreviouslyRegisteredSubjects(AllAlreadyRegistered);
      setActivePreviouslyRegisteredSubjects(AlreadyRegistered);
      setPickedSubjects(AlreadyRegistered);
      setInactivePreviouslyRegisteredSubjects(InactiveAlreadyRegistered);
    }
    let SSub = [];
    if (claz.includes("JS")) {
      SSub = AllSubjects.filter(
        (sub) => sub.subject_type === "All" || sub.subject_type === "Junior"
      );
    } else {
      SSub = AllSubjects.filter(
        (sub) => sub.subject_type === "All" || sub.subject_type === "Senior"
      );
    }

    SSub = SSub.map((sj) => ({
      ...sj,
      status: AlreadyRegistered.includes(sj.subject_name) ? true : false,
    }));

    var m = 0;
    var alrdpkd = [];
    SSub.forEach(async (element) => {
      if (element.status) {
        m++;
        alrdpkd = [...alrdpkd, element];
      }
    });

    setPickedSubjectsNumber(m);
    setSuggestedSubjects(SSub);
    setdisplaySubjects(true);
    setshowProcessing(false);
  };

  const SaveRegisteredSubjects = async () => {
    setMessage(
      `The system is saving ${PickedStudentName}'s registered subjects`
    );
    setshowProcessing(true);

    let AddedSubjects = [];
    let DeletedSubjects = [];
    let RetainedSubjects = [];
    let InactiveMadeActive = [];

    RetainedSubjects = ActivePreviouslyRegisteredSubjects.filter((el) =>
      PickedSubjects.includes(el)
    );

    InactiveMadeActive = PickedSubjects.filter((el) =>
      InactivePreviouslyRegisteredSubjects.includes(el)
    );

    DeletedSubjects = ActivePreviouslyRegisteredSubjects.filter(
      (el) => !PickedSubjects.includes(el)
    );

    AddedSubjects = PickedSubjects.filter(
      (el) => !AllPreviouslyRegisteredSubjects.includes(el)
    );

    let RegisteredDetails = {
      SID: PickedStudentSid,
      Session: session,
      Claz: claz,
      RegisteredSubjects: PickedSubjects,
      AddedSubjects: AddedSubjects,
      DeletedSubjects: DeletedSubjects,
      RetainedSubjects: RetainedSubjects,
      InactiveMadeActive: InactiveMadeActive,
    };

    let response = await axioscall(
      "save_registered_subjects",
      RegisteredDetails
    );
    if (response === "Saved Successfully") {
      setshowProcessing(false);
      DisplayNotification(
        "Success",
        PickedStudentName + "'s registered subjects saved succesfully!",
        "success",
        "top-center",
        5000
      );
      setdisplaySubjects(false);
      setPickedStudentName("");
      setactivateSelector(false);
      setsession("Select");
      setclaz("Select");
    } else {
      if (response === "Failed woefully") {
        setshowProcessing(false);
        DisplayNotification(
          "Error",
          PickedStudentName +
            "'s has been registered before. You can only add or delete subjects or change the student's class under the Change Class Menu",
          "danger",
          "top-center",
          7000
        );
      }
    }
  };

  const ChangeCheckboxStatus = (e, ind) => {
    let val = e.target.checked;

    let newArray = [...SuggestedSubjects];
    let nj = { ...newArray[ind], status: val };
    newArray[ind] = nj;
    setSuggestedSubjects(newArray);

    if (val) {
      setPickedSubjectsNumber(
        (prevPickedSubjectsNumber) => prevPickedSubjectsNumber + 1
      );

      setPickedSubjects([
        ...PickedSubjects,
        SuggestedSubjects[ind].subject_name,
      ]);
    } else {
      if (PickedSubjectsNumber > 0) {
        setPickedSubjectsNumber(
          (prevPickedSubjectsNumber) => prevPickedSubjectsNumber - 1
        );
        let sb = PickedSubjects.filter(
          (s) => s != SuggestedSubjects[ind].subject_name
        );
        setPickedSubjects(sb);
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
              <h4 className="text-center"> Subject Registration</h4>
            </Col>
          </Row>
          <hr />
          <Form onSubmit={BringOutSubjects}>
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
            </Row>
            <hr />
            <Row className="justify-content-around">
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
              <Col
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
              </Col>
              <hr className="d-md-none d-lg-none d-sm-block d-xs-block mt-3 mb-1" />
              <Col lg={3} md={3} sm={11} xs={11} className="text-center">
                <Form.Label
                  style={{
                    color: props.Color,
                    fontWeight: "bold",
                    visibility: "hidden",
                    display: "block",
                  }}
                >
                  Load Subject
                </Form.Label>
                <Button
                  variance="info"
                  type="submit"
                  disabled={!activateButton}
                >
                  Load Subjects
                </Button>
              </Col>
            </Row>
          </Form>
          <hr />
          {displaySubjects && (
            <Row className="justify-content-around">
              <Col md={12} lg={12} sm={12} xs={12}>
                <Row className="justify-content-around">
                  <Col md={12} lg={12} sm={12} xs={12}>
                    <h6
                      className={`text-center h6 mb-1  ${classes.subjectCheckBox}`}
                    >
                      Please pick the courses to be offered by{" "}
                      {PickedStudentName}
                    </h6>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form>
                      <Row>
                        <Col md={9} lg={9} xs={12} sm={12}>
                          <Row>
                            {SuggestedSubjects.map((sbj, index) => (
                              <Col lg={3} md={3} sm={11} xs={11} key={index}>
                                <Form.Check // prettier-ignore
                                  type="checkbox"
                                  label={sbj.subject_name}
                                  checked={sbj.status ? sbj.status : false}
                                  className={classes.subjectCheckBox}
                                  onChange={(e) =>
                                    ChangeCheckboxStatus(e, index)
                                  }
                                />
                              </Col>
                            ))}
                          </Row>
                        </Col>
                        <Col md={3} lg={3} xs={12} sm={12}>
                          <Row className="justify-content-around">
                            <Col md={6} lg={6} xs={12} sm={12}>
                              <Image
                                src={PixUrl}
                                width={100}
                                height={120}
                                alt="StudentID"
                              />
                              <p className={classes.DisplayedName}>
                                {PickedStudentName}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                    <hr />
                    <Row className="justify-content-between">
                      <Col md={4} lg={4} sm={12} xs={12}>
                        <h6 className="h6">
                          Number of registered subject ={" "}
                          <Badge bg="danger">{PickedSubjectsNumber}</Badge>
                        </h6>
                      </Col>
                      <Col md={4} lg={4} sm={12} xs={12} className="text-right">
                        <Button
                          variant="success"
                          className="btn"
                          onClick={SaveRegisteredSubjects}
                        >
                          Save {PickedSubjectsNumber} Subjects
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
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

export default Subjects_Registration;
