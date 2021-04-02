import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../App.css";
import NavbarComp from "../navbar";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Container fluid className="landing-bg text-light">
      <Row>
        <NavbarComp />
      </Row>
      <Row className="py-5">
        <Container className="py-2">
          <Row>
            <Col md={{ offset: 1 }} md={8} className="py-3 mx-auto">
              <p className="display-4">Take your jotting, to the next level.</p>
              <p className="py-2">
                Join millions of users and take advantage of the best free note
                taking application in the market. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Voluptatibus deserunt quidem ut
                accusamus pariatur? Molestiae.
              </p>
              <Link to="sign-in">
                <Button variant="primary">Get started</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default Hero;
