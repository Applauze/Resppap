"use client";
import React, { useState } from "react";
import axioscall from "./API_Call/axioscall";
import axios from "axios";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import OK_Modal from "./ModalsAndAlerts/OK_Modal";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import BorderedCardNoHover from "./Cards/BorderedCardNoHover";
import FormInputText from "./Inputs/FormInputText";
import classes from "./StudentRegistration.module.css";
import FormInputSelect from "./Inputs/FormInputSelect";
import FormInputDate from "./Inputs/FormInputDate";
import Image from "next/image";
import ImageResizer from "react-image-file-resizer";
import Cookies from "universal-cookie";
import Login_Page from "./Login_Page";

const StudentRegistration = () => {
  const cookies = new Cookies();
  const [Surname, setSurname] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Middlename, setMiddlename] = useState("");
  const [Dob, setDob] = useState("");
  const [SessionAdmitted, setSessionAdmitted] = useState("Select");
  const [ClassAdmitted, setClassAdmitted] = useState("Select");
  const [TermAdmitted, setTermAdmitted] = useState("Select");
  const [Sex, setSex] = useState("Select");
  const [pictureSelected, setpictureSelected] = useState(null);
  const [PictureDirectory, setPictureDirectory] = useState("");
  const [Modal_Title, setModal_Title] = useState("");
  const [Button_Title, setButton_Title] = useState("");
  const [Modal_Message, setModal_Message] = useState("");
  const [Show_Modal, setShow_Modal] = useState(false);
  const [Saving, setSaving] = useState(false);

  const TheColor = "brown";

  const AfterEvent = () => {
    setShow_Modal(false);
    setSurname("");
    setFirstname("");
    setMiddlename("");
    setSex("Select");
    setSessionAdmitted("Select");
    setClassAdmitted("Select");
    setTermAdmitted("Select");
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

  const SaveStudentInformation = async (e) => {
    e.preventDefault();
    let fmdata = new FormData();
    let StudentD = {
      Surname: Surname,
      Firstname: Firstname,
      Middlename: Middlename,
      Dob: Dob,
      SessionAdmitted: SessionAdmitted,
      TermAdmitted: TermAdmitted,
      ClassAdmitted: ClassAdmitted,
      Sex: Sex,
    };
    let StudentData = JSON.stringify(StudentD);
    fmdata.append("StudentData", StudentData);
    pictureSelected != null &&
      fmdata.append("pictureSelected", pictureSelected, Surname);
    setSaving(true);
    try {
      const response = await axios.post("/api/save_new_students", fmdata);
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Image upload failed:", error);
    }

    setSaving(false);
    setModal_Title("Success");
    setModal_Message(Firstname + "'s data saved succesfully!");
    setButton_Title("Ok, Thank you!");
    setShow_Modal(true);
  };

  const compressImage = (file, targetSizeInKb) => {
    return new Promise((resolve, reject) => {
      ImageResizer.imageFileResizer(
        file,
        100, // Set the maximum width to 600 pixels
        120, // Set the maximum height to 600 pixels
        "JPEG", // Set the output format to JPEG
        targetSizeInKb, // Set the target file size in kilobytes
        0, // Set the quality level to 0 (the library will adjust the quality to achieve the target size)
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  };

  const base64ToBlob = (base64) => {
    const parts = base64.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const byteCharacters = atob(parts[1]);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const blob = new Blob([new Uint8Array(byteArrays)], { type: contentType });
    return blob;
  };

  const changePicture = async (event) => {
    let namP = event.target.name;
    let valP = event.target.files[0];
    var FileSize = valP.size / 1024;
    // console.log(FileSize);
    //   var FileSize = valP.size / 1048576; // in MBin MB
    //   var FileSize = valP.size / 1073741824; // in KBin KB
    if (FileSize > 400) {
      // alert("Picture size exceeds 200kb");
      PCtx.displayAlert("ERROR", "Picture size exceeds 400KB", "danger");
    } else {
      let str = event.target.value;

      if (
        str.endsWith("jpg") ||
        str.endsWith("JPG") ||
        str.endsWith("jpeg") ||
        str.endsWith("JPEG")
      ) {
        valP = await compressImage(valP, 50);
        setPictureDirectory(URL.createObjectURL(base64ToBlob(valP)));
        setpictureSelected(base64ToBlob(valP));
      } else {
        // console.log("Only picture in jpg or jpeg format is accepted");
        PCtx.displayAlert(
          "ERROR",
          "Only picture in jpg or jpeg format is accepted",
          "danger"
        );
      }
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
                    be left blank if the candidate has none.
                  </li>
                  <li>
                    The surname, firstname are compulsory. The middle name may
                    be left blank if the candidate has none.
                  </li>
                  <li>
                    The surname, firstname are compulsory. The middle name may
                    be left blank if the candidate has none.
                  </li>
                  <li>
                    The surname, firstname are compulsory. The middle name may
                    be left blank if the candidate has none.
                  </li>
                  <li>
                    The surname, firstname are compulsory. The middle name may
                    be left blank if the candidate has none.
                  </li>
                </ul>
              </Col>
              <Col md={7} lg={7} sm={12} xs={12}>
                <Form className="pt-2 mb-4" onSubmit={SaveStudentInformation}>
                  <Row className="justify-content-around my-1">
                    <Col lg={12} md={12} xs={12} sm={12}>
                      <h4 className="h4 text-center mb-3">
                        New Student Registration Form
                      </h4>
                    </Col>
                  </Row>
                  <hr className={classes.formDivider} />
                  <Row className="justify-content-around">
                    <Col md={3} lg={3} sm={10} xs={10}>
                      <Row>
                        <Col md={12} lg={12} sm={12} xs={12}>
                          <Image
                            height={100}
                            width={100}
                            src={PictureDirectory}
                          />
                        </Col>
                        <Col>
                          <Form.Group controlId="formfile" className="mb-3">
                            <Form.Label
                              style={{ color: "brown", fontWeight: "bold" }}
                            >
                              Select Picture
                            </Form.Label>
                            <Form.Control
                              type="file"
                              name="Pix4"
                              value={null}
                              onChange={changePicture}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  ;
                  <hr className={classes.formDivider} />
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
                      <FormInputDate
                        Label="Date of Birth"
                        GetValue={setDob}
                        Color={TheColor}
                      />
                    </Col>
                  </Row>
                  <hr />
                  <Row className="justify-content-around my-1">
                    <Col md={5} lg={5} sm={10} xs={10}>
                      <FormInputSelect
                        Data={["20222023", "20232024", "20242025", "20252026"]}
                        Label="Session Admitted"
                        GetValue={setSessionAdmitted}
                        Color={TheColor}
                        Owner={SessionAdmitted}
                      />
                    </Col>
                    <hr className={classes.formDivider} />
                    <Col md={5} lg={5} sm={10} xs={10}>
                      <FormInputSelect
                        Data={["JS1", "JS2", "JS3", "SS1", "SS2", "SS3"]}
                        Label="Class on Admission"
                        GetValue={setClassAdmitted}
                        Color={TheColor}
                        Owner={ClassAdmitted}
                      />
                    </Col>
                  </Row>
                  <hr />
                  <Row className="justify-content-around my-1">
                    <Col md={5} lg={5} sm={10} xs={10}>
                      <FormInputSelect
                        Data={["First", "Second", "Third"]}
                        Label="Term Admitted"
                        GetValue={setTermAdmitted}
                        Color={TheColor}
                        Owner={TermAdmitted}
                      />
                    </Col>
                    <hr className={classes.formDivider} />
                    <Col md={5} lg={5} sm={10} xs={10}>
                      <FormInputSelect
                        Data={["Male", "Female"]}
                        Label="Sex"
                        GetValue={setSex}
                        Color={TheColor}
                        Owner={Sex}
                      />
                    </Col>
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

export default StudentRegistration;
