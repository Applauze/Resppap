"use client";
import React, { useState, useEffect, useContext } from "react";
import PermissionContext from "@/Store/permission-context";
import { useRouter } from "next/navigation";
import axioscall from "./API_Call/axioscall";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
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
import Cookies from "universal-cookie";
import classes from "./Login_Page.module.css";
import FormInputPassword from "./Inputs/FormInputPassword";
import { DisplayNotification } from "./Notification";
import MainImage from "./Images/MainImage.jpg";
import MenuDisplayPage from "./MenuDisplayPage";
import Processing_Modal from "./ModalsAndAlerts/Processing_Modal";
import Image from "next/image";
import { roboto_serif } from "@/app/util/fonts";

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
  const PCtx = useContext(PermissionContext);
  useEffect(() => {
    PCtx.setMenuClicked(false);
  }, []);
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
    <div>
      <ReactNotifications />
      <Row>
        <Col md={12} lg={12} sm={12}>
          <Row className="justify-content-around align-items-center border border-danger">
            <Col className="text-center">
              <p className={` ${classes.Softname} ${roboto_serif}`}>
                Result Processing & Production Portal
              </p>
            </Col>
          </Row>
          <Row className={classes.MainRow}>
            <Col md={7} lg={7} sm={7} className={`${classes.MainImg} h-100`}>
              <Image src={MainImage} alt="Main Image" />
            </Col>
            <Col md={5} sm={12} xs={12} className={classes.formCol}>
              <Row
                className={` justify-content-around align-items-center h-100 ${classes.FormMainRow}`}
              >
                <Col md={9} sm={10} xs={10}>
                  <Card
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.5) " }}
                  >
                    <Card.Body>
                      <h2
                        className="h2 text-center"
                        style={{
                          fontFamily: "Times New Roman",
                        }}
                      >
                        WELCOME TO APPLAUSE RESPAPP!
                      </h2>
                      <h6 className="text-center">
                        Please login with your Username and Password
                      </h6>
                      <hr />
                      <Form onSubmit={LoginUser} autoComplete="false">
                        <Row>
                          <Col md={12} sm={12} xs={12}>
                            <div
                              className=" mx-md-5 my-3 m-sm-2 p-4"
                              style={{
                                boxShadow:
                                  "10px 10px 5px rgba(68, 68, 68, 0.6)",
                                border: "2px groove #800000",
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
                                  value={TeacherID}
                                  aria-label="Username"
                                  onChange={(e) => GetTeacherID(e.target.value)}
                                  onBlur={(e) => GetTeacherID(e.target.value)}
                                  required={true}
                                  autoComplete="off"
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
                                  autoComplete="off"
                                  onChange={(e) => setGateway(e.target.value)}
                                  onBlur={(e) => setGateway(e.target.value)}
                                  aria-describedby="basic-addon"
                                  required={true}
                                  style={{ borderRadius: "0px" }}
                                />
                              </div>
                            </div>
                          </Col>
                          <Col
                            md={12}
                            sm={12}
                            xs={12}
                            className="align-items-right"
                          >
                            <Row className="d-flex justify-content-end  p-0">
                              <Col
                                md={4}
                                sm={4}
                                xs={4}
                                className="m-0 pr-1  text-end"
                              >
                                <Button
                                  type="submit"
                                  className="btn btn-danger mt-3"
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
    </div>
  );
};

export default Login_Page;
