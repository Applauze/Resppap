"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import classes from "./AllPanel.module.css";
const AllPanel = (props) => {
  const [TheSubLinks, setTheSubLinks] = useState(props.TheLink);
  return (
    <Row className={classes.theRow}>
      <ListGroup className="p-0">
        {TheSubLinks.map((lnk, index) => (
          <ListGroupItem variant="primary" className={classes.ListItem}>
            <Link href={lnk.path} className={classes.subLinks}>
              <p className={classes.sublinkname}>{lnk.title}</p>
              <p className={classes.Description}>{lnk.desc}</p>
            </Link>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Row>
  );
};

export default AllPanel;
