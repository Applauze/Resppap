"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import PermissionContext from "@/Store/permission-context";
import Session from "./SessionTermClass/Session";
import Class from "./SessionTermClass/Class";
import Term from "./SessionTermClass/Term";
import ButtonBackground from "./Inputs/ButtonBackground";
import Processing_Modal from "./ModalsAndAlerts/Processing_Modal";
import classes from "./ResultCheckerComponent.module.css";
import QRCode from "qrcode.react";
import generatePDF from "react-to-pdf";
import html2pdf from "html2pdf.js";
import Image from "next/image";
import MaleDummy from "./Images/MaleDummy.jpg";
import FemaleDummy from "./Images/FemaleDummy.jpg";
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
import FormInputPassword from "./Inputs/FormInputPassword";
import FormInputText from "./Inputs/FormInputText";

const ResultCheckerComponent = () => {
  const [session, setsession] = useState("Select");
  const [claz, setclaz] = useState("Select");
  const [term, setterm] = useState("Select");
  const [showProcessing, setshowProcessing] = useState(false);
  const [Message, setMessage] = useState("");
  const [QRCodeString, setQRCodeString] = useState("");
  const [activateSelector, setactivateSelector] = useState(true);
  const [activateButton, setactivateButton] = useState(false);
  const [displayStudents, setdisplayStudents] = useState(false);
  const [nexttermbegins, setnexttermbegins] = useState(0);
  const [schoolopens, setschoolopens] = useState(0);
  const [ePIN, setePIN] = useState();
  const [AllStudents, setAllStudents] = useState([]);
  const [RetrievedStudentDetails, setRetrievedStudentDetails] = useState([]);
  const [RetrievedSubjects, setRetrievedSubjects] = useState([]);
  const [RetrievedAttributes1, setRetrievedAttributes1] = useState([]);
  const [RetrievedAttributes2, setRetrievedAttributes2] = useState([]);
  const [RetrievedAttributes3, setRetrievedAttributes3] = useState([]);
  const [ct_remark, setct_remark] = useState("");
  const [p_remark, setp_remark] = useState("");
  const [StdID, setStdID] = useState("");
  const [st_id, setst_id] = useState("");
  const [ToggleButton, setToggleButton] = useState(false);
  const [p_attendance, setp_attendance] = useState("");
  const cookies = new Cookies();
  const [DisplayCardPanel, setDisplayCardPanel] = useState(false);
  const [DisplayMainCard, setDisplayMainCard] = useState(false);
  const [displayResult, setdisplayResult] = useState(false);
  const [Fullname, setFullname] = useState("");
  const [DisplayMode, setDisplayMode] = useState("Print");
  const targetRef = useRef();
  const buttonCss = {
    width: "100%",
  };

  const PCtx = useContext(PermissionContext);
  useEffect(() => {
    PCtx.setMenuClicked(false);
  }, []);

  useEffect(() => {
    setDisplayCardPanel(false);
  }, [session, claz, term, ePIN, StdID]);

  const GetTheResult = async (e) => {
    e.preventDefault();
    if (
      term != "Select" &&
      session != "Select" &&
      claz != "Select" &&
      ePIN != "" &&
      StdID != ""
    ) {
      var CryptoJS = require("crypto-js");

      let PIN = "Applause143";
      console.log(PIN);
      let aPIN = CryptoJS.AES.encrypt(ePIN, PIN).toString();

      let CheckerInfo = {
        Session: session,
        Term: term,
        Claz: claz,
        EPIN: aPIN,
        SID: StdID,
      };

      let ThisDetails = await axioscall("get_result_checker_info", CheckerInfo);
      // console.log(ThisDetails);
      if (ThisDetails != "Error") {
        ThisDetails = JSON.parse(ThisDetails);
        if (ThisDetails.responder) {
          GetThisStudentReport(ThisDetails.StudentDetails);
        } else {
          DisplayNotification(
            "Error",
            `The information supplied are incorrect. Please check and try again`,
            "danger",
            "top-center",
            5000
          );
        }
      } else {
        DisplayNotification(
          "Error",
          `The information supplied are incorrect. Please check and try again`,
          "danger",
          "top-center",
          5000
        );
      }
    } else {
      DisplayNotification(
        "Error",
        `All information must be submitted. Kindly check for the missing information`,
        "danger",
        "top-center",
        5000
      );
    }
  };

  const GetThisStudentReport = async (element) => {
    setDisplayCardPanel(false);
    setMessage(`The system is retrieving  ${element.Fullname}'s report`);
    setQRCodeString(
      `${element.Fullname} + ${session} Session + ${term} Term + ${claz}`
    );
    setshowProcessing(true);
    setDisplayMainCard(false);
    let ThisStudentParam = {
      student_id: StdID,
      Session: session,
      Term: term,
      Claz: claz,
    };
    setst_id(element.student_id);

    let ThisStudentReportInJson = await axioscall(
      "load_this_student_report",
      ThisStudentParam
    );
    // console.log(ThisStudentReportInJson);
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
    let n = Math.ceil(PsychoAttributes.length / 3) + 1;

    setRetrievedStudentDetails(ThisStudentParam);
    setRetrievedSubjects(ThisStudentReportInJson.ThisStudentScores);
    setRetrievedAttributes1(PsychoAttributes.slice(0, n));
    setRetrievedAttributes2(PsychoAttributes.slice(n, 2 * n));
    setRetrievedAttributes3(PsychoAttributes.slice(2 * n));
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

    if (AllTermProp.length > 0) {
      setnexttermbegins(AllTermProp[0]["Resumption"]);
      setschoolopens(AllTermProp[0]["SchoolOpens"]);
    }
    setDisplayCardPanel(true);
    // setRetrievedComments(ThisStudentReportInJson.ThisStudentComments);
  };

  useEffect(() => {
    if (DisplayMode === "PDF") {
      // generatePDF(targetRef, {

      const element = document.getElementById("element-to-print");
      html2pdf(element, {
        margin: 0,
        filename: "myfile.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      });

      setDisplayMode("Print");
    }
  }, [DisplayMode]);

  const GenerateThePdf = () => {
    setDisplayMode("PDF");
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
      <Col md={colsp} lg={colsp} xs={11} sm={11} className={classes.DetailsCol}>
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

  const RotatedHeading = (tam, ThirdText, OtherText) => {
    return (
      <td
        className={
          DisplayMode === "Print"
            ? `${classes.RotatedHeading} ${classes.BoldTableHeading}`
            : `${classes.RotatedHeading2} ${classes.BoldTableHeading}`
        }
      >
        {tam === "Third" ? ThirdText : OtherText}
      </td>
    );
  };

  const StudentAttributes = (n, ATT, RIndx) => {
    return (
      <tr key={RIndx} className={classes.AttributeRow}>
        <td className={`py-1 ${classes.TheAttributes}`}>
          {ATT[`${term}_term_attribute`]}
        </td>
        <td className={`py-0 text-center text-bg ${classes.TheAttributes}`}>
          {ATT[`${term}_term_value`]}
        </td>
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

  const PrintTheReport = async () => {
    window.print();
    DisplayNotification(
      "Success",
      `${Fullname}'s reports have been sent to the Printer`,
      "success",
      "top-center",
      5000
    );
  };

  return (
    <div fluid className={classes.Margin4Print}>
      <ReactNotifications />
      <div>
        <Row className={classes.Hide4Print}>
          <Col md={12} lg={12} sm={11} xs={11}>
            <h4 className="text-center h4">RESULT CHECKER</h4>
          </Col>
        </Row>
        {/* <hr /> */}

        <Row className="justify-content-around ">
          <Col lg={3} md={3} sm={12} xs={12} className={classes.Hide4Print}>
            <BorderedCardNoHover MyStyle={{ borderRadius: "0px" }}>
              <Form onSubmit={GetTheResult} className={classes.TheForm}>
                <Row className="justify-content-around">
                  <Col md={12} lg={12} sm={11} xs={11}>
                    <h6 className="text-center h6">STUDENT'S DETAILS</h6>
                    <hr className="mt-2" />
                  </Col>

                  <Col lg={12} md={12} sm={11} xs={11}>
                    <FormInputText
                      Label="STUDENT ID"
                      GetValue={setStdID}
                      Owner={StdID}
                      Color={"brown"}
                    />
                    <hr className="mt-2" />
                  </Col>

                  <Col lg={12} md={12} sm={11} xs={11} className=" ">
                    <Session
                      Session={session}
                      setSession={setsession}
                      Disabled={!activateSelector}
                    />
                    <hr className="mt-2" />
                  </Col>

                  <Col lg={12} md={12} sm={11} xs={11}>
                    <Term
                      Term={term}
                      setTerm={setterm}
                      Disabled={!activateSelector}
                    />
                    <hr className="mt-2" />
                  </Col>
                  <Col lg={12} md={12} sm={11} xs={11}>
                    <Class
                      Claz={claz}
                      setClaz={setclaz}
                      Disabled={!activateSelector}
                    />
                    <hr className="mt-2" />
                  </Col>

                  <Col lg={12} md={12} sm={11} xs={11}>
                    {ToggleButton ? (
                      <FormInputText
                        Label="PIN"
                        GetValue={setePIN}
                        Owner={ePIN}
                        Color={"brown"}
                      />
                    ) : (
                      <FormInputPassword
                        Label="PIN"
                        GetValue={setePIN}
                        Owner={ePIN}
                        Color={"brown"}
                      />
                    )}

                    <Row className="justify-content-end">
                      <Col
                        md={6}
                        lg={6}
                        sm={6}
                        className="d-flex justify-content-end mt-1"
                      >
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => setToggleButton(!ToggleButton)}
                        >
                          {ToggleButton ? "Hide PIN" : "Show PIN"}
                        </button>
                      </Col>
                    </Row>
                    <hr className="mt-2" />
                  </Col>

                  <Col
                    lg={12}
                    md={12}
                    sm={11}
                    xs={11}
                    className="d-flex justify-content-end"
                  >
                    <ButtonBackground
                      ButtonType="submit"
                      ButtonName="CHECK RESULT"
                    />
                  </Col>
                </Row>
              </Form>
            </BorderedCardNoHover>
          </Col>

          {DisplayCardPanel && (
            <Col
              md={9}
              lg={9}
              sm={11}
              xs={11}
              className={` ${classes.Margin4Print} ${classes.PrintCol}`}
            >
              <Row
                ref={targetRef}
                id="element-to-print"
                className={`align-items-start d-flex mx-2 p-0 w-100 ${classes.MainCardContainer}`}
              >
                <Col
                  md={12}
                  lg={12}
                  xs={12}
                  sm={11}
                  className={classes.CardHeader}
                >
                  <Row className="w-100">
                    <Col
                      md={3}
                      lg={3}
                      xs={3}
                      sm={3}
                      className="d-flex align-items-center justify-content-around "
                    >
                      <Image
                        src={SchoolLogo}
                        width={95}
                        height={95}
                        alt="School Logo"
                      />
                    </Col>
                    <Col md={7} lg={7} xs={7} sm={7}>
                      <p className={classes.Emmanuel}>
                        EMMANUEL ALAYANDE UNIVERSITY OF EDUCATION
                      </p>
                      <p className={classes.Model}>MODEL HIGH SCHOOL, OYO</p>
                      <p className={classes.Pmb}>P.M.B. 1010, ISOKUN, OYO</p>
                      <p className={classes.Tel}>
                        Tel: 08033824233 Email: upmosttony@gmail.com
                      </p>
                      <p className={classes.Report}>REPORT CARD</p>
                    </Col>
                  </Row>
                </Col>

                <Col
                  md={12}
                  lg={12}
                  xs={12}
                  sm={11}
                  className={classes.RepCardCol}
                >
                  <Row>
                    <Col md={10} lg={10} xs={11} sm={11}>
                      <Row>
                        {StudentDescription(
                          "NAME",
                          RetrievedStudentDetails.Fullname,
                          12
                        )}
                        {StudentDescription("ADMISSION NO.", "123456789", 4)}
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
                        {StudentDescription("TOTAL ATTENDANCE", schoolopens, 4)}
                        {StudentDescription(
                          "NO OF TIMES PRESENT",
                          p_attendance,
                          4
                        )}
                        {StudentDescription(
                          "NEXT TERM BEGINS ON",
                          nexttermbegins,
                          12
                        )}
                      </Row>
                    </Col>
                    <Col
                      md={2}
                      lg={2}
                      xs={6}
                      sm={6}
                      className="d-flex align-self-center"
                    >
                      <Image
                        src={
                          RetrievedStudentDetails.PixUrl === null ||
                          RetrievedStudentDetails.PixUrl === ""
                            ? RetrievedStudentDetails.sex === "Male"
                              ? MaleDummy
                              : FemaleDummy
                            : RetrievedStudentDetails.PixUrl
                        }
                        width={80}
                        height={80}
                        alt="StudentID"
                      />
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
                              className={
                                DisplayMode === "Print"
                                  ? `${classes.BoldTableHeading}`
                                  : `${classes.TheSubjects} ${classes.BoldTableHeading}`
                              }
                            >
                              SUBJECTS & SCORES
                            </td>
                            {RotatedHeading(term, "1ST SUMM.", "1ST CA")}
                            {RotatedHeading(term, "2ND SUMM.", "2ND CA")}
                            {RotatedHeading(term, "3RD SUMM.", "EXAM")}
                            {RotatedHeading(term, "AVE.", "TOTAL")}
                            {RotatedHeading(term, "MAX.", "MAX.")}
                            {RotatedHeading(term, "MIN.", "MIN.")}
                            {RotatedHeading(term, "AVE.", "AVE.")}
                            {claz.includes("JS") &&
                              RotatedHeading(term, "POS", "POS")}
                            {RotatedHeading(term, "GRDS", "GRDS")}
                            {RotatedHeading(term, "RMKS", "RMKS")}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className={classes.rowHead}>
                            <td
                              className={`pl-3 ${classes.TheSubjects} ${classes.scores_td2}`}
                            >
                              Marks Obtainable
                            </td>
                            <td className={classes.scores_td}>
                              {term === "Third" ? "100" : "10"}
                            </td>
                            <td className={classes.scores_td}>
                              {term === "Third" ? "100" : "20"}
                            </td>
                            <td className={classes.scores_td}>
                              {term === "Third" ? "100" : "70"}
                            </td>
                            <td className={classes.scores_td}>100</td>
                            <td className={classes.scores_td}>-</td>
                            <td className={classes.scores_td}>-</td>
                            <td className={classes.scores_td}>-</td>
                            {claz.includes("JS") && (
                              <td className={classes.scores_td}>-</td>
                            )}
                            <td className={classes.scores_td}>-</td>
                            <td className={classes.scores_td}>-</td>
                          </tr>
                          {RetrievedSubjects.map((det, index) => (
                            <tr key={index} className={classes.rowHead}>
                              <td
                                className={`pl-3 ${classes.TheSubjects} ${classes.scores_td2}`}
                              >
                                {det.subject_name}
                              </td>
                              <td className={classes.scores_td}>
                                {term === "Third"
                                  ? det["first_term_total_score"] === null
                                    ? "AB"
                                    : det["first_term_total_score"]
                                  : det[`${term}_term_ca_score1`]}
                              </td>
                              <td className={classes.scores_td}>
                                {term === "Third"
                                  ? det["second_term_total_score"] === null
                                    ? "AB"
                                    : det["second_term_total_score"]
                                  : det[`${term}_term_ca_score2`]}
                              </td>
                              <td className={classes.scores_td}>
                                {term === "Third"
                                  ? det["third_term_total_score"] === null
                                    ? "AB"
                                    : det["third_term_total_score"]
                                  : det[`${term}_term_exam_score`]}
                              </td>
                              <td
                                className={`${classes.scores_td} `}
                                style={
                                  parseFloat(det["overall_average_score"]) >
                                    49 ||
                                  parseFloat(det[`${term}_term_total_score`]) >
                                    49
                                    ? {
                                        fontWeight: "bold",
                                        color: "Blue",
                                        fontSize: "13px",
                                      }
                                    : {
                                        fontWeight: "bold",
                                        color: "Red",
                                        fontSize: "13px",
                                      }
                                }
                              >
                                {term === "Third"
                                  ? det["overall_average_score"] == "0" ||
                                    det["overall_average_score"] == null
                                    ? "AB"
                                    : det["overall_average_score"]
                                  : det[`${term}_term_total_score`] == 0 ||
                                    det[`${term}_term_total_score`] == null
                                  ? "AB"
                                  : det[`${term}_term_total_score`]}
                              </td>
                              <td className={classes.scores_td}>
                                {term === "Third"
                                  ? det["overall_highest_score"]
                                  : det[`${term}_term_highest_score`]}
                              </td>
                              <td className={classes.scores_td}>
                                {term === "Third"
                                  ? det["overall_lowest_score"]
                                  : det[`${term}_term_lowest_score`]}
                              </td>
                              <td className={classes.scores_td}>
                                {term === "Third"
                                  ? det["general_average_score"]
                                  : det[`{term}_term_average_score`]}
                              </td>
                              {claz.includes("JS") && (
                                <td className={classes.scores_td}>
                                  {term === "Third"
                                    ? det[`overall_position`]
                                    : det[`${term}_term_position`]}
                                </td>
                              )}
                              <td className={classes.scores_td}>
                                {term === "Third"
                                  ? det[`overall_grade`]
                                  : det[`${term}_term_grade`]}
                              </td>
                              <td className={classes.scores_td}>
                                {term === "Third"
                                  ? det[`overall_remark`]
                                  : det[`${term}_term_remark`]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <fieldset>
                    <legend
                      className="p-0 m-0"
                      style={{ fontSize: "11px", fontWeight: "bold" }}
                    >
                      Affective & Psychomotor
                    </legend>
                    <Row>
                      <Col md={3} lg={3} sm={12} xs={12}>
                        <Table
                          responsive
                          hover
                          bordered
                          className={classes.Tables}
                        >
                          <thead>
                            <tr className={classes.rowHead}>
                              <td
                                className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                              >
                                ATTRIBUTES
                              </td>
                              <td
                                className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                              >
                                R
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
                      <Col md={3} lg={3} sm={12} xs={12}>
                        <Table
                          responsive
                          hover
                          bordered
                          className={classes.Tables}
                        >
                          <thead>
                            <tr className={classes.rowHead}>
                              <td
                                className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                              >
                                ATTRIBUTES
                              </td>

                              <td
                                className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                              >
                                R
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
                      <Col md={3} lg={3} sm={12} xs={12}>
                        <Row>
                          <Col md={12} lg={12} sm={12} xs={12}>
                            <Table
                              responsive
                              hover
                              bordered
                              className={classes.Tables}
                            >
                              <thead>
                                <tr className={classes.rowHead}>
                                  <td
                                    className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                                  >
                                    ATTRIBUTES
                                  </td>

                                  <td
                                    className={`${classes.TheAttributes} ${classes.BoldTableHeading}`}
                                  >
                                    R
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                {RetrievedAttributes3.map((RAtt, index) =>
                                  StudentAttributes(2, RAtt, index)
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
                      <Col md={3} lg={3} sm={12} xs={12}>
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
                    </Row>
                  </fieldset>
                  <fieldset>
                    <legend
                      className="m-0 p-0"
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                    >
                      Remarks
                    </legend>

                    <Row>
                      <Col lg={5} md={5} xs={11} sm={11}>
                        <p className={classes.CommentParagraph}>
                          <span
                            className={classes.Comment}
                          >{`"${ct_remark}"`}</span>
                          <hr className={classes.CommenterDivider} />
                          <span className={classes.Commenter}>
                            MR OLADIPO A.A
                          </span>

                          <span className={classes.CommenterStatus}>
                            CLASS TEACHER
                          </span>
                          <span className={classes.CommenterStatus}>
                            08033824233
                          </span>
                        </p>
                      </Col>
                      <Col lg={2} md={2} xs={11} sm={11}>
                        <QRCode value={QRCodeString} />
                      </Col>
                      <Col lg={5} md={5} xs={11} sm={11}>
                        <p className={classes.CommentParagraph}>
                          <span
                            className={classes.Comment}
                          >{`"${p_remark}"`}</span>
                          <hr className={classes.CommenterDivider} />
                          <span className={classes.Commenter}>
                            THE PRINCIPAL
                          </span>
                        </p>
                      </Col>
                    </Row>
                  </fieldset>

                  <Row className="justify-content-around m-0 p-0">
                    <Col
                      lg={12}
                      md={12}
                      xs={11}
                      sm={11}
                      className={classes.Applause}
                    >
                      Software developed by: Applause Infotech | 08033824233
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row
                className={`"justify-content-around p-3" ${classes.Hide4Print}`}
              >
                <Col lg={4} md={4} xs={11} sm={11} className="text-center">
                  <ButtonBackground
                    ButtonName="PRINT"
                    className={classes.SubmitButton}
                    ButtonAction={PrintTheReport}
                    ButtonCss={buttonCss}
                  />
                </Col>
                <Col lg={4} md={4} xs={11} sm={11} className="text-center">
                  <ButtonBackground
                    ButtonName="PDF"
                    className={classes.SubmitButton}
                    ButtonAction={GenerateThePdf}
                    ButtonCss={buttonCss}
                  />
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </div>
      {/* )}
        </Row>
      )} */}
      <Processing_Modal
        Show={showProcessing}
        message={Message}
        variant="success"
        size="sm"
      />
    </div>
  );
};

export default ResultCheckerComponent;
