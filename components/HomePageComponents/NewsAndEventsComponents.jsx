import React from "react";
import { Button, Row, Col, Nav, ListGroup } from "react-bootstrap";
import BorderedCardNoHover from "../Cards/BorderedCardNoHover";
import { kanit, rubik, pt_Sans } from "@/app/util/fonts";
import Image from "next/image";
import classes from "./NewsAndEventsComponents.module.css";
import Link from "next/link";
const NewsAndEventsComponents = (props) => {
  return (
    <Row className="px-5 pt-3">
      <Col lg={2} md={2} sm={12}>
        <p className={`${classes.NewsMonth} ${kanit}`}>{props.NewsMonth}</p>
        <hr className="m-0 p-0 w-25 mx-auto text-center d-flex justify-content-center" />
        <p className={classes.NewsDay}>{props.NewsDay}</p>
      </Col>
      <Col lg={4} md={4} sm={12}>
        <Image
          src={props.NewsImage}
          alt="News Image"
          thumbnail
          roundedCircle
          className={`border border-gray-300 ${classes.NewsImage}`}
        />
      </Col>
      <Col lg={6} md={6} sm={12}>
        <p className={`${classes.NewsTitle} ${kanit}`}>{props.NewsTitle}</p>
        <p className="text-ju">{props.NewsDetails}</p>
        <p>
          <Link href="#" className={classes.theLinks}>
            {"Read more >>>"}
          </Link>
        </p>
      </Col>
    </Row>
  );
};

export default NewsAndEventsComponents;
