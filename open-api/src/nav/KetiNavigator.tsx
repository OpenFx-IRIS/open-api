import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

class KetiNavigator extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">KETI</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/open-api/about">about</Nav.Link>
                <Nav.Link href="/open-api/guide">guide</Nav.Link>
                <Nav.Link href="/open-api/open-api">OpenAPI</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default KetiNavigator;
