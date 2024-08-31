"use client";
import React, { useState } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  ListGroup,
  Table,
  CardHeader,
  CardBody,
  Form,
} from "react-bootstrap";
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
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { kanit, rubik, pt_Sans } from "@/app/util/fonts";
import NumberRecordsDescription from "./HomePageComponents/NumberRecordsDescription";
import MissionVissionCoreComponents from "./HomePageComponents/MissionVissionCoreComponents";
import NewsAndEventsComponents from "./HomePageComponents/NewsAndEventsComponents";
import Gallery from "react-photo-gallery";
import gal_img1 from "@/components/Images/schoolImages/Gal/gal_img1.jpg";
import gal_img2 from "@/components/Images/schoolImages/Gal/gal_img2.jpg";
import gal_img3 from "@/components/Images/schoolImages/Gal/gal_img3.jpg";
import gal_img4 from "@/components/Images/schoolImages/Gal/gal_img4.jpg";
import gal_img5 from "@/components/Images/schoolImages/Gal/gal_img5.jpg";
import gal_img6 from "@/components/Images/schoolImages/Gal/gal_img6.jpg";
import gal_img7 from "@/components/Images/schoolImages/Gal/gal_img7.jpg";
import gal_img8 from "@/components/Images/schoolImages/Gal/gal_img8.jpg";
import gal_img9 from "@/components/Images/schoolImages/Gallery/gal_img9.jpeg";
import gal_img10 from "@/components/Images/schoolImages/Gallery/gal_img10.jpeg";
import gal_img11 from "@/components/Images/schoolImages/Gallery/gal_img11.jpeg";
import gal_img12 from "@/components/Images/schoolImages/Gallery/gal_img12.jpeg";
import gal_img13 from "@/components/Images/schoolImages/Gallery/gal_img13.jpeg";
import gal_img14 from "@/components/Images/schoolImages/Gallery/gal_img14.jpeg";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";
import Link from "next/link";

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import TestimonialsComponents from "./HomePageComponents/TestimonialsComponents";
import Image_Modal from "./ModalsAndAlerts/Image_Modal";

