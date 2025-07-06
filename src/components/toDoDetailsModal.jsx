import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ToDoDetailsModal({ show, onClose, todo, onDelete }) {
  if (!todo) return null;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {todo.title && <h5>{todo.title}</h5>}

        {todo.notes && (
          <p>{todo.notes}</p>
        )}

        {todo.dueDate && (
          <p>{new Date(todo.dueDate).toLocaleDateString()} {todo.dueTime}</p>
        )}

        {todo.priority && (
          <p>
            <span className={`badge ${
              todo.priority === "High"
                ? "bg-danger"
                : todo.priority === "Medium"
                ? "bg-warning text-dark"
                : "bg-secondary"
            }`}>
              {todo.priority}
            </span>
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => onDelete(todo, false)}>Delete Task</Button>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
