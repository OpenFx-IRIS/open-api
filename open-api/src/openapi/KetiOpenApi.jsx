import React, { useContext } from "react";
import { Accordion, Card, Button, Container } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import AccordionContext from "react-bootstrap/AccordionContext";

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
              <Card.Body>call to /function/py-package</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header style={{ backgroundColor: "#D9F0E6" }}>
              <ContextAwareToggle eventKey="1">POST</ContextAwareToggle>
              {"   /function/py-package20"}
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>call to /function/py-package20</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    );
  }
}

// class ContextAwareToggle extends React.Component<{ eventKey: string }> {
//   constructor(props: { eventKey: string }) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     const decoratedOnClick = useAccordionButton(this.props.eventKey, () =>
//       console.log("totally custom!", this.props.eventKey)
//     );
//     return (
//       <>
//         <Alert variant="success">
//           <Button variant="success" type="button" onClick={decoratedOnClick}>
//             POST
//           </Button>
//           {"   /function/py-package"}
//         </Alert>
//       </>
//     );
//   }
// }
//
// class KetiOpenApi extends React.Component {
//   render() {
//     return (
//       <>
//         <Container>
//           <Accordion defaultActiveKey="0">
//             <Card>
//               <Card.Header>
//                 <ContextAwareToggle eventKey="0">Click me!</ContextAwareToggle>
//               </Card.Header>
//               <Accordion.Collapse eventKey="0">
//                 <Card.Body>Hello! I&apos;m the body</Card.Body>
//               </Accordion.Collapse>
//             </Card>
//             <Card>
//               <Card.Header>
//                 <ContextAwareToggle eventKey="1">Click me!</ContextAwareToggle>
//               </Card.Header>
//               <Accordion.Collapse eventKey="1">
//                 <Card.Body>Hello! I&apos;m another body</Card.Body>
//               </Accordion.Collapse>
//             </Card>
//           </Accordion>
//         </Container>
//       </>
//     );
//   }
// }

export default KetiOpenApi;
