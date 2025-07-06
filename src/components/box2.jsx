import React, { useState } from 'react';
import { FaCoins } from 'react-icons/fa';
import RewardDetailsModal from './rewardDetailModal';  // Import the modal component

function RewardsShop({ rewards = [], onDelete, buyReward }) {
  const [selectedReward, setSelectedReward] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const isScrollable = rewards.length > 6;

  const handleOpenModal = (reward) => {
    setSelectedReward(reward);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedReward(null);
    setShowModal(false);
  };

  const handleDelete = (reward) => {
    onDelete(reward);
    handleCloseModal();
  };

  return (
    <div className="card">
      <h3 className="mb-3">Rewards Shop</h3>

      <div
        className={isScrollable ? 'custom-scroll' : ''}
        style={{
          maxHeight: isScrollable ? `220px` : 'auto',
          overflowY: isScrollable ? 'auto' : 'visible',
          overflowX: 'hidden'
        }}
      >
        <div className="row">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-4 mb-4"
              style={{ cursor: 'pointer' }}
              onClick={() => handleOpenModal(reward)}
            >
              <div
                className="d-flex flex-column align-items-center p-3 border rounded bg-white text-black h-100"
                style={{ minHeight: `auto` }}
              >
                <span className="mb-2 text-center w-100 fw-medium">{reward.name}</span>
                <button
                  className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    border: '1px solid black',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    color: 'black',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'black';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = 'black';
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    buyReward(reward.cost);
                  }}
                   // Prevent modal opening on button click
                >
                  <FaCoins style={{ color: 'currentColor' }} />
                  {reward.cost} Coins
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <RewardDetailsModal
        show={showModal}
        onClose={handleCloseModal}
        reward={selectedReward}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default RewardsShop;
