import React, { useState } from 'react';
import { Modal, Form, Button, Col } from 'react-bootstrap';

export default function AddSectionModal({ isShow, onClose, onAdd }) {
  const [sectionNameValue, setSectionNameValue] = useState('');

  const handleSave = () => {
    if (!sectionNameValue) {
      return;
    }
    onAdd(sectionNameValue);
    onClose();
    setSectionNameValue('');
  };

  return (
    <Modal centered show={isShow} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Section name:</Modal.Title>
      </Modal.Header>
      <Form.Group as={Col} md="12" className="position-relative mt-2 d-flex justify-content-center">
        <Form.Control
          type="text"
          name="section"
          value={sectionNameValue}
          onChange={(e) => setSectionNameValue(e.target.value)}
        />
      </Form.Group>

      <Modal.Footer style={{ borderTop: 'none' }}>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Chapter
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
