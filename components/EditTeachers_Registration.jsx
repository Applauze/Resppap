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
import { AutoComplete } from "rsuite";
import "rsuite/dist/rsuite.css";

const EditTeachers_Registration = (props) => {
  const cookies = new Cookies();
  const [TeachersID, setTeachersID] = useState("");
  const [Title, setTitle] = useState("");
  const [Surname, setSurname] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Middlename, setMiddlename] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Gateway, setGateway] = useState("");
  const [Gateway2, setGateway2] = useState("");
  const [AllTheTeachersID, setAllTheTeachersID] = useState([]);
  const [Category, setCategory] = useState("Select");
  const [Modal_Title, setModal_Title] = useState("");
  const [Button_Title, setButton_Title] = useState("");
  const [Modal_Message, setModal_Message] = useState("");
  const [PickedTeacherName, setPickedTeacherName] = useState("");
  const [Show_Modal, setShow_Modal] = useState(false);
  const [Saving, setSaving] = useState(false);
  const [AllTeachersName, setAllTeachersName] = useState([]);
  const [AllSurnames, setAllSurnames] = useState([]);
  const [AllFirstnames, setAllFirstnames] = useState([]);
  const [AllMiddlenames, setAllMiddlenames] = useState([]);
  const [AllTitles, setAllTitles] = useState([]);
  const [AllPhones, setAllPhones] = useState([]);
  const [AllEmails, setAllEmails] = useState([]);
  const [AllCategories, setAllCategories] = useState([]);
  const [activateButton, setactivateButton] = useState(false);

  var CryptoJS = require("crypto-js");
  const PCtx = useContext(PermissionContext);
  useEffect(() => {
    PCtx.setMenuClicked(false);
  }, []);
  const TheColor = "brown";

  useEffect(() => {
    const AllTeachers = JSON.parse(props.TeachersNames);
    setAllTeachersName(AllTeachers.AllTeachersNames);
    setAllTheTeachersID(AllTeachers.AllTeachersID);
    setAllSurnames(AllTeachers.AllSurname);
    setAllFirstnames(AllTeachers.AllFirstname);
    setAllMiddlenames(AllTeachers.AllMiddlename);
    setAllTitles(AllTeachers.AllTitle);
    setAllCategories(AllTeachers.AllCategory);
    setAllPhones(AllTeachers.AllPhone);
    setAllEmails(AllTeachers.AllEmail);
  }, []);

  const AfterEvent = () => {
    setShow_Modal(false);
    window.location.reload(true);
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

  const GetPhone = (str) => {
    if (!isNaN(str)) {
      setPhone(str);
    }
  };

  const getTeacherPicked = (snm) => {
    setPickedTeacherName(snm);
    if (AllTeachersName.includes(snm)) {
      let TIndx = AllTeachersName.indexOf(snm);
      setTeachersID(AllTheTeachersID[TIndx]);
      setSurname(AllSurnames[TIndx]);
      setFirstname(AllFirstnames[TIndx]);
      setMiddlename(AllMiddlenames[TIndx]);
      setTitle(AllTitles[TIndx]);
      setCategory(AllCategories[TIndx]);
      setPhone(AllPhones[TIndx]);
      setEmail(AllEmails[TIndx]);
      setactivateButton(true);
    } else {
      setactivateButton(false);
    }
  };

  const SaveTeacherInformation = async (e) => {
    e.preventDefault();

    if (Gateway === Gateway2 || (Gateway === "" && Gateway2 === "")) {
      let WayGate =
        Gateway != ""
          ? CryptoJS.AES.encrypt(Gateway, "143tonybridget").toString()
          : "";
      let TeacherData = {
        TeachersID: TeachersID,
        Title: Title,
        Gateway: WayGate,
        Surname: Surname,
        Firstname: Firstname,
        Middlename: Middlename,
        Category: Category,
        Phone: Phone,
        Email: Email,
      };

      setSaving(true);
      const response = await axioscall("editteachersproperties", TeacherData);

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
          <Row>
            <Col md={12} lg={12} sm={11} xs={11}>
              <h4 className="text-center h4">EDIT STUDENT'S DETAILS</h4>
              <h6 className="my-3 text-center">
                Enter and pick the name of teacher whose properties are to be
                edited
              </h6>
            </Col>
          </Row>

          <Row className="justify-content-around">
            <Col lg={6} md={6} sm={11} xs={11}>
              <Form.Group>
                <Form.Label style={{ color: "brown" }}>
                  Teaher's Name
                </Form.Label>

                <AutoComplete
                  data={AllTeachersName}
                  value={PickedTeacherName}
                  onChange={getTeacherPicked}
                  onSelect={getTeacherPicked}
                  style={{
                    border: "1px solid brown",
                    backgroundColor: "#b3ff66",
                    borderRadius: "3px",
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>
        {activateButton && (
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
                      six characters long. i.e PASSWORD is not te same as
                      Password nor password.
                    </li>
                    <li>
                      Ensure that the information enetered in Password Field and
                      Retype Password field are the same.
                    </li>
                    <li>
                      Your TeacherID and Password are very essential. Please
                      keep it safe and confidential as you will need it for
                      subsequent login.
                    </li>
                    <li>
                      The Admin is to choose the Category of teachers you belong
                      to.
                    </li>
                    <li>
                      Direct any question or information that is not clear to
                      the Admin before saving this form.
                    </li>
                  </ul>
                </Col>
                <Col md={7} lg={7} sm={12} xs={12}>
                  <Form className="pt-2 mb-4" onSubmit={SaveTeacherInformation}>
                    <Row className="justify-content-around my-1">
                      <Col lg={12} md={12} xs={12} sm={12}>
                        <h4 className="h4 text-center mb-3">
                          Edit Teacher's Registration Properties
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
                          Owner={TeachersID}
                          readonly={true}
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
                          Required={false}
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
                          Required={false}
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
                        <FormInputText
                          Label="Phone Number"
                          GetValue={GetPhone}
                          Color={TheColor}
                          readonly={Saving}
                          Owner={Phone}
                        />
                      </Col>
                    </Row>
                    <hr />
                    <Row className="justify-content-around my-1">
                      <Col md={5} lg={5} sm={10} xs={10}>
                        <FormInputText
                          Label="Email"
                          GetValue={setEmail}
                          Color={TheColor}
                          readonly={Saving}
                          Owner={Email}
                        />
                      </Col>
                      <hr className={classes.formDivider} />
                      <Col md={5} lg={5} sm={10} xs={10}>
                        <FormInputSelect
                          Data={["Admin", "Non Admin"]}
                          Label="Category"
                          GetValue={setCategory}
                          Color={TheColor}
                          Owner={Category}
                        />
                      </Col>
                    </Row>
                    <hr />

                    <Row className="justify-content-around align-items-end">
                      {/* <Col md={4} lg={4} sm={6} xs={6} className="text-center">
                      <Button
                        variant="danger"
                        className="btn_small px-md-4 mt-3"
                        disabled={Saving}
                        onClick={AfterEvent}
                      >
                        Clear
                      </Button>
                    </Col> */}
                      <Col md={6} lg={6} sm={8} xs={8} className="text-center">
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
        )}
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

export default EditTeachers_Registration;