const HomePage = () => {
  const [Cname, setCname] = useState("");
  const [Cemail, setCemail] = useState("");
  const [Comment, setComment] = useState("");
  const [ImageModal, setImageModal] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const photos = [
    {
      src: gal_img1,
      width: 800,
      height: 600,
    },
    {
      src: gal_img2,
      width: 800,
      height: 600,
    },
    {
      src: gal_img3,
      width: 4,
      height: 3,
    },
    {
      src: gal_img4,
      width: 4,
      height: 3,
    },
    {
      src: gal_img5,
      width: 4,
      height: 3,
    },
    {
      src: gal_img6,
      width: 4,
      height: 3,
    },
    {
      src: gal_img7,
      width: 4,
      height: 3,
    },
    {
      src: gal_img8,
      width: 4,
      height: 3,
    },
  ];

  const handleMouseEnter = (mg) => {
    console.log("Entering");
    setImageModal(mg);
    setIsModalVisible(true);
  };

  const handleMouseLeave = () => {
    console.log("Exiting...");
    setIsModalVisible(false);
  };

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
              <p className={classes.MissionParagraph}>
                "Education is the most powerful weapon which you can use to
                change the world. It is the foundation upon which we build our
                future..."
              </p>
              <hr />
              <h6 className="text-end">NELSON MANDELA</h6>
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
          <Col md={12} lg={12} sm={12} className="pt-3  m-0">
            <h3 className={classes.AtAGlance}>
              <Divider>AT A GLANCE</Divider>
            </h3>
          </Col>
          <Col md={12} lg={12} sm={12}>
            <hr className={classes.hrGlance} />
          </Col>
          <Col md={12} sm={12} lg={12} className="my-2">
            <Row className="justify-content-around">
              <Col
                md={3}
                lg={3}
                sm={12}
                className={`${classes.colNumRec} d-flex  justify-content-center my-sm-2`}
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
                className={`${classes.colNumRec} d-flex  justify-content-center my-sm-2`}
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
                className={`${classes.colNumRec} d-flex  justify-content-center my-sm-2`}
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
                className={`${classes.colNumRec} d-flex  justify-content-center my-sm-2`}
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
                  <Divider>WHY WE ARE THE BEST</Divider>
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
              NewsImage={gal_img1}
              NewsMonth={"SEPTEMBER"}
              NewsDay={30}
              NewsTitle={"EAUED MHS celebrates 10 years of Existence"}
              NewsDetails={
                "It was a great joy at the grand finale of a week long celebration of ten years anniversary of EAUED MHS as the students and staff could not hold their feelings. The Principal of the school, Mr A.A. Ayoola opened the danced floor with other dignatries bith from the mother University and the School."
              }
            />
            <hr className="mx-5 my-3 p-0" />
            <NewsAndEventsComponents
              NewsImage={gal_img2}
              NewsMonth={"SEPTEMBER"}
              NewsDay={25}
              NewsTitle={
                "Adenike wins first position in Oyo State Inter SChool Debate Competition"
              }
              NewsDetails={
                "Adenile Odunayo, a SS2 student of the school represented Oyo East Local Goverment at the Oyo State Inter School debate competition helid in Ibadan and came first at teh end of the competion beating about other 40 schools in attendance. While presenting the award, the Governor of the state, Engr Seyi Makinde congratulated the young scholar and encouraged her to do the state proud at the National level"
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

        <Row className="px-5 py-4">
          <Col md={4} lg={4} sm={12}>
            <Row>
              <Col md={12} sm={12} lg={12} className="pt-3  m-0">
                <h3 className={classes.AtAGlance2}>
                  <Divider>ACADEMIC CALENDAR</Divider>
                </h3>
              </Col>
              <Col md={12} sm={12}>
                <hr className={classes.hrGlance2} />
              </Col>
              <Col>
                <Table
                  striped
                  bordered
                  responsive
                  className={classes.FeesTable}
                >
                  <thead>
                    <tr>
                      <th>DATES</th>
                      <th>EVENTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>September 15, 2024</td>
                      <td>Resumption of Boaders</td>
                    </tr>
                    <tr>
                      <td>Sept 16, 2024</td>
                      <td>Resumption of all Students</td>
                    </tr>
                    <tr>
                      <td>Oct 19, 2024 - Oct 21, 2024</td>
                      <td>First Continuous Assessment Test</td>
                    </tr>
                    <tr>
                      <td>Oct 22, 2024</td>
                      <td>Open Day</td>
                    </tr>
                    <tr>
                      <td>Oct 31, 2024 & Nov 1, 2024</td>
                      <td>Mid Term Break</td>
                    </tr>
                    <tr>
                      <td>Nov 4, 2024</td>
                      <td>Cultural Day</td>
                    </tr>
                    <tr>
                      <td>Dec 2, 2024 - Dec 13, 2024</td>
                      <td>Examination days</td>
                    </tr>
                    <tr>
                      <td>Dec 17, 2024</td>
                      <td>General PTA Meeting</td>
                    </tr>
                    <tr>
                      <td>December 19, 2024</td>
                      <td>Vacation Day</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
          <Col md={4} lg={4} sm={12}>
            <Row>
              <Col md={12} sm={12} lg={12} className="pt-3  m-0">
                <h3 className={classes.AtAGlance2}>
                  <Divider>FEES</Divider>
                </h3>
              </Col>
              <Col md={12} sm={12}>
                <hr className={classes.hrGlance2} />
              </Col>
              <Col>
                <Table
                  striped
                  bordered
                  responsive
                  className={classes.FeesTable}
                >
                  <thead>
                    <tr>
                      <th>FEES</th>
                      <th className="text-center">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>JS1 - 3 (NEW STUDENTS)SCHOOL FEE</td>
                      <td className="text-center"> ₦45,000.00 </td>
                    </tr>
                    <tr>
                      <td>JS1 -3 (RETURNING STUDENTS) SCHOOL FEE</td>
                      <td className="text-center">₦40,000</td>
                    </tr>
                    <tr>
                      <td>SS1 - 3 (NEW STUDENTS) SCHOOL FEE</td>
                      <td className="text-center">₦50,000.00 </td>
                    </tr>
                    <tr>
                      <td>SS1 -3 (RETURNING STUDENTS) SCHOOL FEE</td>
                      <td className="text-center">₦47,000</td>
                    </tr>

                    <tr>
                      <td>BOARDING FEE (OPTIONAL)</td>
                      <td className="text-center">₦60,000</td>
                    </tr>
                    <tr>
                      <td>LESSON FEE</td>
                      <td className="text-center">₦25,000</td>
                    </tr>
                    <tr>
                      <td>TRANSPORT FEE (OPTIONAL)</td>
                      <td className="text-center">₦35,000</td>
                    </tr>
                    <tr>
                      <td>LABORATORY FEE (SCIENCE STUDENTS)</td>
                      <td className="text-center">₦2,500</td>
                    </tr>
                    <tr>
                      <td>VALEDICTORY FEE (FINAL YEAR STUDENTS)</td>
                      <td className="text-center">₦5,000</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
          <Col md={4} lg={4} sm={12}>
            <Row>
              <Col md={12} sm={12} lg={12} className="pt-3  m-0">
                <h3 className={classes.AtAGlance2}>
                  <Divider>BANK DETAILS</Divider>
                </h3>
              </Col>
              <Col md={12} sm={12}>
                <hr className={classes.hrGlance2} />
              </Col>
              <Col>
                <Table
                  striped
                  bordered
                  responsive
                  className={classes.FeesTable}
                >
                  <tbody>
                    <tr>
                      <td>
                        ZENITH BANK
                        <br />
                        EAUED MODEL HIGH SCHOOL,OYO <br />
                        0050545878
                      </td>
                    </tr>
                    <tr>
                      <td>
                        FIRST BANK
                        <br />
                        EAUED MODEL HIGH SCHOOL,OYO <br />
                        2022554125
                      </td>
                    </tr>
                    <tr>
                      <td>
                        GT BANK
                        <br />
                        EAUED MODEL HIGH SCHOOL,OYO <br />
                        3563322159
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="px-5">
          <Col md={12} sm={12} className="pt-3  m-0">
            <h3 className={classes.AtAGlance}>
              <Divider>OUR PICTURES SPEAK</Divider>
            </h3>
          </Col>
          <Col md={12} sm={12}>
            <hr className={classes.hrGlance} />
          </Col>
          <Col>
            <Row className="g-2">
              {photos.map((pht, index) => (
                <Col md={3} lg={3} sm={12} key={index}>
                  <Image
                    src={pht.src}
                    className={`${classes.HomeImages} thumbnail roundedCircle`}
                    alt={pht + index}
                    onClick={() => handleMouseEnter(pht.src)}
                    // onMouseLeave={handleMouseLeave}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/*  Testimonials Section */}

        <Row className="px-5">
          <Col md={12} sm={12} className="pt-3  m-0">
            <h3 className={classes.AtAGlance}>
              <Divider>TESTIMONIALS</Divider>
            </h3>
          </Col>
          <Col md={12} sm={12}>
            <hr className={classes.hrGlance} />
          </Col>
          <Col md={12} sm={12}>
            <Row>
              <Col md={3} lg={3} sm={12} className={classes.colTestimonial}>
                <TestimonialsComponents
                  Tes="EAUED MHS gives sound academic knowldege to the students.
                    My daughter is a good testimony. I recommend this school
                    always..."
                  Pers="Mrs Adenike Raymond"
                  col={{ backgroundColor: "#f5c5cd" }}
                />
              </Col>
              <Col md={3} lg={3} sm={12} className={classes.colTestimonial}>
                <TestimonialsComponents
                  Tes="I have never regretted sending all my four children to
                    EAUED Model High School. If you want the best for your ward,
                    enroll him/her your in this school..."
                  Pers="Dr Akinade A.P"
                  col={{ backgroundColor: "#c5ebf5" }}
                />
              </Col>
              <Col md={3} lg={3} sm={12} className={classes.colTestimonial}>
                <TestimonialsComponents
                  Tes="Model High School is a place where you can get the quality value for the money spend on your children. The school gets all what it takes to excel"
                  Pers="Mr Olowolagba Kazeem"
                  col={{ backgroundColor: "#e7f5c5" }}
                />
              </Col>
              <Col md={3} lg={3} sm={12} className={classes.colTestimonial}>
                <TestimonialsComponents
                  Tes="When it comes to quality education in a very conducive environment, give it to Model High School, Oyo. They are simply the best..."
                  Pers="Mrs Owolabi Sharon"
                  col={{ backgroundColor: "#c5f5d0" }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        {/*  Contact Section */}

        <Row className="px-5">
          <Col md={12} sm={12} className="pt-3  m-0">
            <h3 className={classes.AtAGlance}>
              <Divider>CONTACT US</Divider>
            </h3>
          </Col>
          <Col md={12} sm={12}>
            <hr className={classes.hrGlance} />
          </Col>
          <Col md={12} sm={12}>
            <Row>
              <p className="text-center">
                You can drop you comments, suggestions, complaint or contact
                here and we shall get back to you.
              </p>
              <Col md="4" lg="4" sm="12" className={classes.colTheContacts}>
                <Card>
                  <CardHeader>Our Address</CardHeader>
                  <CardBody>
                    <p className="text-justify">
                      Opposite Old Oyo National Park, Along Oyo - Iseyin express
                      way, Isokun, Oyo, Oyo State
                    </p>
                    <p className="my-0 py-0">
                      Phones: +234(0)8033824233, +234(0)8052478877
                    </p>
                    <p className="my-0 py-0">
                      Email: modelhighschool@eauedmhs.com.ng
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4" lg="4" sm="12" className={classes.colTheContacts}>
                <Card>
                  <CardHeader>Send Us Message</CardHeader>
                  <CardBody>
                    <Form>
                      <Form.Group className="my-2">
                        <Form.Label
                          style={{ color: "brown", fontWeight: "bold" }}
                        >
                          NAME
                          <span className={classes.CompulsoryItem}>
                            <sup>*</sup>
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={Cname}
                          onChange={(e) => setCname(e.target.value)}
                          name="Cname"
                          required={true}
                          placeholder="Your Name"
                        />
                      </Form.Group>
                      <Form.Group className="my-2">
                        <Form.Label
                          style={{ color: "brown", fontWeight: "bold" }}
                        >
                          EMAIL
                          <span className={classes.CompulsoryItem}>
                            <sup>*</sup>
                          </span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          value={Cemail}
                          onChange={(e) => setCemail(e.target.value)}
                          name="Cemail"
                          required={true}
                          placeholder="Your E-mail address"
                        />
                      </Form.Group>
                      <Form.Group className="my-2">
                        <Form.Label
                          style={{ color: "brown", fontWeight: "bold" }}
                        >
                          MESSAGE
                          <span className={classes.CompulsoryItem}>
                            <sup>*</sup>
                          </span>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          type="Comment"
                          value={Comment}
                          onChange={(e) => setComment(e.target.value)}
                          name="Comment"
                          required={true}
                          placeholder="Your Message"
                        />
                      </Form.Group>
                      <Button
                        variant="outline-danger"
                        type="submit"
                        className="float-end d-inline-block my-2"
                      >
                        SEND
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4" lg="4" sm="12" className={classes.colTheContacts}>
                <Card>
                  <CardHeader>Our Handles</CardHeader>
                  <CardBody className="pl-3">
                    <Link
                      className={`d-inline-block my-1 ${classes.socialmediatext}`}
                      href="/#"
                    >
                      <span className={classes.socialmediaF}>
                        <FaFacebook />
                      </span>{" "}
                      @eaued model high school, oyo
                    </Link>
                    <Link
                      className={`d-inline-block my-1 ${classes.socialmediatext}`}
                      href="/#"
                    >
                      <span className={classes.socialmediaT}>
                        {" "}
                        <FaTwitter />
                      </span>{" "}
                      @eaued model high school, oyo
                    </Link>
                    <Link
                      className={`d-inline-block my-1 ${classes.socialmediatext}`}
                      href="/#"
                    >
                      <span className={classes.socialmediaI}>
                        <FaInstagram />{" "}
                      </span>
                      @eaued model high school, oyo
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      {isModalVisible && (
        <Image_Modal
          Open={isModalVisible}
          Img={ImageModal}
          Alt="Img"
          Exit={handleMouseLeave}
        />
      )}
    </Row>
  );
};

export default HomePage;
