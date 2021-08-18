import teacherApi from 'api/teacherApi';
import React, { useState } from 'react';
import { Modal, Form, Button, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function AddLectureModal({ isShow, onClose, onAdd, sectionId }) {
  const [title, setTitle] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [videoFile, setVideoFile] = useState(null);

  const resetValues = () => {
    setTitle('');
    setIsPreview(false);
    setVideoFile(null);
  };

  const handleSave = async () => {
    if (!title) {
      return;
    }
    let video = '';
    if (videoFile) {
      toast.info('Loading ...');
      const { success, files } = await teacherApi.upLoad(videoFile);

      if (success && files.length > 0) {
        video = files[0].filename;
        toast.dismiss();
      }
    }
    onAdd({ title, video, isPreview, sectionId });
    onClose();
    resetValues();
  };

  return (
    <Modal centered show={isShow} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Lecture detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group as={Col} md="12" className="position-relative">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Check
            className="mt20"
            type="checkbox"
            id={`default-checkbox`}
            value={isPreview}
            label={`Please check this if video is FREE TO VIEW`}
            onChange={(e) => setIsPreview(e.target.checked)}
          />
        </Form.Group>

        <Form.Group
          as={Col}
          md="12"
          controlId="validationFormikUsername2"
          style={{ marginTop: '20px' }}
        >
          <Form.Label style={{ marginRight: '10px' }}>Videos:</Form.Label>
          <input
            type="file"
            name="avatar"
            onChange={(event) => {
              setVideoFile(event.target.files[0]);
            }}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleSave();
          }}
        >
          Save Lecture
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
