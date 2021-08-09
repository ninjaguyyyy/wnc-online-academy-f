import React, { useState, useRef } from "react";
import { Accordion, Modal, Button } from "react-bootstrap";
import { BsFileEarmarkText, BsPlay, BsLock, BsLockFill } from "react-icons/bs";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import "../../../../../../../../node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";
import { ApiUrl } from "api/authUser";

export default function LearnTabItem({ sections }) {
  const [showModal, setShowModal] = useState(false);
  const playerElement = useRef(null);

  const handlePlayVideo = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    const { player } = playerElement.current.getState();
    const lastWatchTime = player.currentTime;
    console.log(lastWatchTime);
  };

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
                          <a href="javascript:void" onClick={handlePlayVideo} style={{ color: "#656464" }}>
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      {/* dialogClassName="modal-90w" */}
      <Modal show={showModal} onHide={() => handleCloseModal()} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" /> */}
          <Player ref={playerElement} startTime={20}>
            <source src={`${"http://localhost:3001/"}resources/video/wnc21-NDZm7pXF4I.mp4`} type="video/mp4" />
          </Player>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
