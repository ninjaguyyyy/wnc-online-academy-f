import React, { useState, useRef } from 'react';
import { Accordion, Modal, Button } from 'react-bootstrap';
import { BsFileEarmarkText, BsPlay, BsLock, BsLockFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import '../../../../../../../../node_modules/video-react/dist/video-react.css';
import { Player } from 'video-react';
import { useSelector } from 'react-redux';
import { ApiUrl } from 'api/authUser';

export default function LearnTabItem({ courseId, sections }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState({});

  const playerElement = useRef(null);
  const attendedCourses = useSelector((state) => state.user.userInfo?.attendedCourses);

  const isAttended = attendedCourses && attendedCourses.includes(courseId);

  const handlePlayVideo = (lecture) => {
    setSelectedLecture({ ...lecture });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    const { player } = playerElement.current.getState();
    const lastWatchTime = player.currentTime;
    const duration = player.duration;

    if (duration - lastWatchTime < 5) {
      localStorage.removeItem(selectedLecture._id);
      return;
    }
    localStorage.setItem(selectedLecture._id, lastWatchTime);
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
                        <BsFileEarmarkText size={20} color={'#77838F'} />
                        <span className="text-capitalize ml-2">
                          <a href="javascript:void" style={{ color: '#77838F' }}>
                            {lecture.title}
                          </a>
                        </span>
                      </div>
                      <div>
                        {lecture.isPreview || isAttended ? (
                          <a href="javascript:void" onClick={() => handlePlayVideo(lecture)} style={{ color: '#656464' }}>
                            <BsPlay size={22} />
                          </a>
                        ) : (
                          <a
                            href="javascript:void"
                            onClick={() => toast.info('Please buy to continue learn this course !!')}
                            style={{ color: '#656464' }}
                          >
                            <BsLockFill size={22} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="lecture" style={{ borderBottom: 'none' }}>
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
          <Player ref={playerElement} startTime={localStorage.getItem(selectedLecture._id) || 0}>
            <source src={`${ApiUrl}resources/video/wnc21-NDZm7pXF4I.mp4`} type="video/mp4" />
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
