import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "../../App.css";
import NavbarComp from "../navbar";
import { Link } from "react-router-dom";
import heroSvg from "../../assets/undraw_Personal_notebook_re_d7dc.svg";

//import dependency
import Typed from "typed.js";

const Hero = () => {
  React.useEffect(() => {
    // Options for the Typed object
    const options = {
      strings: ["jotting", "notes", "lists", "to-dos"],
      typeSpeed: 250,
    };

    // New Typed instance
    const typed = new Typed("#instructions", options);

    // Destroy Typed instance on unmounting the component to prevent memory leaks
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <Container fluid className="text-dark">
      <Row>
        <NavbarComp />
      </Row>
      <Row className="py-5">
        <Container className="py-5">
          <Row>
            <Col md={6} className="py-3 py-5">
              <p className="display-4 py-4">
                Take your{" "}
                <span className="text-primary" id="instructions"></span>, to the
                next level.
              </p>
              <p className="py-2">
                Join millions of users and take advantage of the best free note
                taking application in the market. Lorem ipsum dolor sit amet
                consectetur adipisicing elit.
              </p>
              <Link to="sign-in">
                <Button variant="primary">Get started</Button>
              </Link>
            </Col>
            <Col md={6}>
              <Image src={heroSvg} fluid className="mt-5 px-2 py-2" />
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default Hero;
