import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function DayPlannerPage({ data, onBack, onSubmit }) {
  const categories = data.categories || [];
  const avgHoursPerDay = Number(data.avgHoursPerDay) || 0;

  // Initialize allocation state: [{ name, hours }]
  const [allocations, setAllocations] = useState(
    categories.map(cat => ({ name: cat.name, hours: '' }))
  );

  // Calculate total allocated hours for the day
  const totalAllocated = allocations.reduce((sum, a) => sum + Number(a.hours || 0), 0);

  const handleChange = (index, value) => {
    const updated = [...allocations];
    updated[index].hours = value;
    setAllocations(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation: all category hours filled and total ≤ avgHoursPerDay (optional)
    if (allocations.some(cat => cat.hours === '' || cat.hours < 0)) {
      alert('Please enter non-negative hours for all categories.');
      return;
    }

    if (totalAllocated > avgHoursPerDay) {
      if (!window.confirm(`Total allocated hours (${totalAllocated}) exceed average hours per day (${avgHoursPerDay}). Continue?`)) {
        return;
      }
    }

    onSubmit(allocations);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3 className="mb-4">Day 1: Allocate Your Time</h3>

      {allocations.map((cat, i) => (
        <Row key={cat.name} className="mb-2 align-items-center">
          <Col xs={6}>
            <Form.Label>{cat.name}</Form.Label>
          </Col>
          <Col xs={6}>
            <Form.Control
              type="number"
              min="0"
              step="0.5"
              value={cat.hours}
              onChange={e => handleChange(i, e.target.value)}
              placeholder="Hours"
              required
            />
          </Col>
        </Row>
      ))}

      <div className="mt-3">
        Total Allocated: <strong>{totalAllocated}</strong> / {avgHoursPerDay} hours
      </div>

      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={onBack}>
          ← Back
        </Button>
        <Button variant="primary" type="submit">
          Finish Challenge Setup
        </Button>
      </div>
    </Form>
  );
}
