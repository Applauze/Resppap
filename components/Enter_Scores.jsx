import React, { useState, useEffect } from "react";
import Session from "./SessionTermClass/Session";
import Class from "./SessionTermClass/Class";
import Term from "./SessionTermClass/Term";
import Subjects from "./SessionTermClass/Subjects";
import InputTextWithoutLabel from "./Inputs/InputTextWithoutLabel";
import Processing_Modal from "./ModalsAndAlerts/Processing_Modal";
import { Row, Col, Form, Button, Table, Tabs, Tab } from "react-bootstrap";
import axioscall from "./API_Call/axioscall";
import { DisplayNotification } from "./Notification";
import "react-notifications-component/dist/theme.css";
import Divisor_Select from "./Inputs/Divisor_Select";
import Cookies from "universal-cookie";
import { ReactNotifications } from "react-notifications-component";

const Enter_Scores = (props) => {
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
  const [Message, setMessage] = useState("");
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
    console.log("Activating UseEffect...");
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
    setdisplayStudents(false);
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

  const UpdateRecords = (index, score, source) => {
    let AB = "ABab";
    let Error = "Error";
    if (!isNaN(score) || AB.includes(score) || Error.includes(score)) {
      let TempScores = [...ConcernedStudents];
      let AffectedStudents = { ...TempScores[index] };
      switch (source) {
        case "CA1":
          AffectedStudents = ScoreCheck(score, 10, AffectedStudents, "CA1");

          break;
        case "CA2":
          AffectedStudents = ScoreCheck(score, 20, AffectedStudents, "CA2");
          break;
        case "EXAM":
          AffectedStudents = ScoreCheck(score, 70, AffectedStudents, "EXAM");
          break;
        case "DIVISOR":
          AffectedStudents = ScoreCheck(score, 0, AffectedStudents, "DIVISOR");
          break;
      }

      TempScores[index] = AffectedStudents;
      setConcernedStudents(TempScores);
    }
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

  const SaveAllResults = async () => {
    setMessage(`The system is saving the students scores into the database`);
    setshowProcessing(true);
    let Proceed = "true";
    let AB = "ABab";
    ConcernedStudents.forEach((element) => {
      if (
        element.BackGCA1 === "red" ||
        element.BackGCA2 === "red" ||
        element.BackGEXAM === "red"
      ) {
        Proceed = false;
      }
    });

    if (Proceed) {
      let TheResultsDetails = {
        Session: session,
        Term: term,
        Claz: claz,
        Subject: pickedSubject,
        Results: ConcernedStudents,
      };

      let SaveTheScores = await axioscall(
        "save_all_results",
        TheResultsDetails
      );

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
    } else {
      DisplayNotification(
        "Error",
        "Scores cannot be saved. Please check the scored highlighted in Red Colour for correction",
        "danger",
        "top-center",
        7000
      );
    }
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
            <Row className="d-flex justify-content-sm-around justify-content-md-end">
              <Col
                lg={3}
                md={3}
                sm={11}
                xs={11}
                className="mt-2 text-right text-end my-2 py-2"
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
          <Row>
            <Col md={12} lg={12} sm={12} xs={12}>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="text-center">SN</th>
                    <th className="text-center">STUDENTS' NAMES</th>
                    <th className="text-center">1ST CA</th>
                    <th className="text-center">2ND CA</th>
                    <th className="text-center">EXAM</th>
                    <th className="text-center">TOTAL</th>
                    <th className="text-center">GRADE</th>
                    <th className="text-center">POS</th>
                    <th className="text-center">REMARK</th>
                    {term === "Third" && (
                      <th className="text-center">DIVISOR</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {ConcernedStudents.map((Student, index) => (
                    <tr key={index}>
                      <td className="text-center py-auto">{index + 1}</td>
                      <td className="py-auto">{Student.StdName}</td>
                      <td className="text-center py-auto">
                        <InputTextWithoutLabel
                          TheValue={Student.CA1Score}
                          GetTheValue={UpdateRecords}
                          Index={index}
                          Source="CA1"
                          BackGrd={Student.BackGCA1}
                        />
                      </td>
                      <td className="text-center py-auto">
                        <InputTextWithoutLabel
                          TheValue={Student.CA2Score}
                          GetTheValue={UpdateRecords}
                          Index={index}
                          Source="CA2"
                          BackGrd={Student.BackGCA2}
                        />
                      </td>
                      <td className="text-center py-auto">
                        <InputTextWithoutLabel
                          TheValue={Student.EXAMScore}
                          GetTheValue={UpdateRecords}
                          Index={index}
                          Source="EXAM"
                          BackGrd={Student.BackGEXAM}
                        />
                      </td>
                      <td className="text-center py-auto">
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
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col className="text-center">
              <Button
                variant="success"
                className="btn btn-bg"
                onClick={SaveAllResults}
              >
                SAVE ALL SCORES
              </Button>
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
  );
};

export default Enter_Scores;
