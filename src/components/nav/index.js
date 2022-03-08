import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMartiniGlassCitrus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./styles.css";



const Nav = () => {
  return (
    <>
      <Navbar className="nav-color" collapseOnSelect expand="lg">
        <Link to="/">
          <Navbar.Brand className="nav-brand">
            <FontAwesomeIcon
              icon={faMartiniGlassCitrus}
              size="2xl"
              inverse
            ></FontAwesomeIcon>
          </Navbar.Brand>
        </Link>
      </Navbar>
    </>
  );
};

export default Nav;
