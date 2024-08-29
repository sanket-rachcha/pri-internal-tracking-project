import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const auth = localStorage.getItem("token");
  const developerName = localStorage.getItem("developerName");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        {auth ? (
          <>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                POC
              </Nav.Link>
              <Nav.Link as={Link} to="/add">
                Add POC
              </Nav.Link>
              <Nav.Link as={Link} to="/update">
                Update POC
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Dev Profile
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link onClick={logout} style={{ cursor: "pointer" }}>
                ({developerName ? developerName : "User"}) Logout
              </Nav.Link>
            </Nav>
          </>
        ) : (
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/signup">
              Sign Up
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
