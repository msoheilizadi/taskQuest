import React, { useState } from 'react';
import ToDoDetailsModal from './toDoDetailsModal';

function ToDoCard({ todos, onDelete }) {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setShowModal(false);
  };

  return (
    <div className="card mb-4">
      <h3>To-Do</h3>

      <div className="todo-wrapper custom-scroll"
            style={{ maxHeight: '320px', overflowY: 'auto' }}

      >
        {todos.map((todo, index) => (
          <div
            key={index}
            className="todo-box d-flex align-items-center justify-content-between"
            onClick={() => handleOpenModal(todo)}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center">
                <span>{todo.title}</span>
                <span className={`badge ms-2 ${
                  todo.priority === "High"
                    ? "bg-danger"
                    : todo.priority === "Medium"
                    ? "bg-warning text-dark"
                    : "bg-secondary"
                }`}>
                  {todo.priority}
                </span>
              </div>
              <small className="text-muted">
                Due: {new Date(todo.dueDate).toLocaleDateString()}
              </small>
            </div>
            <button
              className="btn btn-todo btn-sm btn-outline-success"
              onClick={(e) => {
                e.stopPropagation(); // prevent modal from opening
                onDelete(todo, true);      // call onDelete for this todo
              }}
            >
              ✓
            </button>
          </div>
        ))}
      </div>

      <ToDoDetailsModal
        show={showModal}
        onClose={handleCloseModal}
        todo={selectedTodo}
        onDelete={(todo) => {
          onDelete(todo, false);
          handleCloseModal();
        }}
      />
    </div>
  );
}

export default ToDoCard;
