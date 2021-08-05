import React from "react";
import { Button, Tabs, Tab, Container, Card, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

export default function TabsInfo({ course }) {
  return (
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="home" title="Home">
        <p>home</p>
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <p>profile</p>
      </Tab>
      <Tab eventKey="contact" title="Contact">
        <p>contact</p>
      </Tab>
    </Tabs>
  );
}

// <Tabs className="mb-3" style={{ marginTop: "30px" }}>
//       <Tab eventKey="home" title="Home">
//         <Card style={{ width: "18rem" }}>
//           {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
//           <Card.Body>
//             <Card.Title>Card Title</Card.Title>
//             <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
//             <Button variant="primary">Go somewhere</Button>
//           </Card.Body>
//         </Card>
//       </Tab>
//       <Tab eventKey="Videos" title="Videos">
//         <Accordion>
//           <Card>
//             <Card.Header>
//               <Accordion.Toggle as={Button} eventKey="menu">
//                 Click me
//               </Accordion.Toggle>
//             </Card.Header>
//             <Accordion.Collapse eventKey="menu">
//               <Card.Body>
//                 <Accordion>
//                   <Card>
//                     <Card.Header>
//                       <Accordion.Toggle as={Button} eventKey="1">
//                         Ep1
//                       </Accordion.Toggle>
//                     </Card.Header>
//                     <Accordion.Collapse eventKey="1">
//                       <Card.Body>
//                         <h2>Title</h2>
//                         <h2>Clip</h2>
//                         {/* <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" style={{ width: "600px" }} controls={true} /> */}
//                       </Card.Body>
//                     </Accordion.Collapse>
//                   </Card>
//                 </Accordion>
//                 <Accordion>
//                   <Card>
//                     <Card.Header>
//                       <Accordion.Toggle as={Button} eventKey="ep2">
//                         Ep2
//                       </Accordion.Toggle>
//                     </Card.Header>
//                     <Accordion.Collapse eventKey="ep2">
//                       <Card.Body>
//                         <h2>Title</h2>
//                         <h2>Clip</h2>
//                         {/* <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" style={{ width: "600px" }} controls={true} /> */}
//                       </Card.Body>
//                     </Accordion.Collapse>
//                   </Card>
//                 </Accordion>
//                 <Accordion>
//                   <Card>
//                     <Card.Header>
//                       <Accordion.Toggle as={Button} eventKey="ep3">
//                         Ep3
//                       </Accordion.Toggle>
//                     </Card.Header>
//                     <Accordion.Collapse eventKey="ep3">
//                       <Card.Body>
//                         <h2>Title</h2>
//                         <h2>Clip</h2>
//                         {/* <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" style={{ width: "600px" }} controls={true} /> */}
//                       </Card.Body>
//                     </Accordion.Collapse>
//                   </Card>
//                 </Accordion>
//               </Card.Body>
//             </Accordion.Collapse>
//           </Card>
//         </Accordion>
//       </Tab>
//       <Tab eventKey="Comments" title="Comments">
//         <div>RECENT REVIEWS:Very Positive (9,289)</div>
//       </Tab>
//     </Tabs>
