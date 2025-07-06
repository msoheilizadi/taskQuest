import React, { useState } from 'react';
import ToDoDetailsModal from './toDoDetailsModal';

function DailyTasks({ toDailyList = [], date = "April 15, 2025", onDelete }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  return (
    <div className="card daily">
      <div className="d-flex justify-content-between align-items-center mb-2 px-1">
        <h5 className="get-center">Daily Tasks</h5>
        <small className="text-muted">{date}</small>
      </div>

      <div
        className="scrollable-task-list custom-scrollbar"
        style={{ maxHeight: '320px', overflowY: toDailyList.length > 4 ? 'auto' : 'unset' }}
      >
        {toDailyList.map((element, index) => (
          <div
            key={index}
            className="project progress-div d-flex align-items-center justify-content-start"
            style={{ cursor: 'pointer' }}
            onClick={() => handleOpenModal(element)}
          >
            <input
              type="checkbox"
              id={`task-${index}`}
              className="form-check-input me-2"
              onClick={(e) => {e.stopPropagation(); onDelete(element, true);}}
            />
            <label
              htmlFor={`task-${index}`}
              className="form-check-label me-2 mb-0"
            >
              {element.title}
            </label>
            <span className={`badge ${
              element.priority === "High"
                ? "bg-danger"
                : element.priority === "Medium"
                ? "bg-warning text-dark"
                : "bg-secondary"
            }`}>
              {element.priority}
            </span>
          </div>
        ))}
      </div>

      <div className="text-muted mt-3" style={{ fontSize: '14px' }}>
        {toDailyList.length} tasks remaining
      </div>

      <ToDoDetailsModal
        show={showModal}
        onClose={handleCloseModal}
        todo={selectedTask}
        onDelete={(task) => {
          onDelete(task, false);
          handleCloseModal();
        }}
      />
    </div>
  );
}

export default DailyTasks;
