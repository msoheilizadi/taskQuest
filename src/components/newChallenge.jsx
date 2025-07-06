import { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

export default function NewChallengeModal({ show, onClose, onSubmit }) {
  const [numDays, setNumDays] = useState('');
  const [totalHours, setTotalHours] = useState('');
  const [avgHoursPerDay, setAvgHoursPerDay] = useState('');
  const [fullTimeJob, setFullTimeJob] = useState(false);
  const [weekdays, setWeekdays] = useState(['mo', 'tu', 'we', 'th', 'fr']);
  const [weekends, setWeekends] = useState(['sa', 'su']);
  const [activeDays, setActiveDays] = useState(['mo', 'tu', 'we', 'th', 'fr']); // for unemployed user
  const [startDate, setStartDate] = useState('');

  const allDays = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];
  const todayStr = new Date().toISOString().split('T')[0];

  // Toggle day in a single list (for unemployed)
  const toggleSingleDay = (day, days, setDays) => {
    if (days.includes(day)) {
      setDays(days.filter(d => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

  // Toggle day in employed mode (weekdays/weekends), with mutual exclusion
  const toggleDayEmployed = (day, setDays, days, otherDays, setOtherDays) => {
    if (days.includes(day)) {
      setDays(days.filter(d => d !== day));
    } else {
      setDays([...days, day]);
      if (otherDays.includes(day)) {
        setOtherDays(otherDays.filter(d => d !== day));
      }
    }
  };

  // Calculate off days depending on fullTimeJob flag
  const offDays = fullTimeJob
    ? allDays.filter(d => !weekdays.includes(d) && !weekends.includes(d))
    : allDays.filter(d => !activeDays.includes(d));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      numDays: Number(numDays),
      totalHours: Number(totalHours),
      avgHoursPerDay: Number(avgHoursPerDay),
      fullTimeJob,
      weekdays: fullTimeJob ? weekdays : [],
      weekends: fullTimeJob ? weekends : [],
      activeDays: fullTimeJob ? [] : activeDays,
      offDays,
      startDate,
    });

    // Reset
    setNumDays('');
    setTotalHours('');
    setAvgHoursPerDay('');
    setFullTimeJob(false);
    setWeekdays(['mo', 'tu', 'we', 'th', 'fr']);
    setWeekends(['sa', 'su']);
    setActiveDays([]);
    setStartDate('');
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Number of Days</Form.Label>
            <Form.Control
              type="number"
              min="1"
              required
              value={numDays}
              onChange={e => setNumDays(e.target.value)}
              placeholder="Enter number of days"
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Label>Total Hours</Form.Label>
              <Form.Control
                type="number"
                min="0"
                required
                value={totalHours}
                onChange={e => setTotalHours(e.target.value)}
                placeholder="Total hours"
              />
            </Col>
            <Col>
              <Form.Label>Average Hours per Day</Form.Label>
              <Form.Control
                type="number"
                min="0"
                required
                value={avgHoursPerDay}
                onChange={e => setAvgHoursPerDay(e.target.value)}
                placeholder="Avg hours per day"
              />
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Full-time Job"
              checked={fullTimeJob}
              onChange={e => setFullTimeJob(e.target.checked)}
            />
          </Form.Group>

          {fullTimeJob ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Weekdays (Select your weekdays)</Form.Label>
                <div className="d-flex gap-2 flex-wrap">
                  {allDays.map(day => (
                    <Button
                      key={`wd-${day}`}
                      variant={weekdays.includes(day) ? 'primary' : 'outline-dark'}
                      size="sm"
                      onClick={() =>
                        toggleDayEmployed(day, setWeekdays, weekdays, weekends, setWeekends)
                      }
                    >
                      {day.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Weekends (Select your weekend days)</Form.Label>
                <div className="d-flex gap-2 flex-wrap">
                  {allDays.map(day => (
                    <Button
                      key={`we-${day}`}
                      variant={weekends.includes(day) ? 'primary' : 'outline-dark'}
                      size="sm"
                      onClick={() =>
                        toggleDayEmployed(day, setWeekends, weekends, weekdays, setWeekdays)
                      }
                    >
                      {day.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </Form.Group>
            </>
          ) : (
            <Form.Group className="mb-3">
              <Form.Label>Working Days (Select your working days)</Form.Label>
              <div className="d-flex gap-2 flex-wrap">
                {allDays.map(day => (
                  <Button
                    key={`active-${day}`}
                    variant={activeDays.includes(day) ? 'primary' : 'outline-dark'}
                    size="sm"
                    onClick={() => toggleSingleDay(day, activeDays, setActiveDays)}
                  >
                    {day.toUpperCase()}
                  </Button>
                ))}
              </div>
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Off Days (days not selected as working days)</Form.Label>
            <div>
              {offDays.length > 0 ? (
                offDays.map(day => (
                  <Button
                    key={`off-${day}`}
                    variant="outline-secondary"
                    size="sm"
                    disabled
                    style={{ margin: '2px' }}
                  >
                    {day.toUpperCase()}
                  </Button>
                ))
              ) : (
                <span>None</span>
              )}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              min={todayStr}
              required
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create Challenge
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
