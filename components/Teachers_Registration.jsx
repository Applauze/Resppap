"use client";
import React, { useState, useEffect, useContext } from "react";
import PermissionContext from "@/Store/permission-context";
import axioscall from "./API_Call/axioscall";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import OK_Modal from "./ModalsAndAlerts/OK_Modal";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import BorderedCardNoHover from "./Cards/BorderedCardNoHover";
import FormInputText from "./Inputs/FormInputText";
import FormInputPassword from "./Inputs/FormInputPassword";
import classes from "./Teachers_Registration.module.css";
import FormInputSelect from "./Inputs/FormInputSelect";
import { DisplayNotification } from "./Notification";
import Cookies from "universal-cookie";

const Teachers_Registration = (props) => {
  const cookies = new Cookies();
  const [TeachersID, setTeachersID] = useState("");
  const [Title, setTitle] = useState("");
  const [Surname, setSurname] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Middlename, setMiddlename] = useState("");
  const [Gateway, setGateway] = useState("");
  const [Gateway2, setGateway2] = useState("");
  const [AllTheTeachersID, setAllTheTeachersID] = useState([]);
  const [Category, setCategory] = useState("Select");
  const [Modal_Title, setModal_Title] = useState("");
  const [Button_Title, setButton_Title] = useState("");
  const [Modal_Message, setModal_Message] = useState("");
  const [Show_Modal, setShow_Modal] = useState(false);
  const [Saving, setSaving] = useState(false);
  var CryptoJS = require("crypto-js");
  const PCtx = useContext(PermissionContext);
  useEffect(() => {
    PCtx.setMenuClicked(false);
  }, []);
  const TheColor = "brown";

  useEffect(() => {
    const AllTeachers = JSON.parse(props.TeachersNames);
    setAllTheTeachersID(AllTeachers.AllTeachersID);
  }, []);

  const AfterEvent = () => {
    setShow_Modal(false);
    setSurname("");
    setFirstname("");
    setMiddlename("");
    setTeachersID("");
    setGateway("");
    setGateway2("");
    setCategory("Select");
    setTitle("Select");
  };

  const CapitalizeFirstLetter = (str) => {
    return str != "" ? str[0].toUpperCase() + str.slice(1).toLowerCase() : "";
  };

  const GetSurname = (str) => {
    setSurname(str.toUpperCase());
  };

  const GetMiddlename = (str) => {
    setMiddlename(CapitalizeFirstLetter(str));
  };
  const GetFirstname = (str) => {
    setFirstname(CapitalizeFirstLetter(str));
  };
  const GetTeachersID = (str) => {
    setTeachersID(CapitalizeFirstLetter(str));
  };

  const SaveStudentInformation = async (e) => {
    e.preventDefault();

    if (Gateway === Gateway2) {
      if (!AllTheTeachersID.includes(TeachersID)) {
        let WayGate = CryptoJS.AES.encrypt(
          Gateway,
          "143tonybridget"
        ).toString();
        let TeacherData = {
          TeachersID: TeachersID,
          Title: Title,
          Gateway: WayGate,
          Surname: Surname,
          Firstname: Firstname,
          Middlename: Middlename,
          Category: Category,
        };

        setSaving(true);
        const response = await axioscall("save_new_teacher", TeacherData);

        if (response === "Saved Successfully") {
          setSaving(false);
          setModal_Title("Success");
          setModal_Message(Firstname + "'s data saved succesfully!");
          setButton_Title("Ok, Thank you!");
          setShow_Modal(true);
        }
      } else {
        DisplayNotification(
          "Error",
          `A teacher has already taken "${TeachersID}" as Teacher's ID, Please use another Teacher's ID`,
          "danger",
          "top-center",
          7000
        );
      }
    } else {
      DisplayNotification(
        "Error",
        `Unmatched password. Please check the password enetered in both boxes and ensure they are the same`,
        "danger",
        "top-center",
        7000
      );
    }
  };

  return (
    <Container fluid>
      <ReactNotifications />
      <Row className="justify-content-around">
        <Col lg={10} md={10} sm={11} xs={11} className="my-4">
          <BorderedCardNoHover
            MyStyle={{
              backgroundColor: "#eeeeee",
              padding: "0px",
              margin: "0px",
            }}
          >
            <Row>
              <Col
                md={5}
                lg={5}
                sm={12}
                xs={12}
                className={`p-5 ${classes.FormFirstDivision}`}
              >
                <h6 className='"text-center'>
                  Please read Carefully before filling this form
                </h6>
                <ul>
                  <li>
                    The surname, firstname are compulsory. The middle name may
                    be left blank if the teacher has none.
                  </li>
                  <li>
                    Note that password are case sensitive and must be atleast
                    six characters long. i.e PASSWORD is not te same as Password
                    nor password.
                  </li>
                  <li>
                    Ensure that the information enetered in Password Field and
                    Retype Password field are the same.
                  </li>
                  <li>
                    Your TeacherID and Password are very essential. Please keep
                    it safe and confidential as you will need it for subsequent
                    login.
                  </li>
                  <li>
                    The Admin is to choose the Category of teachers you belong
                    to.
                  </li>
                  <li>
                    Direct any question or information that is not clear to the
                    Admin before saving this form.
                  </li>
                </ul>
              </Col>
              <Col md={7} lg={7} sm={12} xs={12}>
                <Form className="pt-2 mb-4" onSubmit={SaveStudentInformation}>
                  <Row className="justify-content-around my-1">
                    <Col lg={12} md={12} xs={12} sm={12}>
                      <h4 className="h4 text-center mb-3">
                        New Teacher's Registration Form
                      </h4>
                    </Col>
                  </Row>
                  <hr className={classes.formDivider} />
                  <Row className="justify-content-around my-1">
                    <Col md={5} lg={5} sm={10} xs={10}>
                      <FormInputText
                        Label="Teacher's ID"
                        GetValue={GetTeachersID}
                        Color={TheColor}
                        readonly={Saving}
                        Owner={TeachersID}
                      />
                    </Col>
                    <hr className={classes.formDivider} />
                    <Col md={5} lg={5} sm={10} xs={10}>
                      <FormInputSelect
                        Data={["Mr.", "Mrs.", "Miss.", "Chief", "Dr."]}
                        Label="Title"
                        GetValue={setTitle}
                        Color={TheColor}
                        Owner={Title}
                      />
                    </Col>
                  </Row>
                  <hr />

                  <Row className="justify-content-around my-1">
                    <Col md={5} lg={5} sm={10} xs={10}>
                      <FormInputPassword
                        Label="Password"
                        GetValue={setGateway}
                        Color={TheColor}
                        readonly={Saving}
                        Owner={Gateway}
                        Required={true}
                      />
                    </Col>
                    <hr className={classes.formDivider} />
                    <Col md={5} lg={5} sm={10} xs={10}>
                      <FormInputPassword
                        Label="Re-enter Password"
                        GetValue={setGateway2}
                        Color={TheColor}
                        readonly={Saving}
                        Owner={Gateway2}
                        Required={true}
                      />
                    </Col>
                  </Row>
                  <hr />
                  <Row className="justify-content-around my-1">
                    <Col md={5} lg={5} sm={10} xs={10}>
                      <FormInputText
                        Label="Surname"
                        GetValue={GetSurname}
                        Color={TheColor}
                        readonly={Saving}
                        Owner={Surname}
                      />
                    </Col>
                    <hr className={classes.formDivider} />
                    <Col md={5} lg={5} sm={10} xs={10}>
                      <FormInputText
                        Label="Firstname"
                        GetValue={GetFirstname}
                        Color={TheColor}
                        readonly={Saving}
                        Owner={Firstname}
                      />
                    </Col>
                  </Row>

                  <hr />
                  <Row className="justify-content-around my-1">
                    <Col md={5} lg={5} sm={10} xs={10}>
                      <FormInputText
                        Label="Middlename"
                        GetValue={GetMiddlename}
                        Color={TheColor}
                        readonly={Saving}
                        Owner={Middlename}
                      />
                    </Col>
                    <hr className={classes.formDivider} />
                    <Col md={5} lg={5} sm={10} xs={10}>
                      <FormInputSelect
                        Data={["Non Admin"]}
                        Label="Category"
                        GetValue={setCategory}
                        Color={TheColor}
                        Owner={Category}
                      />
                    </Col>
                    {/* <Col md={5} lg={5} sm={10} xs={10}>
                      <FormInputDate
                        Label="Date of Birth"
                        GetValue={setDob}
                        Color={TheColor}
                      />
                    </Col> */}
                  </Row>
                  <hr />

                  <Row className="justify-content-around align-items-end">
                    <Col md={4} lg={4} sm={6} xs={6} className="text-center">
                      <Button
                        variant="danger"
                        className="btn_small px-md-4 mt-3"
                        disabled={Saving}
                        onClick={AfterEvent}
                      >
                        Clear
                      </Button>
                    </Col>
                    <Col md={4} lg={4} sm={6} xs={6} className="text-center">
                      {Saving ? (
                        <Button
                          variant="success"
                          className="btn_small px-md-4 mt-3"
                          disabled
                          type="submit"
                        >
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Saving...
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          className="btn_small px-md-4 mt-3"
                          type="submit"
                        >
                          Save
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </BorderedCardNoHover>
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
    </Container>
  );
};

export default Teachers_Registration;
