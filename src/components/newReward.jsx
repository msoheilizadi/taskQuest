import { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

export default function NewRewardModal({ show, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [cost, setCost] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: title, notes, cost: parseInt(cost) || 0 });
    setTitle('');
    setNotes('');
    setCost('');
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Reward</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cost</Form.Label>
            <InputGroup>
              <InputGroup.Text>💰</InputGroup.Text>
              <Form.Control
                type="number"
                min="0"
                required
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit">Add Reward</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
