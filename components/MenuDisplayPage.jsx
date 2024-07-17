"use client";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MenuTemplate from "./MenuTemplate";
import homepicture from "./Images/homepicture.png";
import Cookies from "universal-cookie";
import Login_Page from "./Login_Page";
import { ReactNotifications } from "react-notifications-component";
const MenuDisplayPage = () => {
  const cookies = new Cookies();
  const logged = cookies.get("Logged");

  const [MenuItems, setMenuItems] = useState([
    {
      Title: "New Student Registration",
      Icon: homepicture,
      link: "/",
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

  return (
    <Container fluid className="p-0 m-0">
      <ReactNotifications />
      <Row className="justify-content-around">
        <Col md={12} lg={12} sm={12} xs={12}>
          <Row className="justify-content-around">
            {MenuItems.map((menu, index) => (
              <Col md={4} lg={4} xs={12} sm={12} className="p-5">
                <MenuTemplate Menu={menu} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MenuDisplayPage;
