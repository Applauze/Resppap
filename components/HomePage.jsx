import React from "react";
import { Button, Row, Col, Nav, ListGroup } from "react-bootstrap";
import { Divider } from "rsuite";
import Principal from "@/components/Images/schoolImages/Principal.jpg";
import Image from "next/image";
import classes from "./HomePage.module.css";
import mainimage2 from "@/components/Images/schoolImages/mainimage3.jpg";
import mainimage1 from "@/components/Images/schoolImages/mainimage1.jpg";
import mission from "@/components/Images/schoolImages/mission.png";
import vision from "@/components/Images/schoolImages/vision.png";
import core from "@/components/Images/schoolImages/core.png";
import award from "@/components/Images/schoolImages/award.jpeg";
import BorderedCard from "./Cards/BorderedCard";
import BorderedCardNoHover from "./Cards/BorderedCardNoHover";
import { kanit, rubik, pt_Sans } from "@/app/util/fonts";
import NumberRecordsDescription from "./HomePageComponents/NumberRecordsDescription";
import MissionVissionCoreComponents from "./HomePageComponents/MissionVissionCoreComponents";
import NewsAndEventsComponents from "./HomePageComponents/NewsAndEventsComponents";

const HomePage = () => {
  return (
    <Row>
      <Col md={12} sm={12} lg={12} className="p-0 m-0">
        {/* The Image Row */}
        <Row
          className={`${classes.MainImageRow} d-flex align-content-end justify-content-start`}
        >
          <Col
            md={4}
            lg={4}
            sm={12}
            className="px-5 py-3 d-flex align-content-center justify-content-md-center"
          >
            <BorderedCard
              MyStyle={{ backgroundColor: "rgba(210, 210, 210, 0.5)" }}
            >
              <h4>WELCOME TO EAUED MHS</h4>
              <hr />
              <p className={classes.MissionParagraph}>
                Our Mission is to encoutrage academic excellence and creativity
                through a rigorous and relevant curriculum, innovative teaching
                methods and a commitment to character development.
              </p>
            </BorderedCard>
            {/* <Image src={mainimage2} alt="" /> */}
          </Col>
        </Row>

        <Row className={classes.VisionMission}>
          <Col md={4} lg={4} sm={12}>
            <Row className="px-5">
              <Col className="my-3">
                <MissionVissionCoreComponents
                  img={mission}
                  title="Our Mission"
                  stmt="Our Mission is to encoutrage academic excellence and creativity through a rigorous and relevant curriculum, innovative teaching  methods and a commitment to character development."
                />
              </Col>
            </Row>
          </Col>
          <Col md={4} lg={4} sm={12}>
            <Row className="px-5">
              <Col className="my-3">
                <MissionVissionCoreComponents
                  img={vision}
                  title="Our Vision"
                  stmt="Our Mission is to encoutrage academic excellence and creativity through a rigorous and relevant curriculum, innovative teaching  methods and a commitment to character development."
                />
              </Col>
            </Row>
          </Col>
          <Col md={4} lg={4} sm={12}>
            <Row className="px-5">
              <Col className="my-3">
                <MissionVissionCoreComponents
                  img={core}
                  title="Core Values"
                  stmt="Our Mission is to encoutrage academic excellence and creativity through a rigorous and relevant curriculum, innovative teaching  methods and a commitment to character development."
                />
              </Col>
            </Row>
          </Col>
          <Col md={4} lg={4} sm={12}></Col>
          <Col md={4} lg={4} sm={12}></Col>
        </Row>
        {/* Principal Speech Section */}
        <Row className="px-5">
          <Col md={12} sm={12} className="pt-3  m-0">
            <h3 className={classes.AtAGlance}>
              <Divider>WELCOME TO EAUED MHS!</Divider>
            </h3>
          </Col>
          <Col md={12} sm={12}>
            <hr className={classes.hrGlance} />
          </Col>
          <Col>
            <p className={classes.PrincipalMessage}>
              <span className="border border-gray-300 p-2 border-rounded d-inline-block float-start m-3">
                <Image
                  src={Principal}
                  alt="Principal's Image"
                  className={`${classes.PrincipalImage} thumbnail roundedCircle`}
                />
                <span className={classes.DrAyoola}>DR. A.A. AYOOLA</span>
                <span className={classes.Designation}>PRINCIPAL</span>
              </span>
              <span className={classes.pmsgW}>W</span>elcome to Emmanuel
              Alayande University of Education Model High School Model High
              School, a vibrant and inclusive learning community where students,
              teachers and parents work together to achieve excellence. I am
              thrilled to welcome you to our school website where you can
              explore our rich history, academic programs, extracurricular
              activities and community events. Our school is committed to
              providing a supportive and stimulating environment that fosters
              intellectual curiosity, creativity and character development. At
              AEUED MHS, we believe that every student has the potential to
              suceed and make a positive impact in the world. Our dedicated
              teachers and staff are passionate about helping students grow into
              compassionate, confident and critically thinking individuals.
              Wether you are a prospective student, parent or community member,
              I invite you to explore our website and discover what makes EAUED
              MHS a special place. Please feel free to contact us with any
              questions or to scheldulea visit. Thank you for your interest in
              our school. I look forward to welcoming you to our community!
            </p>
          </Col>
        </Row>
        {/* At a glance section */}
        <Row>
          <Col md={12} sm={12} className="pt-3  m-0">
            <h3 className={classes.AtAGlance}>
              <Divider>AT A GLANCE</Divider>
            </h3>
          </Col>
          <Col md={12} sm={12}>
            <hr className={classes.hrGlance} />
          </Col>
          <Col md={12} sm={12} lg={12} className="my-2">
            <Row className="justify-content-around">
              <Col
                md={3}
                lg={3}
                sm={12}
                className="d-flex  justify-content-center"
              >
                <NumberRecordsDescription
                  figure={800}
                  Desc={"Students Enrollment"}
                />
              </Col>
              <Col
                md={3}
                lg={3}
                sm={12}
                className="d-flex  justify-content-center"
              >
                <NumberRecordsDescription
                  figure={100}
                  Desc={"Qualified & Experienced Teachers"}
                />
              </Col>
              <Col
                md={3}
                lg={3}
                sm={12}
                className="d-flex  justify-content-center"
              >
                <NumberRecordsDescription
                  figure={5}
                  Desc={"Well equipped & Standard Laboratories"}
                />
              </Col>
              <Col
                md={3}
                lg={3}
                sm={12}
                className="d-flex  justify-content-center"
              >
                <NumberRecordsDescription
                  figure={150}
                  Desc={"Awards of Excellence"}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Why you should choose us section */}
        <Row className="px-5 py-4">
          <Col md={4} lg={4} sm={12}>
            <Row>
              <Col md={12} sm={12} className="pt-3  m-0">
                <h3 className={classes.AtAGlance2}>
                  <Divider>WHY YOU SHOULD US</Divider>
                </h3>
              </Col>
              <Col md={12} sm={12}>
                <hr className={classes.hrGlance2} />
              </Col>
              <Col>
                <ul>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    High-Quality teaching and learning.
                  </li>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    Wide range of subjects and extracurricular activities.
                  </li>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    Strong track record of academic achievement.
                  </li>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    Caring, qualified and experienced teachers and staff.
                  </li>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    Inclusive and diverse school culture
                  </li>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    Opportunities for student leadership and development
                  </li>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    Modern classrooms and technology
                  </li>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    Safe and secure learning environment
                  </li>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    Regular progress monitoring and feedback
                  </li>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    ... And many more
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col md={4} lg={4} sm={12}>
            <Image
              src={award}
              alt="awardImg"
              style={{ width: "100%", height: "90%" }}
            />
          </Col>
          <Col md={4} lg={4} sm={12}>
            <Row>
              <Col md={12} sm={12} className="pt-3  m-0">
                <h3 className={classes.AtAGlance2}>
                  <Divider>OUR ACHIEVEMENTS</Divider>
                </h3>
              </Col>
              <Col md={12} sm={12}>
                <hr className={classes.hrGlance2} />
              </Col>
              <Col>
                <ul>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    95% success (above 200 Score) in the last JAMB UTME
                    Examination
                  </li>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    98% Pass (at credit level) in the last WAEC and NECO
                    examination
                  </li>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    1st Position in the 2024 ANCOPSS Inter School Debate
                    Competition
                  </li>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    1st Position in 2024 edition of Mathematics Association of
                    Nigeria (MAN) Quiz Competition for secondary schools
                  </li>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    1st Position in the 2024 Olympiad Mathematics Competition
                  </li>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    Overall Best Position in Cultural display Competition
                    Organised by Oyo State Government
                  </li>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    1st Position in 75% of Inter House Sport Competition held in
                    other schools
                  </li>
                  <li className={`${classes.WhyChooseParagraph} ${kanit}`}>
                    ... And many more
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* News and Events Section  */}
        <Row>
          <Col md={12} sm={12} className="pt-3  m-0">
            <h3 className={classes.AtAGlance}>
              <Divider>NEWS & EVENTS</Divider>
            </h3>
          </Col>
          <Col md={12} sm={12}>
            <hr className={classes.hrGlance} />
          </Col>
          <Col>
            <NewsAndEventsComponents
              NewsImage={mainimage1}
              NewsMonth={"SEPTEMBER"}
              NewsDay={30}
              NewsTitle={"EAUED MHS celebrates 10 years of Existence"}
              NewsDetails={
                "It was a great joy at the grand finale of a week long celebration of ten years anniversary of EAUED MHS as the students and staff could not hold their feelings. The Principal of the school, Mr A.A. Ayoola opened the danced floor with other dignatries bith from the mother University and the School."
              }
            />
            <hr className="mx-5 my-3 p-0" />
            <NewsAndEventsComponents
              NewsImage={mainimage1}
              NewsMonth={"SEPTEMBER"}
              NewsDay={25}
              NewsTitle={"EAUED MHS celebrates 10 years of Existence"}
              NewsDetails={
                "It was a great joy at the grand finale of a week long celebration of ten years anniversary of EAUED MHS as the students and staff could not hold their feelings. The Principal of the school, Mr A.A. Ayoola opened the danced floor with other dignatries bith from the mother University and the School."
              }
            />
            <hr className="mx-5 my-3 p-0" />
            <NewsAndEventsComponents
              NewsImage={mainimage1}
              NewsMonth={"SEPTEMBER"}
              NewsDay={22}
              NewsTitle={"EAUED MHS celebrates 10 years of Existence"}
              NewsDetails={
                "It was a great joy at the grand finale of a week long celebration of ten years anniversary of EAUED MHS as the students and staff could not hold their feelings. The Principal of the school, Mr A.A. Ayoola opened the danced floor with other dignatries bith from the mother University and the School."
              }
            />
            <hr className="mx-5 my-3 p-0" />
            <NewsAndEventsComponents
              NewsImage={mainimage1}
              NewsMonth={"SEPTEMBER"}
              NewsDay={20}
              NewsTitle={"EAUED MHS celebrates 10 years of Existence"}
              NewsDetails={
                "It was a great joy at the grand finale of a week long celebration of ten years anniversary of EAUED MHS as the students and staff could not hold their feelings. The Principal of the school, Mr A.A. Ayoola opened the danced floor with other dignatries bith from the mother University and the School."
              }
            />
            <hr className="mx-5 my-3 p-0" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default HomePage;
