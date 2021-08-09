import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { BsFileEarmarkText, BsPlay, BsLock, BsLockFill } from "react-icons/bs";
import { toast } from "react-toastify";

export default function LearnTabItem({ sections }) {
  return (
    <>
      {sections.length > 0 &&
        sections.map((section, i) => (
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
                        {lecture.isPreview ? (
                          <a href="javascript:void" style={{ color: "#656464" }}>
                            <BsPlay size={22} />
                          </a>
                        ) : (
                          <a
                            href="javascript:void"
                            onClick={() => toast.info("Please buy to continue learn this course !!")}
                            style={{ color: "#656464" }}
                          >
                            <BsLockFill size={22} />
                          </a>
                        )}
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
    </>
  );
}
