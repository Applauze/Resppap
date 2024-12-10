"use client";
import React, { useState, useEffect, useContext } from "react";
import PermissionContext from "@/Store/permission-context";
import Session from "./SessionTermClass/Session";
import Class from "./SessionTermClass/Class";
import Term from "./SessionTermClass/Term";
import Subjects from "./SessionTermClass/Subjects";
import Processing_Modal from "./ModalsAndAlerts/Processing_Modal";
import classes from "./Display_Broadsheet.module.css";
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
import ButtonBackground from "./Inputs/ButtonBackground";

const Display_Broadsheet = (props) => {
  const cookies = new Cookies();
  const [session, setsession] = useState("Select");
  const [claz, setclaz] = useState("Select");
  const [term, setterm] = useState("Select");
  const [showProcessing, setshowProcessing] = useState(false);
  const [Message, setMessage] = useState("");
  const [activateSelector, setactivateSelector] = useState(true);
  const [activateButton, setactivateButton] = useState(false);
  const [displayBroadsheet, setdisplayBroadsheet] = useState(false);
  const [AllBroadSheetInfo, setAllBroadSheetInfo] = useState([]);
  const [AllBroadSheetInfoHeader, setAllBroadSheetInfoHeader] = useState([]);
  const buttonBackground = {
    backgroundColor: "#003152",
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.2) ",
  };

  const PCtx = useContext(PermissionContext);

  const buttonCss = {
    width: "100%",
  };

  useEffect(() => {
    PCtx.setMenuClicked(false);
  }, []);

  useEffect(() => {
    const activateTheButton = () => {
      if (session != "Select" && claz != "Select" && term != "Select") {
        setactivateButton(true);
      } else {
        setactivateButton(false);
      }
    };
    setdisplayBroadsheet(false);
    activateTheButton();
  }, [session, claz, term]);

  const PrintTheReport = async () => {
    window.print();
    DisplayNotification(
      "Success",
      `The Broadsheet has been sent to the Printer`,
      "success",
      "top-center",
      5000
    );
  };

  const GetTheStudents = async (e) => {
    e.preventDefault();
    setMessage(`The system is retrieving the broadsheet for ${claz}`);
    setshowProcessing(true);
    let BroadsheetParam = {
      Session: session,
      Term: term,
      Claz: claz,
    };

    let BroadSheetInfoInJSON = await axioscall(
      "load_broadsheet",
      BroadsheetParam
    );

    if (
      BroadSheetInfoInJSON === "No result" ||
      BroadSheetInfoInJSON === "Error"
    ) {
      setshowProcessing(false);
      DisplayNotification(
        "Error",
        `No result found, check the details you have entered for possible error or contact the administrator for assistance`,
        "danger",
        "top-center",
        7000
      );
    } else {
      let BInfo = JSON.parse(BroadSheetInfoInJSON);
      setAllBroadSheetInfo(BInfo);
      setAllBroadSheetInfoHeader(BInfo[0]);
      setdisplayBroadsheet(true);
      setshowProcessing(false);
    }
  };

  const RotatedHeading = (ind, Heading) => {
    if (ind < 2) {
      return (
        <td key={ind} className={` ${classes.BoldTableHeading}`}>
          {Heading}
        </td>
      );
    } else {
      return (
        <td
          key={ind}
          className={`${classes.RotatedHeading} ${classes.BoldTableHeading}`}
        >
          {Heading}
        </td>
      );
    }
  };

  return (
    <Container fluid>
      <ReactNotifications />
      <div className={classes.Hide4Print}>
        <BorderedCardNoHover MyStyle={{ borderRadius: "0px" }}>
          <Row>
            <Col md={12} lg={12} sm={11} xs={11}>
              <h4 className="text-center h4">BROADSHEET DISPLAY</h4>
            </Col>
          </Row>
          {/* <hr /> */}
          <Row>
            <Form onSubmit={GetTheStudents}>
              <Row className="justify-content-around">
                <Col md={12} lg={12} sm={11} xs={11}>
                  <h6 className="text-center h6">
                    Please fill in the details of the class you want to display
                    the Broadsheet
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
                    style={buttonBackground}
                  >
                    Retrieve Students
                  </Button>
                </Col>
              </Row>
            </Form>
          </Row>
        </BorderedCardNoHover>
      </div>
      {displayBroadsheet && (
        <Row>
          <Col md={12} lg={12} xs={12} sm={12} className="p-3">
            <h5 className="h5 text-center">
              {`${claz} BROADSHEET FOR ${session} SESSION, ${term} TERM `.toUpperCase()}
            </h5>
            <Table responsive hover bordered striped>
              <thead>
                <tr>
                  <td
                    className={classes.BoldTableHeading}
                    style={{ width: "3%", textAlign: "center" }}
                  >
                    SN
                  </td>
                  {AllBroadSheetInfoHeader.map(
                    (hd, index) => index != 0 && RotatedHeading(index, hd)
                  )}
                </tr>
              </thead>
              <tbody>
                {AllBroadSheetInfo.map(
                  (bd, index) =>
                    index != 0 && (
                      <tr key={index}>
                        <td>{index}</td>
                        {bd.map(
                          (dt, ind) =>
                            ind != 0 && (
                              <td
                                key={ind}
                                className={
                                  ind > 1
                                    ? classes.TableData
                                    : classes.TableData2
                                }
                                style={
                                  ind > 1
                                    ? parseFloat(dt) >= 50 ||
                                      ind === bd.length - 4 ||
                                      ind === bd.length - 3
                                      ? { color: "blue" }
                                      : { color: "red" }
                                    : { color: "brown" }
                                }
                              >
                                {dt}
                              </td>
                            )
                        )}
                      </tr>
                    )
                )}
              </tbody>
            </Table>
          </Col>
          <Col md={12} lg={12} sm={12} className={classes.Hide4Print}>
            <ButtonBackground
              ButtonName="PRINT"
              ButtonAction={PrintTheReport}
              ButtonCss={buttonCss}
            />
          </Col>
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

export default Display_Broadsheet;
