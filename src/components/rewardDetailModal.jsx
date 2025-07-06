import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function RewardDetailsModal({ show, onClose, reward, onDelete }) {
  if (!reward) return null;

  return (
    <Modal show={show} onHide={onClose} >
      <Modal.Header closeButton>
        <Modal.Title>{reward.name || 'Reward Details'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><strong>Price:</strong> {reward.cost} Coins</p>
        {reward.notes && <p><strong>Notes:</strong> {reward.notes}</p>}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={() => onDelete(reward)}>
          Delete
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RewardDetailsModal;
