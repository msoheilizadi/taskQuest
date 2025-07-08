import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const allDays = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

export default function ChallengeConfigPage({ data, onChange, onNext }) {
  const [formData, setFormData] = useState({ ...data });

  const toggleDay = (day, key) => {
    const current = formData[key];
    const updated = current.includes(day)
      ? current.filter(d => d !== day)
      : [...current, day];

    setFormData(prev => ({ ...prev, [key]: updated }));
  };

  const getOffDays = () => {
    if (formData.fullTimeJob) {
      return allDays.filter(day => !formData.weekdays.includes(day) && !formData.weekends.includes(day));
    } else {
      return allDays.filter(day => !formData.activeDays?.includes(day));
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const offDays = getOffDays();
    onChange({ ...formData, offDays });
    onNext();
  };

  useEffect(() => {
    // Initialize activeDays for unemployed users
    if (!formData.fullTimeJob && !formData.activeDays) {
      setFormData(prev => ({ ...prev, activeDays: allDays }));
    }
  }, [formData.fullTimeJob]);

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-body-tertiary">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="p-4 border rounded bg-light shadow-sm">
            <h3 className="mb-3">Challenge Setup</h3>

            <Form onSubmit={handleContinue}>

              <Form.Group className="mb-3">
                <Form.Label>Number of Days</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={formData.numDays}
                  onChange={e => setFormData({ ...formData, numDays: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Total Hours</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={formData.totalHours}
                  onChange={e => setFormData({ ...formData, totalHours: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Average Hours per Day</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={formData.avgHoursPerDay}
                  onChange={e => setFormData({ ...formData, avgHoursPerDay: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="I have a full-time job"
                  checked={formData.fullTimeJob}
                  onChange={e => setFormData({ ...formData, fullTimeJob: e.target.checked })}
                />
              </Form.Group>

              {formData.fullTimeJob ? (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Select Weekdays</Form.Label>
                    <div className="d-flex gap-2 flex-wrap">
                      {allDays.map(day => (
                        <Button
                          key={`wd-${day}`}
                          variant={formData.weekdays.includes(day) ? 'primary' : 'outline-secondary'}
                          onClick={() => toggleDay(day, 'weekdays')}
                          size="sm"
                        >
                          {day.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Select Weekends</Form.Label>
                    <div className="d-flex gap-2 flex-wrap">
                      {allDays.map(day => (
                        <Button
                          key={`we-${day}`}
                          variant={formData.weekends.includes(day) ? 'primary' : 'outline-secondary'}
                          onClick={() => toggleDay(day, 'weekends')}
                          size="sm"
                        >
                          {day.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </Form.Group>
                </>
              ) : (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Select Your Active Days</Form.Label>
                    <div className="d-flex gap-2 flex-wrap">
                      {allDays.map(day => (
                        <Button
                          key={`ad-${day}`}
                          variant={formData.activeDays?.includes(day) ? 'primary' : 'outline-secondary'}
                          onClick={() => toggleDay(day, 'activeDays')}
                          size="sm"
                        >
                          {day.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </Form.Group>
                </>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  min={new Date().toISOString().split('T')[0]} // today or future
                  value={formData.startDate}
                  onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Off Days</Form.Label>
                <div className="d-flex gap-2 flex-wrap">
                  {getOffDays().map(day => (
                    <span key={day} className="badge bg-secondary">{day.toUpperCase()}</span>
                  ))}
                </div>
              </Form.Group>

              <div className="d-flex justify-content-between mt-4">
                <Button variant="secondary" onClick={() => window.history.back()}>
                  ← Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Next →
                </Button>
              </div>
            </Form>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
