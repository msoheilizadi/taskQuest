import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function HabitDetailsModal({ show, onClose, habit, onDelete }) {
  if (!habit) return null;

  const formatText = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{habit.name || 'Habit Details'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {habit.notes && (
          <p><strong>Notes:</strong> {habit.notes}</p>
        )}
        {habit.habitType && (
          <p><strong>Type:</strong> {formatText(habit.habitType)}</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={() => onDelete(habit)}>
          Delete
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default HabitDetailsModal;
