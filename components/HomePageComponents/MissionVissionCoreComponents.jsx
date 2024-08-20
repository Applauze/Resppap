import React from "react";
import { Button, Row, Col, Nav, ListGroup } from "react-bootstrap";
import BorderedCardNoHover from "../Cards/BorderedCardNoHover";
import { kanit, rubik, pt_Sans } from "@/app/util/fonts";
import Image from "next/image";
import classes from "./MissionVisionCoreComponent.module.css";
const MissionVissionCoreComponents = (props) => {
  return (
    <Row className="px-5">
      <Col className="my-3">
        <BorderedCardNoHover>
          <div className="d-flex justify-content-center">
            <Image
              src={props.img}
              alt="missionIcon"
              className={classes.MissionImage}
            />
          </div>
          <p className={`${classes.Missionh5} ${kanit} text-center my-1`}>
            {props.title}
          </p>
          <p className={classes.MissionP}>{props.stmt}</p>
        </BorderedCardNoHover>
      </Col>
    </Row>
  );
};

export default MissionVissionCoreComponents;
