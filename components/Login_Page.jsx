"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axioscall from "./API_Call/axioscall";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import OK_Modal from "./ModalsAndAlerts/OK_Modal";
import { faKey, faUserAlt } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Card,
} from "react-bootstrap";
import BorderedCardNoHover from "./Cards/BorderedCardNoHover";
import classes from "./Login_Page.module.css";
import FormInputPassword from "./Inputs/FormInputPassword";
import { DisplayNotification } from "./Notification";
import Cookies from "universal-cookie";
import MainImage from "./Images/MainImage.jpg";
import MenuDisplayPage from "./MenuDisplayPage";
import Processing_Modal from "./ModalsAndAlerts/Processing_Modal";
import Image from "next/image";
const Login_Page = (props) => {
  const [TeacherID, setTeacherID] = useState("");
  const [Gateway, setGateway] = useState("");
  var CryptoJS = require("crypto-js");
  const router = useRouter();
  const [Saving, setSaving] = useState(false);
  const [showProcessing, setshowProcessing] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [Message, setMessage] = useState("");
  const cookies = new Cookies();
  const TheColor = "#400000";
  const buttonBackground = {
    backgroundColor: "#003152",
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.2) ",
  };
  const GetTeacherID = (str) => {
   
    setTeacherID(CapitalizeFirstLetter(str));
  };

  const CapitalizeFirstLetter = (str) => {
    return str != "" ? str[0].toUpperCase() + str.slice(1).toLowerCase() : "";
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    setMessage(`The system is authenticating you...`);
    setshowProcessing(true);
    let WayGate = CryptoJS.AES.encrypt(Gateway, "143tonybridget").toString();
    console.log(TeacherID);
    let LoginDetails = { TeacherID: TeacherID, Gateway: WayGate };
    let Ac = await axioscall("get_access", LoginDetails);
    console.log(Ac);
    let Accessor = JSON.parse(Ac);
    let logstatus = Accessor.LogStatus;

    // console.log(Accessor.Access);
    // var bytes = CryptoJS.AES.decrypt(Accessor.Access, "143tonybridget");
    // var Allowance = bytes.toString(CryptoJS.enc.Utf8);
    setshowProcessing(false);
    if (logstatus) {
      let d = new Date();
      d.setTime(d.getTime() + 720 * 60 * 1000);
      cookies.set("this_staff", TeacherID, { path: "/", expires: d });
      cookies.set("this_category", Accessor.Category, {
        path: "/",
        expires: d,
      });
      cookies.set("this_fullname", Accessor.Username, {
        path: "/",
        expires: d,
      });
      cookies.set("Logged", true, {
        path: "/",
        expires: d,
      });

      window.location.reload(true);
      DisplayNotification(
        "Success",
        `Welcome ${Accessor.Username}, APPLAUSE wishes you an enjoyable moment with the application. Contact the Administrator in case you face any challenge `,
        "success",
        "top-center",
        7000
      );
    } else {
      DisplayNotification(
        "Error",
        `Incorrect Username and Password. Please check the username and password entered and try again or contact the Administrator `,
        "danger",
        "top-center",
        7000
      );
    }
  };

  useEffect(() => {
    if (props.Redirection) {
      DisplayNotification(
        "Error",
        `Oops!!! Your Session has expired, Please login with your Username and Password `,
        "danger",
        "top-center",
        7000
      );
    }
  }, []);

  return (
    <Container fluid className="p-0 m-0">
      <ReactNotifications />
      <Row>
        <Col md={12} lg={12} sm={12}>
          <Row
            style={{ height: "80px" }}
            className="justify-content-around align-items-center"
          >
            <Col className="text-center">
              <p className={classes.Softname}>
                Result Processing & Production Portal
              </p>
            </Col>
          </Row>
          <Row className={classes.MainRow}>
            <Col md={7} lg={7} sm={7} className="h-100">
              <Image src={MainImage} alt="Main Image" />
            </Col>
            <Col md={5} sm={12} xs={12} className={classes.formCol}>
              <Row className="justify-content-around align-items-center h-100">
                <Col md={8} sm={10} xs={10}>
                  <Card
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.5) " }}
                    className="px-4"
                  >
                    <Card.Body>
                      <h2
                        className="h2 text-center"
                        style={{
                          fontFamily: "Times New Roman",
                        }}
                      >
                        WELCOME TO APPLAUSE BUSMAS!
                      </h2>
                      <h6 className="text-center">
                        Please login with your Username and Password
                      </h6>
                      <hr />
                      <Form onSubmit={LoginUser}>
                        <Row>
                          <Col md={12} sm={12} xs={12}>
                            <div
                              className=" mt-2 p-4"
                              style={{
                                boxShadow:
                                  "10px 10px 5px rgba(68, 68, 68, 0.6)",
                                border: "1px groove #800000",
                                marginLeft: "0px",
                                marginRight: "0px",
                              }}
                            >
                              <div
                                className="input-group"
                                style={{ boxShadow: "5px 5px #b1b1b1" }}
                              >
                                <div className="input-group-prepend">
                                  <span
                                    id="basic-addon"
                                    className={`${
                                      classes.AllBgColor
                                    } ${"input-group-text"}`}
                                  >
                                    <FontAwesomeIcon
                                      icon={faUserAlt}
                                      style={{ color: "white" }}
                                    />
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Your Username?"
                                  name="Username"
                                  value = {TeacherID}
                                  aria-label="Username"
                                  onChange={(e) => GetTeacherID(e.target.value)}
                                  required={true}
                                  style={{ borderRadius: "0px" }}
                                />
                              </div>
                              <div
                                className="input-group mt-3"
                                style={{ boxShadow: "5px 5px #b1b1b1" }}
                              >
                                <div className="input-group-prepend">
                                  <span
                                    id="basic-addon"
                                    className={`${
                                      classes.AllBgColor
                                    } ${"input-group-text"}`}
                                  >
                                    <FontAwesomeIcon
                                      icon={faKey}
                                      style={{ color: "white" }}
                                    />
                                  </span>
                                </div>
                                <input
                                  type="password"
                                  className="form-control"
                                  name="gateway"
                                  placeholder="Password"
                                  aria-label="Password"
                                  onChange={(e) => setGateway(e.target.value)}
                                  aria-describedby="basic-addon"
                                  required={true}
                                  style={{ borderRadius: "0px" }}
                                />
                              </div>
                            </div>
                          </Col>
                          <Col
                            md={12}
                            sm={2}
                            xs={2}
                            className="align-items-right"
                          >
                            <Row>
                              <Col
                                md={2}
                                sm={2}
                                xs={2}
                                className="offset-8 offset-md-8 offset-sm-8 offset-xs-8"
                              >
                                <Button
                                  type="submit"
                                  className="btn btn-danger mt-3 mr-4"
                                  variant="danger"
                                  style={{ backgroundColor: "brown" }}
                                >
                                  Login
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
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

export default Login_Page;
