import React, { useContext } from "react";
import { Accordion, Card, Button, Container } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import AccordionContext from "react-bootstrap/AccordionContext";
import SendApiComponent from "./SendApiComponent";

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );
  const isCurrentEventKey = activeEventKey === eventKey;
  return (
    <Button
      type="button"
      style={{
        backgroundColor: isCurrentEventKey ? "#5AA583" : "#B7E6D1",
        borderColor: isCurrentEventKey ? "#5AA583" : "#B7E6D1",
      }}
      onClick={decoratedOnClick}
    >
      {children}
    </Button>
  );
}

class KetiOpenApi extends React.Component {
  render() {
    return (
      <Container>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header style={{ backgroundColor: "#D9F0E6" }}>
              <ContextAwareToggle eventKey="0">POST</ContextAwareToggle>
              {"   /function/py-package"}
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <SendApiComponent></SendApiComponent>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header style={{ backgroundColor: "#D9F0E6" }}>
              <ContextAwareToggle eventKey="1">POST</ContextAwareToggle>
              {"   /function/py-iris"}
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>call to /function/py-iris</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header style={{ backgroundColor: "#D9F0E6" }}>
              <ContextAwareToggle eventKey="1">POST</ContextAwareToggle>
              {"   /function/smote-api"}
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>call to /function/smote-api</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    );
  }
}

export default KetiOpenApi;
