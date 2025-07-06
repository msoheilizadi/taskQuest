import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ToDoDetailsModal({ show, onClose, todo, onDelete }) {
  if (!todo) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{todo.title || "Task Details"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {todo.notes && (
          <p><strong>Notes:</strong> {todo.notes}</p>
        )}
        {todo.startDate && (
          <p><strong>Start Date:</strong> {new Date(todo.startDate).toLocaleDateString()}</p>
        )}
        {todo.repeats && (
          <p><strong>Repeats:</strong> {todo.repeats}</p>
        )}
        {todo.priority && (
          <p><strong>Priority:</strong> 
            <span className={`badge ms-2 ${
              todo.priority === "High" ? "bg-danger" :
              todo.priority === "Medium" ? "bg-warning text-dark" :
              "bg-secondary"
            }`}>
              {todo.priority}
            </span>
          </p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={() => onDelete(todo)}>Delete Task</Button>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ToDoDetailsModal;
