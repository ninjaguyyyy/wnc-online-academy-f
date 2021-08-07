import React from "react";
import { Button, Card, Tab, Tabs } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { BsFileEarmarkText, BsPlay } from "react-icons/bs";

export default function TabsInfo({ course }) {
  return (
    <Tabs id="uncontrolled-tab-example" className="mb-3" style={{ marginTop: "30px" }}>
      <Tab eventKey="Overview" title="Overview">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Tab>
      <Tab eventKey="Curriculum" title="Curriculum">
        {course.sections.length > 0 &&
          course.sections.map((section, i) => (
            <Accordion className="mb-3">
              <Accordion.Item eventKey={i}>
                <Accordion.Header>{section.name}</Accordion.Header>
                <Accordion.Body style={{ padding: 0 }}>
                  {section.lectures.length ? (
                    section.lectures.map((lecture) => (
                      <div className="lecture">
                        <div className="d-flex justify-between">
                          <BsFileEarmarkText size={20} color={"#77838F"} />
                          <span className="text-capitalize ml-2">
                            <a href="javascript:void" style={{ color: "#77838F" }}>
                              {lecture.title}
                            </a>
                          </span>
                        </div>
                        <div>
                          <a href="javascript:void" style={{ color: "#656464" }}>
                            <BsPlay size={22} />
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="lecture" style={{ borderBottom: "none" }}>
                      Lectures are being updated and coming soon!
                    </div>
                  )}
                  {/* {section.lectures.map((lecture, j) => (
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
                                      url="https://wnc-online-academy-21.herokuapp.com/resources/video/wnc21-wfcD6WlQ9e.mp4"
                                      style={{ width: "600px" }}
                                      controls={true}
                                    />
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            </Accordion>
                          ))} */}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
      </Tab>
      <Tab eventKey="Instructor" title="Instructor">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Tab>
      <Tab eventKey="Reviews" title="Reviews">
        <div>RECENT REVIEWS:Very Positive (9,289)</div>
      </Tab>
    </Tabs>
  );
}
{
}
