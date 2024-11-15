"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Button, Row, Col, Nav, ListGroup } from "react-bootstrap";
import schoollogo from "./Images/modellogo.jpg";
import Image from "next/image";
import classes from "./TheHeader.module.css";
import MainLinks from "./MainLinks";
import ButtonBackground from "./Inputs/ButtonBackground";
import AllPanel from "./AllPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import BorderedCardNoHover from "./Cards/BorderedCardNoHover";
import OK_Modal from "./ModalsAndAlerts/OK_Modal";
import LogoutFunction from "./API_Call/exit";
import { shadows_Into_Light, rubik, pt_Sans } from "@/app/util/fonts";
import PermissionContext from "@/Store/permission-context";
import { DisplayNotification } from "./Notification";
const TheHeader = () => {
  const [Modal_Message, setModal_Message] = useState("");
  const [Show_Modal, setShow_Modal] = useState(false);
  const [Modal_Title, setModal_Title] = useState("");
  const [Button_Title, setButton_Title] = useState("");
  const PCtx = useContext(PermissionContext);

  const changeMenuClick = () => {
    PCtx.setMenuClicked(!PCtx.MenuClicked);
  };

  const AfterEvent = () => {
    window.location.href = "/";
  };

  const ExitFunction = async (e, lmk) => {
    e.preventDefault();
    lmk = lmk.toLowerCase();
    if (lmk === "log out") {
      if (await LogoutFunction()) {
        setModal_Title("Success");
        setModal_Message(
          "You have successfully logged out of the system. Do have a wonderful day, Bye"
        );
        setButton_Title("Ok, Bye");
        setShow_Modal(true);
      } else {
        DisplayNotification(
          "Error",
          `Error in logging out. Please contact the Admin `,
          "danger",
          "top-center",
          7000
        );
      }
    }
  };

  return (
    <Row className={`${classes.TheMainRow} ${classes.Hide4Print}`}>
      <Col md={12} lg={12} sm={12} xs={12} className="h-100">
        <Row className={classes.EacoedRow}>
          <Col md={12} lg={8} sm={12} xs={12} className="h-100">
            <Row className="h-100">
              <Col
                md={2}
                lg={2}
                sm={12}
                xs={12}
                className={`${classes.LogoCol} d-flex justify-content-center  align-items-center text-center  m-0 p-0`}
              >
                <Image
                  src={schoollogo}
                  className={` ${classes.Logo}`}
                  alt="School Logo"
                />
              </Col>
              <Col
                md={10}
                lg={10}
                sm={12}
                xs={12}
                className="d-flex flex-column justify-content-md-center justify-content-sm-start align-items-md-start align-items-sm-center"
              >
                <p className={` m-0  px-md-0 ${classes.schoolname}`}>
                  EAUED MODEL HIGH SCHOOL, OYO
                </p>
                <p className={`m-0 p-0 ${classes.forward}`}>
                  ...forward ever, backward never
                </p>
              </Col>
            </Row>
          </Col>
          <Col md={12} lg={4} sm={12} xs={12}>
            <Row
              className={`${classes.poweredRow} h-100 d-flex justify-content-end align-items-center`}
            >
              <Col
                md={6}
                lg={6}
                sm={6}
                xs={6}
                className={`d-inline-block  ${classes.powered}`}
              >
                Powered By:
              </Col>
              <Col
                md={6}
                lg={6}
                sm={6}
                xs={6}
                className={` d-inline-block justify-content-start  ${classes.waviy} `}
              >
                <span className={shadows_Into_Light}>A</span>
                <span className={shadows_Into_Light}>P</span>
                <span className={shadows_Into_Light}>P</span>
                <span className={shadows_Into_Light}>L</span>
                <span className={shadows_Into_Light}>A</span>
                <span className={shadows_Into_Light}>U</span>
                <span className={shadows_Into_Light}>S</span>
                <span className={shadows_Into_Light}>E</span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={`${classes.LinksRow} "justify-content-end"`}>
          <Col
            md={10}
            lg={10}
            sm={12}
            xs={12}
            className="d-flex justify-content-center align-items-center "
          >
            <ul className=" m-0  p-0">
              <li className="d-inline-block mx-0 px-3 ">
                <MainLinks LinkName="HOME" thepath="/" />
              </li>
              <li className="d-inline-block mx-0 px-2 ">
                <MainLinks
                  LinkName="REGISTRATION"
                  ThePanel={
                    <AllPanel
                      TheLink={[
                        {
                          title: "Student's Registration",
                          desc: "This opens a new form to register a newly admitted student who has no record on the software yet.",
                          path: "/studentregistration",
                        },
                        {
                          title: "Teacher's Registration",
                          desc: "This opens a new form to register a new teacher and provide the teacher with necessary login details",
                          path: "/teachersregistration",
                        },
                        {
                          title: "Subjects' Registration",
                          desc: "This opens a new form to register all the subjects offered by a  subject here",
                          path: "/subjectssregistration",
                        },
                      ]}
                    />
                  }
                />
              </li>
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks
                  LinkName="COMPUTATION"
                  ThePanel={
                    <AllPanel
                      TheLink={[
                        {
                          title: "Scores Computation",
                          desc: "Subject Teachers input the scores of their students by selecting the necessary details",
                          path: "/computescores",
                        },
                        {
                          title: "Students Attributes",
                          desc: "Class Teachers input the attributes of students in their class. This include the psychomotor and thhe affective domain",
                          path: "/computereports",
                        },
                      ]}
                    />
                  }
                />
              </li>
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks
                  LinkName="VIEW"
                  ThePanel={
                    <AllPanel
                      TheLink={[
                        {
                          title: "View Report Sheet",
                          desc: "Students completed Report Sheet can be viewed and printed or exported to parents here",
                          path: "/displayresults",
                        },
                        {
                          title: "View Broad Sheet",
                          desc: "Teachers view the cummulative broadsheet of scores of all the students in all subjects  in their class here",
                          path: "/displaybroadsheet",
                        },
                      ]}
                    />
                  }
                />
              </li>
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks LinkName="AWARDS" />
              </li>
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks
                  LinkName="ADMIN"
                  ThePanel={
                    <AllPanel
                      TheLink={[
                        {
                          title: "Subject Teacher Allocation",
                          desc: "Authorize a teacher to the subject he/she teaches for easy access to scores computation",
                          path: "/subjectteacherallocation",
                        },
                        {
                          title: "Class Teacher Allocation",
                          desc: "Authorize teacher to perform class teacher's work for a particular class",
                          path: "/classteacherallocation",
                        },
                        {
                          title: "Promote Students",
                          desc: "Promote successful students to the selected session with respect to their classes",
                          path: "/promotion",
                        },
                        {
                          title: "View Students PINs",
                          desc: "View students PINs for result checking",
                          path: "/pins",
                        },
                      ]}
                    />
                  }
                />
              </li>
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks LinkName="ABOUT" />
              </li>
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks LinkName="LOG OUT" Action={ExitFunction} />
              </li>
            </ul>
          </Col>
          <Col md={2} lg={2} sm={12}>
            <ButtonBackground
              ButtonName="12:00:00"
              ButtonCss={{ display: "block" }}
            />
          </Col>
        </Row>

        <Row className={`h-100 p-0 m-0   ${classes.MenuBarRow}`}>
          <Col
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="d-flex align-self-end  justify-content-end align-items-center"
          >
            <Button
              className="d-block ml-3"
              variant="secondary-outline"
              onClick={changeMenuClick}
            >
              {PCtx.MenuClicked ? (
                <FontAwesomeIcon icon={faTimes} style={{ color: "black" }} />
              ) : (
                <FontAwesomeIcon icon={faBars} style={{ color: "black" }} />
              )}
            </Button>
          </Col>
          <Col
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={
              PCtx.MenuClicked
                ? classes.MobileMenuPanelOn
                : classes.MobileMenuPanelOff
            }
          >
            <div
              style={{
                position: "relative",
                margin: "0px",
                padding: "0px !important",
              }}
            >
              <BorderedCardNoHover
                MyStyle={{
                  padding: "0px !important",
                  margin: "0px !important",
                  position: "absolute",
                  right: "0",
                  top: "0",
                  zIndex: "1 !important",
                  borderRadius: "0px !important",
                  width: "100%",
                }}
              >
                <ListGroup
                  style={{
                    margin: "0px !important",
                    borderRadius: "0px",
                    margin: "0px",
                    display: "inline-block",
                  }}
                >
                  <ListGroup.Item
                    className={`${classes.MobileMenuList} w-100 m-0`}
                  >
                    <Link href="/" className={`${rubik} ${classes.subLinks}`}>
                      Home
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={`${classes.MobileMenuList} w-100 m-0 d-block`}
                  >
                    <div className={`${rubik} ${classes.subLinks}`}>
                      Registration
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/studentregistration"
                          className={classes.submobilelinks}
                        >
                          Students Registration
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/teachersregistration"
                          className={classes.submobilelinks}
                        >
                          Staff Registration
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/subjectsregistration"
                          className={classes.submobilelinks}
                        >
                          Subjects Registration
                        </Link>
                      </p>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={`${classes.MobileMenuList} w-100 m-0 d-block`}
                  >
                    <div className={`${rubik} ${classes.subLinks}`}>
                      Computation
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/computescores"
                          className={classes.submobilelinks}
                        >
                          Scores Computation
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/computereports"
                          className={classes.submobilelinks}
                        >
                          Students Attributes
                        </Link>
                      </p>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={`${classes.MobileMenuList} w-100 m-0 d-block`}
                  >
                    <div className={`${rubik} ${classes.subLinks}`}>
                      View
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/displayresults"
                          className={classes.submobilelinks}
                        >
                          View Report Sheet
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/displaybroadsheet"
                          className={classes.submobilelinks}
                        >
                          View Broad Sheet
                        </Link>
                      </p>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={`${classes.MobileMenuList} w-100 m-0`}
                  >
                    <Link href="#" className={`${rubik} ${classes.subLinks}`}>
                      Award
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={`${classes.MobileMenuList} w-100 m-0`}
                  >
                    <Link href="#" className={`${rubik} ${classes.subLinks}`}>
                      About
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={`${classes.MobileMenuList} w-100 m-0 d-block`}
                  >
                    <div className={`${rubik} ${classes.subLinks}`}>
                      Admin
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/subjectteacherallocation"
                          className={classes.submobilelinks}
                        >
                          Subject Teacher Allocation
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/classteacherallocation"
                          className={classes.submobilelinks}
                        >
                          Class Teacher Allocation
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/classteacherallocation"
                          className={classes.submobilelinks}
                        >
                          Change Student Class
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/promotion"
                          className={classes.submobilelinks}
                        >
                          Promote Students
                        </Link>
                      </p>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={`${classes.MobileMenuList} w-100 m-0`}
                  >
                    <Link
                      href="#"
                      className={`${rubik} ${classes.subLinks}`}
                      onClick={(e) => ExitFunction(e, "Log Out")}
                    >
                      Log Out
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </BorderedCardNoHover>
            </div>
          </Col>
        </Row>
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
    </Row>
  );
};

export default TheHeader;
