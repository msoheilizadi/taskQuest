import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function NewHabitModal({ show, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [habitType, setHabitType] = useState('');  // Start with no habit type selected

const handleSubmit = (e) => {
  e.preventDefault();

  let minusDisabled = false;
  let plusDisabled = false;

  if (habitType === 'positive') {
    minusDisabled = true;
    plusDisabled = false;
  } else if (habitType === 'negative') {
    minusDisabled = false;
    plusDisabled = true;
  }

  onSubmit({ 
    name: title,  // you are using title as name
    notes, 
    habitType, 
    minusDisabled, 
    plusDisabled 
  });

  setTitle('');
  setNotes('');
  setHabitType('');
  onClose();
};


  const handleToggleHabitType = (type) => {
    if (habitType === type) {
      setHabitType('');  // Deselect if it's already selected
    } else {
      setHabitType(type);  // Select the new habit type
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Habit</Modal.Title>
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
            <Form.Label>Habit Type</Form.Label>
            <div className="d-flex gap-2">
              <Button
                variant={habitType === 'positive' ? 'success' : 'outline-success'}
                onClick={() => handleToggleHabitType('positive')}
                active={habitType === 'positive'}
              >
                Positive Habit
              </Button>
              <Button
                variant={habitType === 'negative' ? 'danger' : 'outline-danger'}
                onClick={() => handleToggleHabitType('negative')}
                active={habitType === 'negative'}
              >
                Negative Habit
              </Button>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit">Add Habit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
