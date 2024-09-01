"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Button, Row, Col, Nav, ListGroup } from "react-bootstrap";
import { Accordion, Panel } from "rsuite";
import schoollogo from "./Images/schoollogo.png";
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
import "rsuite/dist/rsuite.min.css";
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
                  LinkName="ABOUT US"
                  ThePanel={
                    <AllPanel
                      TheLink={[
                        {
                          title: "History",
                          desc: "Brief Information about the history of the school",
                          path: "/history",
                        },
                        {
                          title: "University Management",
                          desc: "The Profile of the Principal Officers of our Mother School (EAUED)",
                          path: "/topmanagement",
                        },
                        {
                          title: "School Management",
                          desc: "The profile of the Principal Officers of the school",
                          path: "/schoolmanagement",
                        },
                        {
                          title: "Our Mission",
                          desc: "Our Mission Statement",
                          path: "/mission",
                        },
                        {
                          title: "Our Vision",
                          desc: "Our Long term Projection",
                          path: "/mission",
                        },
                      ]}
                    />
                  }
                />
              </li>
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks
                  LinkName="ACADEMICS"
                  ThePanel={
                    <AllPanel
                      TheLink={[
                        {
                          title: "Overview",
                          desc: "An overview of our academic programs that make us the best",
                          path: "/academicoverview",
                        },
                        {
                          title: "Curriculum",
                          desc: "The Curriculum we operate with for our academic programs",
                          path: "/curriculum",
                        },
                        {
                          title: "Junior Secondary School",
                          desc: "Details of our Junior Secondary School academic programs",
                          path: "/jss",
                        },
                        {
                          title: "Senior Secondary School",
                          desc: "Details of our Senior Secondary School academic programs",
                          path: "/sss",
                        },
                        {
                          title: "External Examinations",
                          desc: "The external examinations written by our students",
                          path: "/examination",
                        },
                      ]}
                    />
                  }
                />
              </li>
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks
                  LinkName="INFORMATION"
                  ThePanel={
                    <AllPanel
                      TheLink={[
                        {
                          title: "School Calendar",
                          desc: "The school calendar for the present term",
                          path: "/calendar",
                        },
                        {
                          title: "News & Events",
                          desc: "Major events happening within and outside the school ",
                          path: "/news",
                        },
                        {
                          title: "Photo Gallery",
                          desc: "Our events in pictures",
                          path: "/gallery",
                        },
                        {
                          title: "Video Gallery",
                          desc: "Our recordings on school major events",
                          path: "/gallery",
                        },
                      ]}
                    />
                  }
                />
              </li>
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks
                  LinkName="FACILITIES"
                  ThePanel={
                    <AllPanel
                      TheLink={[
                        {
                          title: "Hostel",
                          desc: "Information about the school hostel for the boarders",
                          path: "/hostel",
                        },
                        {
                          title: "School Laboratories",
                          desc: "Information on our Science and other laboratories",
                          path: "/laboratories",
                        },
                        {
                          title: "ICT Center",
                          desc: "Our well equipped information and communication technology center",
                          path: "/ict",
                        },
                        {
                          title: "Medical Center",
                          desc: "Check out our standard medical center managed by qualified and experienced medical personnel",
                          path: "/medics",
                        },
                        {
                          title: "School Library",
                          desc: "Our well equiped library with large and relevant collections of books and digital resources",
                          path: "/library",
                        },
                        {
                          title: "School Buses",
                          desc: "Our medium of transportation",
                          path: "/transport",
                        },
                      ]}
                    />
                  }
                />
              </li>

              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks
                  LinkName="PORTALS"
                  ThePanel={
                    <AllPanel
                      TheLink={[
                        {
                          title: "Result Portal",
                          desc: "Check the students academic Performance",
                          path: "/result",
                        },
                        {
                          title: "School Fees Portal",
                          desc: "Make payment online or check payment status",
                          path: "/fees",
                        },
                      ]}
                    />
                  }
                />
              </li>
              <li className="d-inline-block mx-4 px-2 ">
                <MainLinks LinkName="CONTACT US" />
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
                <div className="d-block" style={{ backgroundColor: "#d5d5fd" }}>
                  <Panel header="Homes" style={{ height: "50px" }}></Panel>
                  <Accordion defaultActiveKey={1}>
                    <Accordion.Panel header="About" eventKey={2}>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/history"
                          className={classes.submobilelinks}
                        >
                          History
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/studentregistration"
                          className={classes.submobilelinks}
                        >
                          University Management
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/teachersregistration"
                          className={classes.submobilelinks}
                        >
                          School Management
                        </Link>
                      </p>
                    </Accordion.Panel>
                    <Accordion.Panel header="Admission" eventKey={3}>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/computescores"
                          className={classes.submobilelinks}
                        >
                          Overview
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/computereports"
                          className={classes.submobilelinks}
                        >
                          Admission Process
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/computereports"
                          className={classes.submobilelinks}
                        >
                          Apply Now
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/computereports"
                          className={classes.submobilelinks}
                        >
                          Placement Assessment
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/computereports"
                          className={classes.submobilelinks}
                        >
                          Admission List
                        </Link>
                      </p>
                    </Accordion.Panel>
                    <Accordion.Panel header="Academics" eventKey={4}>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/displayresults"
                          className={classes.submobilelinks}
                        >
                          Overview
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/displaybroadsheet"
                          className={classes.submobilelinks}
                        >
                          Curriculum
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/computereports"
                          className={classes.submobilelinks}
                        >
                          JSS
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/computereports"
                          className={classes.submobilelinks}
                        >
                          SSS
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/computereports"
                          className={classes.submobilelinks}
                        >
                          External Examinations
                        </Link>
                      </p>
                    </Accordion.Panel>
                    <Accordion.Panel header="Information" eventKey={5}>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/subjectteacherallocation"
                          className={classes.submobilelinks}
                        >
                          Calendar
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/classteacherallocation"
                          className={classes.submobilelinks}
                        >
                          News & Events
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/classteacherallocation"
                          className={classes.submobilelinks}
                        >
                          Photo Gallery
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/classteacherallocation"
                          className={classes.submobilelinks}
                        >
                          Video Gallery
                        </Link>
                      </p>
                    </Accordion.Panel>
                    <Accordion.Panel header="Facilities" eventKey={6}>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/subjectteacherallocation"
                          className={classes.submobilelinks}
                        >
                          School Hostel
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/classteacherallocation"
                          className={classes.submobilelinks}
                        >
                          School Laboratories
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/classteacherallocation"
                          className={classes.submobilelinks}
                        >
                          ICT Center
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/classteacherallocation"
                          className={classes.submobilelinks}
                        >
                          Medical Center
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/classteacherallocation"
                          className={classes.submobilelinks}
                        >
                          School Library
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/classteacherallocation"
                          className={classes.submobilelinks}
                        >
                          School Buses
                        </Link>
                      </p>
                    </Accordion.Panel>
                    <Accordion.Panel header="Portals" eventKey={7}>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/subjectteacherallocation"
                          className={classes.submobilelinks}
                        >
                          Result Portal
                        </Link>
                      </p>
                      <p className={`${classes.submobileP} ml-3 my-0`}>
                        <Link
                          href="/classteacherallocation"
                          className={classes.submobilelinks}
                        >
                          Fees Portal
                        </Link>
                      </p>
                    </Accordion.Panel>
                  </Accordion>
                </div>
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
