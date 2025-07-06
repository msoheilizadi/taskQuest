import React, { useState } from 'react';
import HabitDetailsModal from './habitModal';

function HabitsCard({ habits, onDelete }) {
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (habit) => {
    setSelectedHabit(habit);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedHabit(null);
    setShowModal(false);
  };

  return (
    <div className="card mb-4" id="habitsntodo">
      <h3>Habits</h3>

      <div
        className="habits-wrapper custom-scroll"
        style={{ maxHeight: habits.length > 4 ? '270px' : 'auto', overflowY: habits.length > 4 ? 'auto' : 'visible' }}
      >
        {habits.map((habit, index) => (
          <div
            key={index}
            className="habit-box d-flex align-items-center justify-content-between"
            style={{ cursor: 'pointer' }}
            onClick={() => handleOpenModal(habit)}
          >
            <span>{habit.name}</span>
            <div>
              <button
                className="btn btn-sm btn-outline-danger me-1"
                style={{ width: '27px', height: '32px', textAlign: 'center', padding: 0 }}
                disabled={habit.minusDisabled}
              >
                -
              </button>
              <button
                className="btn btn-sm btn-outline-success"
                style={{ width: '27px', height: '32px', textAlign: 'center', padding: 0 }}
                disabled={habit.plusDisabled}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <HabitDetailsModal show={showModal} onClose={handleCloseModal} onDelete={(todo) => {
          onDelete(todo);
          handleCloseModal();
        }} habit={selectedHabit} />
    </div>
  );
}

export default HabitsCard;
