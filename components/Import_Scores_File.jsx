import React, { useState, useEffect } from "react";
import Session from "./SessionTermClass/Session";
import Class from "./SessionTermClass/Class";
import Term from "./SessionTermClass/Term";
import Subjects from "./SessionTermClass/Subjects";
import OK_Modal from "./ModalsAndAlerts/OK_Modal";
import Processing_Modal from "./ModalsAndAlerts/Processing_Modal";
import { Row, Col, Form, Button, Table, Tabs, Tab } from "react-bootstrap";
import axioscall from "./API_Call/axioscall";
import { DisplayNotification } from "./Notification";
import "react-notifications-component/dist/theme.css";
import { ExcelRenderer } from "react-excel-renderer";
import Cookies from "universal-cookie";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import { ReactNotifications } from "react-notifications-component";

const Import_Scores_File = (props) => {
  const [session, setsession] = useState("Select");
  const [claz, setclaz] = useState("Select");
  const [term, setterm] = useState("Select");
  const [LoadedSubjects, setLoadedSubjects] = useState([]);
  const [AllServerSubjects, setAllServerSubjects] = useState([]);
  const [pickedSubject, setpickedSubject] = useState("Select");
  const [activateSelector, setactivateSelector] = useState(true);
  const [activateButton, setactivateButton] = useState(false);
  const [ConcernedStudents, setConcernedStudents] = useState([]);
  const [showProcessing, setshowProcessing] = useState(false);
  const [displayStudents, setdisplayStudents] = useState(false);
  const [dataready, setdataready] = useState(false);
  const [FileDirectory, setFileDirectory] = useState("");
  const [Modal_Message, setModal_Message] = useState("");
  const [Message, setMessage] = useState("");
  const [Modal_Title, setModal_Title] = useState("");
  const [Show_Modal, setShow_Modal] = useState(false);
  const [Button_Title, setButton_Title] = useState("");
  const [Cols, setCols] = useState([]);
  const [Rows, setRows] = useState([]);
  const [JSONdataArray, setJSONdataArray] = useState({});
  const cookies = new Cookies();

  useEffect(() => {
    const AllSubs = JSON.parse(props.Subjects);
    setAllServerSubjects(AllSubs);
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
    setFileDirectory("");
    setdataready(false);
    setdisplayStudents(false);
    activateTheButton();
  }, [session, claz, term, pickedSubject]);

  const AfterEvent = () => {
    setShow_Modal(false);
  };

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

  const GetJuniorGrade = (sc) => {
    let grd = "";
    let rmk = "";
    sc = parseFloat(sc);
    if (sc >= 0 && sc < 40) {
      grd = "F";
      rmk = "WEAK";
    }
    if (sc >= 40 && sc < 45) {
      grd = "E";
      rmk = "PASS";
    }

    if (sc >= 45 && sc < 50) {
      grd = "D";
      rmk = "PASS";
    }

    if (sc >= 50 && sc < 60) {
      grd = "C";
      rmk = "CREDIT";
    }

    if (sc >= 60 && sc < 70) {
      grd = "B";
      rmk = "GOOD";
    }
    if (sc >= 70 && sc <= 100) {
      grd = "A";
      rmk = "EXCELLENT";
    }

    let grdrmk = { grade: grd, remark: rmk };
    return grdrmk;
  };

  const GetSeniorGrade = (sc) => {
    let grd = "";
    let rmk = "";
    sc = parseFloat(sc);
    if (sc >= 0 && sc < 40) {
      grd = "F9";
      rmk = "WEAK";
    }
    if (sc >= 40 && sc < 45) {
      grd = "E8";
      rmk = "PASS";
    }

    if (sc >= 45 && sc < 50) {
      grd = "D7";
      rmk = "PASS";
    }

    if (sc >= 50 && sc < 55) {
      grd = "C6";
      rmk = "CREDIT";
    }
    if (sc >= 55 && sc < 60) {
      grd = "C5";
      rmk = "CREDIT";
    }

    if (sc >= 60 && sc < 65) {
      grd = "C4";
      rmk = "CREDIT";
    }

    if (sc >= 65 && sc < 70) {
      grd = "B3";
      rmk = "GOOD";
    }

    if (sc >= 70 && sc < 75) {
      grd = "B2";
      rmk = "VERY GOOD";
    }

    if (sc >= 70 && sc <= 100) {
      grd = "A1";
      rmk = "DISTINCTION";
    }

    let grdrmk = { grade: grd, remark: rmk };
    return grdrmk;
  };

  const ScoreCheck = (scr, limit, AfStd, Sorc) => {
    let AB = "ABab";
    let Error = "Error";
    let Msg = "";

    if (Sorc === "DIVISOR") {
      AfStd["Divisor"] = scr;
    } else {
      switch (Sorc) {
        case "CA1":
          Msg = "First CA Test";
          break;

        case "CA2":
          Msg = "Second CA Test";
          break;
        case "EXAM":
          Msg = "Exam";
          break;
      }
      if (scr > limit && !isNaN(scr)) {
        DisplayNotification(
          "Error",
          `${Msg} Score cannot be more than ${limit} Marks`,
          "danger",
          "top-center",
          5000
        );
        AfStd[Sorc + "Score"] = "Error";
        AfStd["BackG" + Sorc] = "red";
      } else {
        if (Error.includes(scr)) {
          AfStd["BackG" + Sorc] = "red";
          AfStd[Sorc + "Score"] = scr;
        } else {
          AfStd["BackG" + Sorc] = "white";
          AfStd[Sorc + "Score"] = scr;
        }
      }

      let ca1score =
        "ABab".includes(AfStd.CA1Score) ||
        "Error".includes(AfStd.CA1Score) ||
        AfStd.CA1Score === ""
          ? 0
          : AfStd.CA1Score;
      let ca2score =
        "ABab".includes(AfStd.CA2Score) ||
        "Error".includes(AfStd.CA2Score) ||
        AfStd.CA2Score === ""
          ? 0
          : AfStd.CA2Score;
      let examscore =
        "ABab".includes(AfStd.EXAMScore) ||
        "Error".includes(AfStd.EXAMScore) ||
        AfStd.EXAMScore === ""
          ? 0
          : AfStd.EXAMScore;
      AfStd.TotalScore =
        parseFloat(ca1score) + parseFloat(ca2score) + parseFloat(examscore);
      let GRDRMK = claz.includes("JS")
        ? GetJuniorGrade(AfStd.TotalScore)
        : GetSeniorGrade(AfStd.TotalScore);
      AfStd["Grade"] = GRDRMK.grade;
      AfStd["Remark"] = GRDRMK.remark;
    }
    return AfStd;
  };

  const GetTheStudents = async (e) => {
    e.preventDefault();
    setMessage(
      `The system is retrieving the students offering ${pickedSubject} in ${claz}`
    );
    let TeacherID = cookies.get("this_staff");
    let Category = cookies.get("this_category");

    setshowProcessing(true);
    let ScoreDetails = {
      Session: session,
      Term: term,
      Claz: claz,
      PickedSubject: pickedSubject,
      TeacherID: TeacherID ? TeacherID : "Nothing",
      Category: Category ? Category : "Nothing",
    };

    let RegisteredStudents = await axioscall(
      "get_subjects_registered_students",
      ScoreDetails
    );

    if (!RegisteredStudents.includes("Not Authorized")) {
      if (!RegisteredStudents.includes("Error")) {
        let AllNamesAndNumbers = [];
        RegisteredStudents = JSON.parse(RegisteredStudents);
        const AS = RegisteredStudents.AllStudents;

        AS.forEach((element) => {
          let divider = 1;
          if (
            element.first_term_total_score &&
            element.first_term_total_score > 0
          ) {
            divider++;
          }
          if (
            element.second_term_total_score &&
            element.second_term_total_score > 0
          ) {
            divider++;
          }

          AllNamesAndNumbers = [
            ...AllNamesAndNumbers,
            {
              StdNum: element["student_id"],
              StdName: `${element.surname} ${element.firstname} ${element.middlename}`,
              CA1Score: element[term + "_term_ca_score1"],
              CA2Score: element[term + "_term_ca_score2"],
              EXAMScore: element[term + "_term_exam_score"],
              TotalScore:
                element[term + "_term_total_score"] &&
                element[term + "_term_total_score"] > 0
                  ? element[term + "_term_total_score"]
                  : 0,
              HighestScore: element[term + "_term_highest_score"]
                ? element[term + "_term_total_score"]
                : 0,
              LowestScore: element[term + "_term_lowest_score"]
                ? element[term + "_term_total_score"]
                : 0,
              AverageScore: element[term + "_term_average_score"],
              Position: element[term + "_term_position"],
              Grade: element[term + "_term_grade"],
              Remark: element[term + "_term_remark"],
              StdNum: element.student_id,
              BackGCA1: "white",
              BackGCA2: "white",
              BackGEXAM: "white",
              Divisor: divider,
            },
          ];
        });

        setConcernedStudents(AllNamesAndNumbers);
        setdisplayStudents(true);
        setdataready(true);
      } else {
        props.Notify(
          `There was a problem in retrieving the students. Please ensure that the students have been registered for ${pickedSubject} in ${session} Session`
        );
      }
    } else {
      props.Notify(
        `You are not an authorized teacher for the selected class. Please contact the Administrator`
      );
    }
    setshowProcessing(false);
  };

  const PickFile = (event) => {
    let str = event.target.value;
    if (str.endsWith("xlsx") || str.endsWith("xls")) {
      let namP = event.target.name;
      let valP = event.target.files[0];
      ProcessFile(valP);
      // setFileObject(valP);
      setFileDirectory(str);
      // Use the ExcelRenderer to parse the file
    } else {
      // console.log("Only picture in jpg or jpeg format is accepted");
      // PCtx.displayAlert("ERROR", "This is not an Excel File", "danger");

      DisplayNotification(
        "Error",
        `This is not an Excel File`,
        "danger",
        "top-center",
        7000
      );
    }
  };

  const CheckScoreValidity = (Data) => {
    let NoError = true;
    let Culprits = [];
    let Cul = [];
    for (var i = 0; i < Data.length; i++) {
      let C1 = isNaN(
        parseFloat(Data[i]["1ST CA (10)"].toString().replace(/\s+/g, ""))
      )
        ? Data[i]["1ST CA (10)"].toString()
        : parseFloat(Data[i]["1ST CA (10)"].toString().replace(/\s+/g, ""));
      let C2 = isNaN(
        parseFloat(Data[i]["2ND CA (20)"].toString().replace(/\s+/g, ""))
      )
        ? Data[i]["2ND CA (20)"].toString()
        : parseFloat(Data[i]["2ND CA (20)"].toString().replace(/\s+/g, ""));
      let E1 = isNaN(
        parseFloat(Data[i]["EXAM (70)"].toString().replace(/\s+/g, ""))
      )
        ? Data[i]["EXAM (70)"].toString()
        : parseFloat(Data[i]["EXAM (70)"].toString().replace(/\s+/g, ""));

      if (!isNaN(C1) && C1 > 10) {
        NoError = false;
        if (!Cul.includes(i)) {
          Cul.push(i);
          Culprits.push(Data[i]["STUDENTS NAMES"]);
        }
      } else {
        if (isNaN(C1) && !"ABab".includes(C1.toString().toUpperCase())) {
          NoError = false;
          if (!Cul.includes(i)) {
            Cul.push(i);
            Culprits.push(Data[i]["STUDENTS' NAMES"]);
          }
        }
      }
      if (!isNaN(C2) && C2 > 20) {
        NoError = false;
        if (!Cul.includes(i)) {
          Cul.push(i);
          Culprits.push(Data[i]["STUDENTS' NAMES"]);
        }
      } else {
        if (isNaN(C2) && !"ABab".includes(C2.toString().toUpperCase())) {
          NoError = false;
          if (!Cul.includes(i)) {
            Cul.push(i);
            Culprits.push(Data[i]["STUDENTS' NAMES"]);
          }
        }
      }
      if (!isNaN(E1) && E1 > 70) {
        NoError = false;
        if (!Cul.includes(i)) {
          Cul.push(i);
          Culprits.push(Data[i]["STUDENTS' NAMES"]);
        }
      } else {
        if (isNaN(E1) && !"ABab".includes(E1.toString().toUpperCase())) {
          NoError = false;
          if (!Cul.includes(i)) {
            Cul.push(i);
            Culprits.push(Data[i]["STUDENTS' NAMES"]);
          }
        }
      }
    }

    if (NoError) {
      console.log("No Error");
    } else {
      let Cul = Culprits.join(", ");

      setModal_Title("Error");
      setModal_Message(`There is/are Error(s) with scores of \n ${Cul}`);
      setButton_Title("Ok, I will Check!");
      setShow_Modal(true);
    }
    return NoError;
  };

  const ProcessFile = async (FileObject) => {
    setMessage(`The system is processing the Deduction File submitted...`);
    // setshowProcessing(true);
    let ERows = [];
    let NewJsonArray = [];

    await ExcelRenderer(FileObject, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setCols(resp.cols);
        setRows(resp.rows);
        ERows = resp.rows;
      }
    });
    const keys = ERows[0];

    ERows.slice(1).map((rw) => {
      let obj = {};
      rw.forEach((cell, index) => {
        obj[keys[index]] = cell;
      });

      NewJsonArray.push(obj);
    });

    if (
      NewJsonArray[0]["SUBJECT"].toUpperCase() != pickedSubject.toUpperCase() ||
      NewJsonArray[0]["SESSION"] != session ||
      NewJsonArray[0]["TERM"].toUpperCase() != term.toUpperCase() ||
      NewJsonArray[0]["CLASS"].toUpperCase() != claz.toUpperCase()
    ) {
      DisplayNotification(
        "Error",
        "This file cannot be uploaded because the uploaded students' properties did not match the Selected students' properties. Please Check the Session, Term, Class and Subject picked",
        "danger",
        "top-center",
        10000
      );
    } else {
      if (CheckScoreValidity(NewJsonArray)) {
        // console.log(ConcernedStudents);
        // console.log(NewJsonArray);

        // iF ALL INPUTS ARE CORRECT, THEN DO THE FOLLOWING
        let ProcessedConcernedStudents = [];
        ConcernedStudents.forEach((element) => {
          const TreatedStudent = NewJsonArray.find(
            (item) =>
              item["SID"] === element.StdNum &&
              item["SESSION"].toString() === session.toString() &&
              item["CLASS"] === claz &&
              item["SUBJECT"] === pickedSubject
          );
          // console.log(TreatedStudent);
          if (TreatedStudent && TreatedStudent != undefined) {
            let cat1 = TreatedStudent["1ST CA (10)"]
              .toString()
              .replace(/\s+/g, "");
            let cat2 = TreatedStudent["2ND CA (20)"]
              .toString()
              .replace(/\s+/g, "");
            let ex = TreatedStudent["EXAM (70)"].toString().replace(/\s+/g, "");

            let ct1 = isNaN(cat1) ? 0 : parseFloat(cat1);
            let ct2 = isNaN(cat2) ? 0 : parseFloat(cat2);
            let x1 = isNaN(ex) ? 0 : parseFloat(ex);
            let ts = ct1 + ct2 + x1;
            let gmk = claz.includes("JS")
              ? GetJuniorGrade(ts)
              : GetSeniorGrade(ts);

            element = {
              ...element,
              CA1Score: "AB".includes(cat1.toUpperCase()) ? "AB" : cat1,
              CA2Score: "AB".includes(cat2.toUpperCase()) ? "AB" : cat2,
              EXAMScore: "AB".includes(ex.toUpperCase()) ? "AB" : ex,
              TotalScore: ts,
              Grade: gmk.grade,
              Remark: gmk.remark,
            };
            ProcessedConcernedStudents.push(element);
          } else {
            console.log(
              "Each Uploaded Details does not match Selected Details"
            );
          }
        });
        if (ProcessedConcernedStudents.length > 0) {
          SaveAllResults(ProcessedConcernedStudents);
          // console.log(ProcessedConcernedStudents);
        } else {
          DisplayNotification(
            "Success",
            "This file cannot be uploaded because the uploaded students' properties did not match the Selected students' properties. Please Check the Session, Term, Class and Subject picked",
            "danger",
            "top-center",
            7000
          );
        }
      }
    }
    setJSONdataArray(NewJsonArray);
  };

  const SaveAllResults = async (ConcStd) => {
    setMessage(`The system is saving the students scores into the database`);
    setshowProcessing(true);
    // let Proceed = "true";
    // let AB = "ABab";
    // ConcernedStudents.forEach((element) => {
    //   if (
    //     element.BackGCA1 === "red" ||
    //     element.BackGCA2 === "red" ||
    //     element.BackGEXAM === "red"
    //   ) {
    //     Proceed = false;
    //   }
    // });

    let TheResultsDetails = {
      Session: session,
      Term: term,
      Claz: claz,
      Subject: pickedSubject,
      Results: ConcStd,
    };

    let SaveTheScores = await axioscall("save_all_results", TheResultsDetails);

    if (SaveTheScores === "Saved Successfully") {
      setdisplayStudents(false);
      setshowProcessing(false);
      DisplayNotification(
        "Success",
        `The students scores have been succesfully ranked and saved`,
        "success",
        "top-center",
        7000
      );
    }
    // } else {
    //   DisplayNotification(
    //     "Error",
    //     "Scores cannot be saved. Please check the scored highlighted in Red Colour for correction",
    //     "danger",
    //     "top-center",
    //     7000
    //   );
    // }
  };
  return (
    <Row>
      <ReactNotifications />
      <Col md={12} lg={12} sm={12} xs={12}>
        <Row>
          <Form onSubmit={GetTheStudents}>
            <Row className="justify-content-around">
              <Col md={11} lg={11} sm={11} xs={11}>
                <h6 className="text-center h6">
                  Please fill in the details of the scores to be computed below
                </h6>
              </Col>
              <hr />
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
            <Row className="justify-content-around">
              {dataready && (
                <Col lg={3} md={3} sm={11} xs={11} className="mt-2 text-left">
                  <ReactHtmlTableToExcel
                    id="exportbutton"
                    className="btn btn-sm btn-info"
                    table="ScoreSheet"
                    filename={`${session.toUpperCase()} ${term.toUpperCase()} TERM ${claz.toUpperCase()} ${pickedSubject.toUpperCase()} SCORESHEET`.toUpperCase()}
                    sheet={pickedSubject.toUpperCase()}
                    buttonText="Download Score Templates"
                  />
                </Col>
              )}

              {dataready && (
                <Col lg={3} md={3} sm={11} xs={11} className="text-left">
                  <Form.Group
                    controlId="formfile"
                    className="mb-3 d-inline-block"
                  >
                    <Form.Label style={{ color: "brown", fontWeight: "bold" }}>
                      Upload Score Sheet
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="Pix1"
                      value={FileDirectory}
                      onChange={(e) => PickFile(e)}
                    />
                  </Form.Group>
                </Col>
              )}
            </Row>
            <Row className="d-flex justify-content-sm-around justify-content-md-end">
              <Col
                lg={3}
                md={3}
                sm={11}
                xs={11}
                className="mt-2 text-right text-end mt-2 pt-2"
              >
                <Button
                  variance="info"
                  type="submit"
                  disabled={!activateButton}
                >
                  Load Students
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
        {displayStudents && (
          <Row className="d-none">
            <Col md={12} lg={12} sm={12} xs={12}>
              <Table striped bordered hover responsive id="ScoreSheet">
                <thead>
                  <tr>
                    <th className="text-center">SN</th>
                    <th className="text-center">SESSION</th>
                    <th className="text-center">TERM</th>
                    <th className="text-center">SUBJECT</th>
                    <th className="text-center">CLASS</th>
                    <th className="text-center">SID</th>
                    <th className="text-center">STUDENTS' NAMES</th>
                    <th className="text-center">1ST CA (10)</th>
                    <th className="text-center">2ND CA (20)</th>
                    <th className="text-center">EXAM (70)</th>
                    {/* <th className="text-center">TOTAL</th>
                    <th className="text-center">GRADE</th>
                    <th className="text-center">POS</th>
                    <th className="text-center">REMARK</th>
                    {term === "Third" && (
                      <th className="text-center">DIVISOR</th>
                    )} */}
                  </tr>
                </thead>
                <tbody>
                  {ConcernedStudents.map((Student, index) => (
                    <tr key={index}>
                      <td className="text-center py-auto">{index + 1}</td>
                      <td className="py-auto">{session}</td>
                      <td className="py-auto">{term}</td>
                      <td className="py-auto">{pickedSubject}</td>
                      <td className="py-auto">{claz}</td>
                      <td className="py-auto">{Student.StdNum}</td>
                      <td className="py-auto">{Student.StdName}</td>
                      <td className="text-center py-auto">
                        {Student.CA1Score}
                      </td>
                      <td className="text-center py-auto">
                        {Student.CA2Score}
                      </td>
                      <td className="text-center py-auto">
                        {Student.EXAMScore}
                      </td>
                      {/* <td className="text-center py-auto">
                        {Student.TotalScore}
                      </td>
                      <td className="text-center py-auto">{Student.Grade}</td>
                      <td className="text-center py-auto">
                        {Student.Position}
                      </td>
                      <td className="text-center py-auto">{Student.Remark}</td>
                      {term === "Third" && (
                        <td className="text-center py-auto">
                          <Divisor_Select
                            Data={[3, 2, 1]}
                            Index={index}
                            Value={Student.Divisor}
                            GetTheValue={UpdateRecords}
                            Source="DIVISOR"
                          />
                        </td>
                      )} */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}
      </Col>
      {Show_Modal && (
        <OK_Modal
          title={Modal_Title}
          message={Modal_Message}
          ShowModal={Show_Modal}
          buttontitle={Button_Title}
          AfterEvent={AfterEvent}
          variant="success"
          size="sm"
        />
      )}
      <Processing_Modal
        Show={showProcessing}
        message={Message}
        variant="success"
        size="sm"
      />
    </Row>
  );
};

export default Import_Scores_File;
