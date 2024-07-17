"use client";
import React, { useState, useEffect } from "react";
import Session from "./SessionTermClass/Session";
import Class from "./SessionTermClass/Class";
import Term from "./SessionTermClass/Term";
import ButtonBackground from "./Inputs/ButtonBackground";
import Processing_Modal from "./ModalsAndAlerts/Processing_Modal";
import classes from "./Compute_Reports.module.css";
import Image from "next/image";
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
import Login_Page from "./Login_Page";
import { Fraunces } from "next/font/google";

const Compute_Reports = () => {
  const cookies = new Cookies();
  const [session, setsession] = useState("Select");
  const [claz, setclaz] = useState("Select");
  const [term, setterm] = useState("Select");
  const [showProcessing, setshowProcessing] = useState(false);
  const [Message, setMessage] = useState("");
  const [activateSelector, setactivateSelector] = useState(true);
  const [activateButton, setactivateButton] = useState(false);
  const [displayStudents, setdisplayStudents] = useState(false);
  const [AllStudents, setAllStudents] = useState([]);
  const [RetrievedStudentDetails, setRetrievedStudentDetails] = useState([]);
  const [RetrievedSubjects, setRetrievedSubjects] = useState([]);
  const [RetrievedAttributes1, setRetrievedAttributes1] = useState([]);
  const [RetrievedAttributes2, setRetrievedAttributes2] = useState([]);
  const [ct_remark, setct_remark] = useState("");
  const [p_attendance, setp_attendance] = useState("");
  const [nexttermbegins, setnexttermbegins] = useState(0);
  const [schoolopens, setschoolopens] = useState(0);
  const [ResumptionCheck, setResumptionCheck] = useState(false);
  const [p_remark, setp_remark] = useState("");
  const [sel_ct_remark, setsel_ct_remark] = useState("Select");
  const [sel_p_remark, setsel_p_remark] = useState("Select");
  const [DisplayPOptions, setDisplayPOptions] = useState(false);
  const [DisplayCTOptions, setDisplayCTOptions] = useState(false);
  const [DisplayCardPanel, setDisplayCardPanel] = useState(false);
  const [DisplayMainCard, setDisplayMainCard] = useState(false);
  const [st_id, setst_id] = useState("");
  const [Fullname, setFullname] = useState("");
  const buttonBackground = {
    backgroundColor: "#003152",
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.2) ",
  };

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

  const GetThisStudentReport = async (element) => {
    setMessage(`The system is retrieving  ${element.Fullname}'s report`);
    setshowProcessing(true);
    setDisplayMainCard(false);

    let ThisStudentParam = {
      student_id: element.student_id,
      Session: session,
      Term: term,
      Claz: claz,
    };
    setst_id(element.student_id);

    let ThisStudentReportInJson = await axioscall(
      "load_this_student_report",
      ThisStudentParam
    );
    ThisStudentReportInJson = JSON.parse(ThisStudentReportInJson);

    ThisStudentParam = {
      ...ThisStudentParam,
      dob: element.dob,
      sex: element.sex,
      subjectsoffered: ThisStudentReportInJson.ThisStudentScores,
      alltheattributes: ThisStudentReportInJson.ThisStudentAttributes,
      allthecomments: ThisStudentReportInJson.ThisStudentComments,
      termproperties: ThisStudentReportInJson.ThisTermProperties,
      nic: element.nic,
      Fullname: element.Fullname,
      PixUrl: element.pixurl,
    };
    setFullname(element.Fullname);

    let PsychoAttributes = ThisStudentReportInJson.ThisStudentAttributes;
    let AllComments = ThisStudentReportInJson.ThisStudentComments;
    let AllTermProp = ThisStudentReportInJson.ThisTermProperties;
    let n = Math.ceil(PsychoAttributes.length / 2) + 1;

    setRetrievedStudentDetails(ThisStudentParam);
    setRetrievedSubjects(ThisStudentReportInJson.ThisStudentScores);
    setRetrievedAttributes1(PsychoAttributes.slice(0, n));
    setRetrievedAttributes2(PsychoAttributes.slice(n));
    setDisplayMainCard(true);
    setshowProcessing(false);
    setct_remark(
      AllComments[0][`${term}_term_ctc`]
        ? AllComments[0][`${term}_term_ctc`]
        : ""
    );
    setp_remark(
      AllComments[0][`${term}_term_pc`] ? AllComments[0][`${term}_term_pc`] : ""
    );

    setp_attendance(
      AllComments[0][`${term}_term_attendance`]
        ? AllComments[0][`${term}_term_attendance`]
        : ""
    );

    if (AllTermProp.length < 1) {
      setResumptionCheck(false);
    } else {
      setnexttermbegins(AllTermProp[0]["Resumption"]);
      setschoolopens(AllTermProp[0]["SchoolOpens"]);
      setResumptionCheck(true);
    }
    // setRetrievedComments(ThisStudentReportInJson.ThisStudentComments);
  };

  const GetTheStudents = async (e) => {
    e.preventDefault();
    setMessage(`The system is retrieving the students in ${claz}`);
    setshowProcessing(true);
    let TeacherID = cookies.get("this_staff");
    let Category = cookies.get("this_category");

    let ReportsParam = {
      Session: session,
      Term: term,
      Claz: claz,
      TeacherID: TeacherID ? TeacherID : "Nothing",
      Category: Category ? Category : "Nothing",
    };

    let StudentsInJson = await axioscall(
      "load_students_for_reports",
      ReportsParam
    );

    if (!StudentsInJson.includes("Not Authorized")) {
      if (!StudentsInJson.includes("Error")) {
        StudentsInJson = JSON.parse(StudentsInJson);
        let AllStds = [];
        let NIC = StudentsInJson.AllStudents.length;
        StudentsInJson.AllStudents.forEach((element) => {
          AllStds = [
            ...AllStds,
            {
              Fullname: `${element.surname} ${element.firstname} ${element.middlename}`,
              student_id: element.student_id,
              dob: element.dob,
              sex: element.sex,
              nic: NIC,
              pixurl: element.picture_directory,
            },
          ];
        });
        setAllStudents(AllStds);
        setDisplayCardPanel(true);
      } else {
        DisplayNotification(
          "Error",
          `No student has been registered in this class`,
          "danger",
          "top-center",
          5000
        );
      }
    } else {
      DisplayNotification(
        "Error",
        `You are not an authorized teacher for the selected class. Please contact the Administrator`,
        "danger",
        "top-center",
        7000
      );
    }
    setshowProcessing(false);
  };

  const StudentDescription = (LABEL, value, colsp) => {
    return (
      <Col md={colsp} lg={colsp} xs={11} sm={11}>
        <p className="small py-0 my-0">
          <span className={classes.mylabel}>{LABEL}</span>:{" "}
          <span
            className={LABEL === "NAME" ? classes.myvalueName : classes.myvalue}
          >
            {value}
          </span>
        </p>
      </Col>
    );
  };

  const StudentDescription1 = (LABEL, colsp) => {
    return (
      <Col md={colsp} lg={colsp} xs={11} sm={11}>
        <p className="small py-0 my-0">
          <span className={classes.mylabel}>
            {LABEL}

            <Form.Control
              type="text"
              value={schoolopens}
              onChange={(e) => {
                !isNaN(e.target.value) && setschoolopens(e.target.value);
              }}
              name="PT1"
              style={{
                width: "60px",
                height: "30px",
                display: "inline-block",
                marginLeft: "2px",
                paddingLeft: "10px",
                border: "1px solid brown",
                borderRadius: "3px",
              }}
            />
          </span>
        </p>
      </Col>
    );
  };
  const StudentDescription2 = (LABEL, colsp) => {
    return (
      <Col md={colsp} lg={colsp} xs={11} sm={11}>
        <p className="small py-0 my-0">
          <span className={classes.mylabel}>
            {LABEL}

            <Form.Control
              type="text"
              value={p_attendance}
              onChange={(e) => {
                !isNaN(e.target.value) && setp_attendance(e.target.value);
              }}
              name="PT2"
              style={{
                width: "60px",
                height: "30px",
                display: "inline-block",
                marginLeft: "2px",
                paddingLeft: "10px",
                border: "1px solid brown",
                borderRadius: "3px",
              }}
            />
          </span>
        </p>
      </Col>
    );
  };
  const StudentDescription3 = (LABEL, colsp) => {
    return (
      <Col md={colsp} lg={colsp} xs={11} sm={11}>
        <p className="small py-0 my-0">
          <span className={classes.mylabel}>
            {LABEL}

            <Form.Control
              type="text"
              value={nexttermbegins}
              onChange={(e) => {
                setnexttermbegins(e.target.value);
              }}
              name="PT3"
              style={{
                width: "150px",
                paddingLeft: "10px",
                height: "30px",
                display: "inline-block",
                marginLeft: "2px",
                border: "1px solid brown",
                borderRadius: "3px",
              }}
            />
          </span>
        </p>
      </Col>
    );
  };

  const RotatedHeading = (tam, ThirdText, OtherText) => {
    return (
      <td className={`${classes.RotatedHeading} ${classes.BoldTableHeading}`}>
        {tam === "Third" ? ThirdText : OtherText}
      </td>
    );
  };

  const ChangeTheAttribute = (TheArray, val, Inc) => {
    let AllAtt =
      TheArray === 1 ? [...RetrievedAttributes1] : [...RetrievedAttributes2];
    let TheAffected = { ...AllAtt[Inc] };
    TheAffected[`${term}_term_value`] = val;
    AllAtt[Inc] = TheAffected;
    TheArray === 1
      ? setRetrievedAttributes1(AllAtt)
      : setRetrievedAttributes2(AllAtt);
  };

  const StudentAttributes = (n, ATT, RIndx) => {
    return (
      <tr key={RIndx}>
        <td className={`py-1 ${classes.TheAttributes}`}>
          {ATT[`${term}_term_attribute`]}
        </td>

        {[1, 2, 3, 4, 5].map((vl, index) => (
          <td key={index} className={`py-0 ${classes.TheAttributes}`}>
            <Form.Check
              name={ATT[`${term}_term_attribute`]}
              value={vl}
              checked={parseInt(vl) === parseInt(ATT[`${term}_term_value`])}
              type="radio"
              onChange={(e) => ChangeTheAttribute(n, e.target.value, RIndx)}
            />
          </td>
        ))}
      </tr>
    );
  };

  const InfoTable = (left, right) => {
    return (
      <tr>
        <td className={classes.InfoTableLeft}>{left}</td>
        <td className={classes.InfoTableRight}>{right}</td>
      </tr>
    );
  };

  const ChangeCTComment = (vl) => {
    setct_remark(vl);
    setsel_ct_remark("Select");
  };
  const ChangePComment = (vl) => {
    setp_remark(vl);
    setsel_p_remark("Select");
  };

  const SaveTheReport = async () => {
    setMessage(`The system is saving ${Fullname}'s Reports`);
    setshowProcessing(true);
    let MergedAttributes = RetrievedAttributes1.concat(RetrievedAttributes2);
    let NewStudentParam = {
      student_id: st_id,
      Session: session,
      Term: term,
      Claz: claz,
      AllAttributes: MergedAttributes,
      CTComment: ct_remark,
      PComment: p_remark,
      PresentTimes: p_attendance,
      SchoolOpens: schoolopens,
      Resumption: nexttermbegins,
      ResumptionCheck: ResumptionCheck,
    };
    let SaveTheReports = await axioscall("save_all_reports", NewStudentParam);
    if (SaveTheReports === "Saved Successfully") {
      DisplayNotification(
        "Success",
        `${Fullname}'s reports have been succesfully saved`,
        "success",
        "top-center",
        5000
      );
      setDisplayMainCard(false);
      setshowProcessing(false);
    } else {
      DisplayNotification(
        "Error",
        `Error in saving ${Fullname}'s reports. Please contact the administrator`,
        "danger",
        "top-center",
        5000
      );
    }
  };

  return (
    <Container fluid>
      <ReactNotifications />
      <BorderedCardNoHover MyStyle={{ borderRadius: "0px" }}>
        <Row>
          <Col md={12} lg={12} sm={11} xs={11}>
            <h4 className="text-center h4">REPORTS COMPUTATION</h4>
          </Col>
        </Row>
        {/* <hr /> */}
        <Row>
          <Form onSubmit={GetTheStudents}>
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
            <hr />
            <Row className="justify-content-end">
              <Col lg={3} md={3} sm={11} xs={11} className="mt-2 col-offset-9">
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
      {DisplayCardPanel && (
        <Row className={classes.PanelContainer}>
          <Col md={3} lg={3} sm={11} xs={11}>
            <BorderedCardNoHover MyStyle={{ borderRadius: "0px" }}>
              <h6 className={classes.ListHeading}>
                {claz.toUpperCase() + " STUDENTS"}
              </h6>
              <ListGroup as="ol" numbered variant="flush">
                {AllStudents.map((student, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    onClick={() => GetThisStudentReport(student)}
                    as="li"
                  >
                    {student.Fullname}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </BorderedCardNoHover>
          </Col>

          {DisplayMainCard && (
            <Col
              md={9}
              lg={9}
              sm={11}
              xs={11}
              className={classes.MainCardContainer}
            >
              <Row className="justify-content-around">
                <Col md={11} lg={11} xs={11} sm={11}>
                  <Row className="justify-content-around">
                    <Col md={10} lg={10} xs={11} sm={11}>
                      <Row>
                        {StudentDescription(
                          "NAME",
                          RetrievedStudentDetails.Fullname,
                          12
                        )}
                        {StudentDescription("ADMISSION NUMBER", "123456789", 4)}
                        {StudentDescription(
                          "DATE OF BIRTH",
                          RetrievedStudentDetails.dob,
                          4
                        )}
                        {StudentDescription(
                          "SEX",
                          RetrievedStudentDetails.sex,
                          4
                        )}

                        {StudentDescription(
                          "SESSION",
                          RetrievedStudentDetails.Session,
                          4
                        )}
                        {StudentDescription(
                          "TERM",
                          RetrievedStudentDetails.Term,
                          4
                        )}
                        {StudentDescription(
                          "CLASS",
                          RetrievedStudentDetails.Claz,
                          4
                        )}

                        {StudentDescription(
                          "NO IN CLASS",
                          RetrievedStudentDetails.nic,
                          4
                        )}

                        {StudentDescription1("TOTAL ATTENDANCE", 4)}

                        {StudentDescription2("NO OF TIMES PRESENT", 4)}

                        {StudentDescription3("NEXT TERM BEGINS ON", 12)}
                      </Row>
                    </Col>
                    <Col md={2} lg={2} xs={6} sm={6}>
                      <Image
                        src={RetrievedStudentDetails.PixUrl}
                        width={100}
                        height={120}
                        alt="StudentID"
                      />
                      {/* <p className={classes.DisplayedName}>
                            {PickedStudentName}
                          </p> */}
                    </Col>
                  </Row>
                  <Row className="justify-content-around">
                    <Col
                      md={12}
                      lg={12}
                      xs={12}
                      sm={12}
                      className={classes.theTableCol}
                    >
                      <Table
                        responsive
                        hover
                        bordered
                        striped
                        className={classes.Tables}
                      >
                        <thead>
                          <tr className={classes.rowHead}>
                            <td
                              className={`${classes.subjectHead} ${classes.BoldTableHeading}`}
                            >
                              SUBJECTS
                            </td>
                            {RotatedHeading(
                              term,
                              "1ST SUMMARY",
                              "1ST CA SCORES"
                            )}
                            {RotatedHeading(
                              term,
                              "2ND SUMMARY",
                              "2ND CA SCORES"
                            )}
                            {RotatedHeading(term, "3RD SUMMARY", "EXAM SCORES")}
                            {RotatedHeading(term, "AVERAGE", "TOTAL SCORES")}
                            {RotatedHeading(term, "MAX. SCORES", "MAX. SCORES")}
                            {RotatedHeading(term, "MIN. SCORES", "MIN. SCORES")}
                            {RotatedHeading(term, "AVE. SCORES", "AVE. SCORES")}
                            {claz.includes("JS") &&
                              RotatedHeading(term, "POSITION", "POSITION")}
                            {RotatedHeading(term, "GRADES", "GRADES")}
                            {RotatedHeading(term, "REMARKS", "REMARKS")}
                          </tr>
                        </thead>
                        <tbody>
                          {RetrievedSubjects.map((det, index) => (
                            <tr key={index} className={classes.rowHead}>
                              <td
                                className={`pl-3 ${classes.TheSubjects} ${classes.scores_td2}`}
                              >
                                {det.subject_name}
                              </td>
                              <td className={classes.scores_td}>
                                {det[`${term}_term_ca_score1`]}
                              </td>
                              <td className={classes.scores_td}>
                                {det[`${term}_term_ca_score2`]}
                              </td>
                              <td className={classes.scores_td}>
                                {det[`${term}_term_exam_score`]}
                              </td>
                              <td className={classes.scores_td}>
                                {det[`${term}_term_total_score`] == 0
                                  ? "AB"
                                  : det[`${term}_term_total_score`]}
                              </td>
                              <td className={classes.scores_td}>
                                {det[`${term}_term_highest_score`]}
                              </td>
                              <td className={classes.scores_td}>
                                {det[`${term}_term_lowest_score`]}
                              </td>
                              <td className={classes.scores_td}>
                                {det[`${term}_term_average_score`]}
                              </td>
                              {claz.includes("JS") && (
                                <td className={classes.scores_td}>
                                  {det[`${term}_term_position`]}
                                </td>
                              )}
                              <td className={classes.scores_td}>
                                {det[`${term}_term_grade`]}
                              </td>
                              <td className={classes.scores_td}>
                                {det[`${term}_term_remark`]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <fieldset>
                    <legend>Affective & Psychomotor</legend>
                    <Row>
                      <Col md={4} lg={4} sm={12} xs={12}>
                        <Table
                          responsive
                          hover
                          bordered
                          className={classes.Tables}
                        >
                          <thead>
                            <tr>
                              <td
                                className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                              >
                                ATTRIBUTES
                              </td>
                              <td
                                className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                              >
                                1
                              </td>
                              <td
                                className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                              >
                                2
                              </td>
                              <td
                                className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                              >
                                3
                              </td>
                              <td
                                className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                              >
                                4
                              </td>
                              <td
                                className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                              >
                                5
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {RetrievedAttributes1.map((RAtt, index) =>
                              StudentAttributes(1, RAtt, index)
                            )}
                          </tbody>
                        </Table>
                      </Col>
                      <Col md={4} lg={4} sm={12} xs={12}>
                        <Table
                          responsive
                          hover
                          bordered
                          className={classes.Tables}
                        >
                          <thead>
                            <tr>
                              <td
                                className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                              >
                                ATTRIBUTES
                              </td>

                              <td
                                className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                              >
                                1
                              </td>
                              <td
                                className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                              >
                                2
                              </td>
                              <td
                                className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                              >
                                3
                              </td>
                              <td
                                className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                              >
                                4
                              </td>
                              <td
                                className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                              >
                                5
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {RetrievedAttributes2.map((RAtt, index) =>
                              StudentAttributes(2, RAtt, index)
                            )}
                          </tbody>
                        </Table>
                      </Col>
                      <Col md={4} lg={4} sm={12} xs={12}>
                        <Row>
                          <Col md={12} lg={12} sm={12} xs={12}>
                            <Table
                              responsive
                              hover
                              bordered
                              striped
                              className={classes.Tables}
                            >
                              <thead>
                                <tr>
                                  <th
                                    className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                                  >
                                    KEYS
                                  </th>
                                  <th
                                    className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                                  >
                                    ATTRIBUTES RATINGS
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {InfoTable(
                                  5,
                                  "Maintains an excellent degree of observa traits"
                                )}
                                {InfoTable(
                                  4,
                                  "Maintains high level of observable traits of observable traits"
                                )}
                                {InfoTable(
                                  3,
                                  "Acceptable level of observable traits"
                                )}
                                {InfoTable(
                                  2,
                                  "Shows minimal regards for observable traits"
                                )}
                                {InfoTable(
                                  1,
                                  "Has no regards for the observable traits"
                                )}
                              </tbody>
                            </Table>
                          </Col>
                          <Col md={12} lg={12} sm={12} xs={12}>
                            <Table
                              responsive
                              hover
                              bordered
                              striped
                              className={classes.Tables}
                            >
                              <thead>
                                <tr>
                                  <td
                                    colSpan="2"
                                    className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                                  >
                                    GRADES DISTRIBUTION
                                  </td>
                                </tr>
                              </thead>
                              {claz.includes("JS") ? (
                                <tbody>
                                  {InfoTable("70-100", "A")}
                                  {InfoTable("60-69", "B")}
                                  {InfoTable("50-59", "C")}
                                  {InfoTable("40-49", "D")}
                                  {InfoTable("0-39", "F")}
                                </tbody>
                              ) : (
                                <tbody>
                                  {InfoTable("75-100", "A1")}
                                  {InfoTable("70-74", "B2")}
                                  {InfoTable("65-69", "B3")}
                                  {InfoTable("60-64", "C4")}
                                  {InfoTable("55-59", "C5")}
                                  {InfoTable("50-54", "C6")}
                                  {InfoTable("45-49", "D7")}
                                  {InfoTable("40-44", "E8")}
                                  {InfoTable("0-39", "F9")}
                                </tbody>
                              )}
                            </Table>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </fieldset>
                  <fieldset>
                    <legend>Remarks</legend>

                    <Row>
                      <Col>
                        <Form.Label style={{ display: "inline-block" }}>
                          <Button
                            className={classes.PlusButton}
                            style={buttonBackground}
                            onClick={() =>
                              setDisplayCTOptions(!DisplayCTOptions)
                            }
                          >
                            {DisplayCTOptions ? "-" : "+"}
                          </Button>
                          Class Teacher's Comment
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={ct_remark}
                          onChange={(e) => setct_remark(e.target.value)}
                          name="CT"
                        />
                        {DisplayCTOptions && (
                          <Form.Select
                            value={sel_ct_remark}
                            onChange={(e) => ChangeCTComment(e.target.value)}
                          >
                            <option> Select</option>
                            <option value="Shola Allyson is actually a great singer">
                              Shola Allyson is actually a great singer
                            </option>
                            <option value="Shola Allyson is actually a great singer">
                              Shola Allyson is actually a great singer
                            </option>
                            <option value="Shola Allyson is actually a great singer">
                              Shola Allyson is actually a great singer
                            </option>
                            <option value="Shola Allyson is actually a great singer">
                              Shola Allyson is actually a great singer
                            </option>
                            <option value="Shola Allyson is actually a great singer">
                              Shola Allyson is actually a great singer
                            </option>
                            {/* {props.Data.map((cat, index) => (
                        <option key={index} value={cat}>
                          {cat} 
                        </option>
                      ))}*/}
                          </Form.Select>
                        )}
                        <p className={classes.ClassTeacherName}>
                          CLASS TEACHER'S NAME & PHONE NUMBER: MR OLADIPO A.A |
                          08033824233{" "}
                        </p>
                      </Col>
                      <Col>
                        <Form.Label style={{ display: "inline-block" }}>
                          <Button
                            className={classes.PlusButton}
                            style={buttonBackground}
                            onClick={() => setDisplayPOptions(!DisplayPOptions)}
                          >
                            {DisplayPOptions ? "-" : "+"}
                          </Button>
                          Principal's Comment
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={p_remark}
                          onChange={(e) => ChangePComment(e.target.value)}
                          name="Principal"
                        />
                        {DisplayPOptions && (
                          <Form.Select
                            value={sel_p_remark}
                            onChange={(e) => ChangePComment(e.target.value)}
                          >
                            <option> Select</option>
                            <option value="Shola Allyson is actually a great singer">
                              Shola Allyson is actually a great singer
                            </option>
                            <option value="Shola Allyson is actually a great singer">
                              Shola Allyson is actually a great singer
                            </option>
                            <option value="Shola Allyson is actually a great singer">
                              Shola Allyson is actually a great singer
                            </option>
                            <option value="Shola Allyson is actually a great singer">
                              Shola Allyson is actually a great singer
                            </option>
                            <option value="Shola Allyson is actually a great singer">
                              Shola Allyson is actually a great singer
                            </option>
                            {/* {props.Data.map((cat, index) => (
                        <option key={index} value={cat}>
                          {cat} 
                        </option>
                      ))}*/}
                          </Form.Select>
                        )}
                      </Col>
                    </Row>
                  </fieldset>
                  <hr />
                  <Row className="justify-content-around">
                    <Col
                      lg={12}
                      md={12}
                      xs={11}
                      sm={11}
                      className="text-center"
                    >
                      <Button
                        variant="success"
                        style={buttonBackground}
                        className={classes.SubmitButton}
                        onClick={SaveTheReport}
                      >
                        SAVE REPORT
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      )}
      <Processing_Modal
        Show={showProcessing}
        message={Message}
        variant="success"
        size="sm"
      />
    </Container>
  );
};

export default Compute_Reports;
