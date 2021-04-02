import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../hover.css";
import "../App.css";

const NavbarComp = () => {
  return (
    <Navbar fixed="top" className="navbar-sec">
      <Navbar.Brand href="#home" className="text-light mr-auto">
        Jott3d
      </Navbar.Brand>
      <Nav>
        <Nav.Link
          href="#home"
          className="text-light mx-2 hvr-underline-from-right"
        >
          Home
        </Nav.Link>
        <Nav.Link
          href="#features"
          className="text-light mx-2 hvr-underline-from-right"
        >
          App
        </Nav.Link>
        <Nav.Link
          href="#pricing"
          className="text-light mx-2 hvr-underline-from-right"
        >
          developer
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavbarComp;
