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
{
  /* <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
            style={{ marginTop:'30px'}}
          >
            <Tab eventKey="home" title="Home">
            <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="Videos" title="Videos">
              <Accordion>
                <Card>
                  <Card.Body>
                  {Course.sections.length > 0&&
                  Course.sections.map((item,i)=>(
                    <Accordion key={i}>
                    <Card>
                      <Card.Body>
                        <Accordion.Toggle as={Button} eventKey={item._id}>
                          {item.name}
                        </Accordion.Toggle>
                      </Card.Body>
                      <Accordion.Collapse eventKey={item._id}>
                        <Card>
                          <Card.Body>
                            {Course.sections[i].lectures.length>0&&
                            Course.sections[i].lectures.map((lecture,j)=>(
                              <Accordion key={lecture._id}>
                                <Card>
                                  <Card.Body>
                                    <Accordion.Toggle as={Button} eventKey={lecture._id}>
                                      {lecture.title}
                                    </Accordion.Toggle>
                                  </Card.Body>
                                  <Accordion.Collapse eventKey={lecture._id}>
                                    <Card.Body>
                                      <h2>{lecture.title}</h2>
                                      <h2>Clip</h2>
                                      <ReactPlayer
                                        url='https://wnc-online-academy-21.herokuapp.com/resources/video/wnc21-wfcD6WlQ9e.mp4'
                                        style={{ width: "600px" }}
                                        controls={true}
                                      />
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>
                              </Accordion>
                            ))}
                          </Card.Body>
                        </Card>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                  ))}
                  </Card.Body>
                </Card>
              </Accordion>
            </Tab>
            <Tab eventKey="Comments" title="Comments">
              <div>RECENT REVIEWS:Very Positive (9,289)</div>
            </Tab>
          </Tabs> */
}
