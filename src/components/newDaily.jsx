import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function NewDailyModal({ show, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [startDate, setStartDate] = useState('');
  const [repeatType, setRepeatType] = useState('daily');
  const [repeatEvery, setRepeatEvery] = useState(1);
  const [repeatOn, setRepeatOn] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      notes,
      startDate,
      repeatType,
      repeatEvery,
      repeatOn,
      completed,
      priority,
    });

    // Reset form
    setTitle('');
    setNotes('');
    setStartDate('');
    setRepeatType('daily');
    setRepeatEvery(1);
    setRepeatOn([]);
    setCompleted(false);
    setPriority('Medium');
    onClose();
  };

  const handleDayToggle = (day) => {
    setRepeatOn((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const repeatUnitMap = {
    daily: 'Day(s)',
    weekly: 'Week(s)',

  };

  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Daily Task</Modal.Title>
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
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Repeats</Form.Label>
            <Form.Select
              value={repeatType}
              onChange={(e) => setRepeatType(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Repeat Every</Form.Label>
            <div className="input-group">
              <Form.Control
                type="number"
                min="1"
                value={repeatEvery}
                onChange={(e) => setRepeatEvery(e.target.value)}
                required
              />
              <span className="input-group-text">
                {repeatUnitMap[repeatType]}
              </span>
            </div>
          </Form.Group>

          {repeatType === 'weekly' && (
            <Form.Group className="mb-3">
              <Form.Label>Repeat on</Form.Label>
              <div className="d-flex gap-2 flex-wrap">
                {['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'].map((day) => (
                  <Button
                    key={day}
                    variant={repeatOn.includes(day) ? 'primary' : 'outline-dark'}
                    onClick={() => handleDayToggle(day)}
                    size="sm"
                  >
                    {day.toUpperCase()}
                  </Button>
                ))}
              </div>
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Select>
          </Form.Group>

          <Form.Check
            type="checkbox"
            label="Completed once done"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mb-3"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Daily Task
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
