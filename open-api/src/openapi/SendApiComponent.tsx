import React, { useContext } from "react";
import { Button, Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";

class SendApiComponent extends React.Component {
  render() {
    return (
      <>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              API
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                readOnly
                defaultValue="/function/py-package"
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Datas
            </Form.Label>
            <Col sm="10">
              <FloatingLabel
                controlId="floatingTextarea2"
                label="input data here >> "
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                  defaultValue="hi!"
                />
              </FloatingLabel>
            </Col>
          </Form.Group>
          <Form.Group>
            <Button
              style={{ backgroundColor: "#5AA583", borderColor: "#5AA583" }}
            >
              SEND
            </Button>
          </Form.Group>
        </Form>
        <hr />
        <Card body>{"Hello OpenFX!"}</Card>
      </>
    );
  }
}

export default SendApiComponent;
