"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container, Row, Col } from "react-bootstrap";
import MenuTemplate from "./MenuTemplate";
import homepicture from "./Images/homepicture.png";
import Cookies from "universal-cookie";
import classes from "./MenuDisplayPage.module.css";
import { DisplayNotification } from "./Notification";
import { ReactNotifications } from "react-notifications-component";
import LogoutFunction from "./API_Call/exit";
import OK_Modal from "./ModalsAndAlerts/OK_Modal";

const MenuDisplayPage = () => {
  const cookies = new Cookies();
  const logged = cookies.get("Logged");
  const router = useRouter();
  const [Modal_Message, setModal_Message] = useState("");
  const [Show_Modal, setShow_Modal] = useState(false);
  const [Modal_Title, setModal_Title] = useState("");
  const [Button_Title, setButton_Title] = useState("");
  const [MenuItems, setMenuItems] = useState([
    {
      Title: "New Student Registration",
      Icon: homepicture,
      link: "/studentregistration",
      IsReal: true,
    },
    {
      Title: "New Staff Registration",
      Icon: homepicture,
      link: "/teachersregistration",
      IsReal: true,
    },
    {
      Title: "Subjects Registration",
      Icon: homepicture,
      link: "/subjectsregistration",
      IsReal: true,
    },
    {
      Title: "Scores Computation",
      Icon: homepicture,
      link: "/computescores",
      IsReal: true,
    },
    {
      Title: "Class Teacher's Work",
      Icon: homepicture,
      link: "/computereports",
      IsReal: true,
    },
    {
      Title: "View Report Sheet",
      Icon: homepicture,
      link: "/displayresults",
      IsReal: true,
    },
    {
      Title: "View Broad Sheet",
      Icon: homepicture,
      link: "/displaybroadsheet",
      IsReal: true,
    },
    { Title: "Log Out", Icon: homepicture, link: "#", IsReal: true },
  ]);

  useEffect(() => {
    let AM = [...MenuItems];
    let MenuRemains = 3 - (AM.length % 3);
    if (MenuRemains > 0) {
      let DummyMenu = {
        Title: "Dummy",
        Icon: homepicture,
        link: "",
        IsReal: false,
        //   Action: decryption(PCtx.SP) ? "/applause/getsupplyreport" : "/applause/#",
      };

      for (var x = 0; x < MenuRemains; x++) {
        AM = [...AM, DummyMenu];
      }
      setMenuItems(AM);
    }
  }, []);

  const AfterEvent = () => {
    window.location.reload(true);
  };

  const ExitFunction = async () => {
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
  };

  return (
    <Container fluid className="p-0 m-0">
      <ReactNotifications />
      <Row className="justify-content-around">
        <Col md={12} lg={12} sm={12} xs={12}>
          <Row className="justify-content-around">
            {MenuItems.map((menu, index) => (
              <Col
                md={4}
                lg={4}
                xs={12}
                sm={12}
                className={classes.EachMenuCol}
                key={index}
              >
                <MenuTemplate Menu={menu} Ex={ExitFunction} />
              </Col>
            ))}
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
    </Container>
  );
};

export default MenuDisplayPage;
