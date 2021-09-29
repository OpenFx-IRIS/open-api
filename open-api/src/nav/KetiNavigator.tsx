import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

class KetiNavigator extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/open-api">KETI OpenAPI</Navbar.Brand>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default KetiNavigator;
