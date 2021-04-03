import React from "react";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import "../hover.css";
import "../App.css";

const NavbarComp = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Navbar fixed="top" className="navbar-sec py-4 px-3">
            <Navbar.Brand href="#home" className="text-dark mr-auto font-weight-bold">
              Jott3d
            </Navbar.Brand>
            <Nav>
              <Nav.Link
                href="#home"
                className="text-dark mx-2 hvr-underline-from-right"
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#features"
                className="text-dark mx-2 hvr-underline-from-right"
              >
                App
              </Nav.Link>
              <Nav.Link
                href="#pricing"
                className="text-dark mx-2 hvr-underline-from-right"
              >
                developer
              </Nav.Link>
            </Nav>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};

export default NavbarComp;
