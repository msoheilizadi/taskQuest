import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function DayPlannerPage({ data, onBack, onSubmit }) {
  const categories = data.categories || [];
  const avgHoursPerDay = Number(data.avgHoursPerDay) || 0;
  const q1Days = 10;
  const q1TotalEstimate = avgHoursPerDay * q1Days;


  const [allocations, setAllocations] = useState(
    categories.map(cat => ({ name: cat.name, hours: '' }))
  );

  const totalAllocated = allocations.reduce((sum, a) => sum + Number(a.hours || 0), 0);

  const handleChange = (index, value) => {
    const updated = [...allocations];
    updated[index].hours = value;
    setAllocations(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allocations.some(cat => cat.hours === '' || cat.hours < 0)) {
      alert('Please enter non-negative hours for all categories.');
      return;
    }
    if (totalAllocated > avgHoursPerDay) {
      if (!window.confirm(`You've allocated ${totalAllocated}h, which exceeds your average of ${avgHoursPerDay}h/day. Continue?`)) {
        return;
      }
    }
    onSubmit(allocations);
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-body-tertiary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="p-4 border rounded bg-light shadow-sm">
              <Form onSubmit={handleSubmit}>
                <h3 className="mb-2 text-center">Q1: Days 1–10</h3>
                <p className="text-muted mb-4 text-center">
                  Allocate your estimated <strong>{avgHoursPerDay * 10} total hours</strong> for <strong>Q1 (Days 1–10)</strong> across the following categories.
                </p>


                {allocations.map((cat, i) => (
                  <Row key={cat.name} className="mb-3 align-items-center">
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
                  Total Allocated: <strong>{totalAllocated}</strong> / {q1TotalEstimate} hours
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
