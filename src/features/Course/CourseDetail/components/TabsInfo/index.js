import React from "react";
import { Button, Card, Tab, Tabs } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { BsFileEarmarkText, BsPlay } from "react-icons/bs";
import ReviewTabItem from "./components/ReviewTabItem";
import TeacherTabItem from "./components/TeacherTabItem";

export default function TabsInfo({ course }) {
  return (
    <Tabs id="uncontrolled-tab-example" className="mb-3" style={{ marginTop: "30px" }}>
      <Tab eventKey="Overview" title="Overview">
        <h5 className="mt-4">Course Description</h5>
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
        <TeacherTabItem teacher={course.lecturer} />
      </Tab>
      <Tab eventKey="Reviews" title="Reviews">
        <ReviewTabItem course={course} />
      </Tab>
    </Tabs>
  );
}
{
}
