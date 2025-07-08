import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

export default function CategoryPage({ data, onChange, onBack, onNext }) {
  const [categories, setCategories] = useState(data.categories || []);
  const totalHours = Number(data.totalHours) || 0;

  useEffect(() => {
    if (!data.categories || data.categories.length === 0) {
      setCategories([{ name: '', hours: '' }]);
    }
  }, []);

  const handleCategoryChange = (index, key, value) => {
    const updated = [...categories];
    updated[index][key] = key === 'hours' ? Number(value) : value;
    setCategories(updated);
  };

  const handleAddCategory = () => {
    setCategories([...categories, { name: '', hours: '' }]);
  };

  const handleRemoveCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const totalAllocated = categories.reduce((sum, cat) => sum + Number(cat.hours || 0), 0);

  const handleContinue = (e) => {
    e.preventDefault();

    const isValid = categories.every(cat => cat.name && cat.hours >= 0);
    if (!isValid) {
      alert("Please complete all category names and hours.");
      return;
    }

    if (totalAllocated < totalHours) {
      alert("Total allocated hours must be equal to or greater than total challenge hours.");
      return;
    }

    onChange({ categories }); // Save to parent
    onNext();
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-body-tertiary">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="p-4 border rounded bg-light shadow-sm">

              <Form onSubmit={handleContinue}>
                <h3 className="mb-4 text-center">Category Allocation</h3>

                {categories.map((cat, index) => (
                  <Row key={index} className="mb-3 align-items-center">
                    <Col xs={12} md={5} className="mb-2 mb-md-0">
                      <Form.Control
                        type="text"
                        placeholder="Category Name"
                        value={cat.name}
                        onChange={e => handleCategoryChange(index, 'name', e.target.value)}
                        required
                      />
                    </Col>
                    <Col xs={12} md={4} className="mb-2 mb-md-0">
                      <Form.Control
                        type="number"
                        placeholder="Hours"
                        min="0"
                        value={cat.hours}
                        onChange={e => handleCategoryChange(index, 'hours', e.target.value)}
                        required
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="w-100"
                        onClick={() => handleRemoveCategory(index)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                ))}

                <div className="d-flex justify-content-between align-items-center mt-2 mb-3 flex-wrap gap-2">
                  <div className="text-muted">
                    Total Allocated: {totalAllocated} / {totalHours} hours
                  </div>
                  <Button variant="outline-primary" size="sm" onClick={handleAddCategory}>
                    + Add Category
                  </Button>
                </div>

                {totalAllocated < totalHours && (
                  <div className="text-danger mb-2">
                    ⚠️ Total must match or exceed the challenge total hours.
                  </div>
                )}

                <div className="d-flex justify-content-between mt-4">
                  <Button variant="secondary" onClick={onBack}>
                    ← Back
                  </Button>
                  <Button variant="primary" type="submit">
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
