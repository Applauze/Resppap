"use client";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "react-notifications-component/dist/theme.css";
import StudentRegistration from "./StudentRegistration";

const MainContainer = () => {
  // const [RoutePage, setRoutePage] = useState([
  //   { path: "/", component: HomePage },
  //   { path: "/applause", component: HomePage },
  //   { path: "/newregistration", component: CustomerRegistration },
  //   { path: "/mycart", component: CartPage },
  //   { path: "/newitem", component: NewItem },
  //   { path: "/itempicked/:Id", component: MainItemDisplay },
  //   { path: "/searchresults/:sp", component: SearchDisplayPage },
  // ]);
  return (
    <Container fluid className="m-0 p-0">
      <StudentRegistration />
    </Container>
  );
};

export default MainContainer;
