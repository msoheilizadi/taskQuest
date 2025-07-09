import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar } from 'react-bootstrap';

export default function DailyPlanningPage({
  dayNumber = 1,
  startDate,
  categoryGoals = [],
  previousProgress = {}, // { Java: 10, CS50: 5 }
  avgHoursPerDay = 5,
  onSubmit
}) {
  const today = new Date(startDate);
  today.setDate(today.getDate() + (dayNumber - 1));
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const [todayAllocations, setTodayAllocations] = useState(
    categoryGoals.map(cat => ({ name: cat.name, hours: 0 }))
  );

  const totalToday = todayAllocations.reduce((sum, cat) => sum + Number(cat.hours), 0);

  const handleChange = (index, value) => {
    const updated = [...todayAllocations];
    updated[index].hours = Number(value);
    setTodayAllocations(updated);
  };

  const handleSubmit = () => {
    if (totalToday === 0) {
      alert("Please allocate at least some hours for today.");
      return;
    }
    onSubmit(todayAllocations);
  };

  return (
    <Container className="min-vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="p-4 shadow-sm">
            <h3 className="mb-3 text-center">Day {dayNumber} Plan</h3>
            <p className="text-muted text-center">📅 {formattedDate}</p>

            {categoryGoals.map((cat, i) => {
              const completed = previousProgress[cat.name] || 0;
              const remaining = cat.hours - completed;
              return (
                <Form.Group key={i} className="mb-3">
                  <Form.Label>
                    {cat.name} <span className="text-muted">(Remaining: {remaining}h)</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="0.5"
                    value={todayAllocations[i].hours}
                    onChange={e => handleChange(i, e.target.value)}
                    placeholder="Hours for today"
                  />
                </Form.Group>
              );
            })}

            <div className="mt-3">
                <ProgressBar
                className="custom-progressbar"
                now={(totalToday / avgHoursPerDay) * 100}
                variant={totalToday > avgHoursPerDay ? "warning" : "success"}
                label={`${totalToday} / ${avgHoursPerDay}h`}
                />
            </div>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="success" onClick={handleSubmit}>
                Save Day {dayNumber} Plan →
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
