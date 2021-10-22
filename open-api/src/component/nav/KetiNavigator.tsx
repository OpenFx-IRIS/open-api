import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

class KetiNavigator extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/open-api">KETI OpenAPI</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/open-api/guide">guide</Nav.Link>
                <Nav.Link href="/open-api/api">api</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default KetiNavigator;
