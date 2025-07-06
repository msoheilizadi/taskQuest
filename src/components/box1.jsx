import React from 'react';
import avatar from '../icons/warrior___idle_animation_by_ugarturk_deikqim.gif';

function CharacterStatsBox({
  characterSrc = avatar,
  hpCurrent,
  hpMax,
  xpCurrent,
  xpForNext,
  nextReward,
  level,
}) {
  const hpPercent = Math.min((hpCurrent / hpMax) * 100, 100);
  const xpPercent = Math.min((xpCurrent / xpForNext) * 100, 100);

  return (
    <div className="card stats-box p-3 d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
      {/* Avatar and Bars in a Row */}
      <div className="d-flex align-items-center justify-content-center mb-3 position-relative" style={{ width: '100%' }}>
        {/* Character Level */}
        <div className="position-absolute top-0 start-0 ms-2 mt-2">
          <span style={{ backgroundColor: '#222', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem' }}>
            Level {level}
          </span>
        </div>

        <img
          src={characterSrc}
          alt="Avatar"
          style={{ width: '240px', height: '240px', border: 'solid 1px rgb(0 0 0 / 18%)' }}
        />
        <div className="ms-3 flex-grow-1 d-flex flex-column justify-content-center">
          {/* HP */}
          <div className="mb-2 text-start">
            <small className="text-muted">HP</small>
            <div className="progress" style={{ height: '6px' }}>
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: `${hpPercent}%` }}
                aria-valuenow={hpCurrent}
                aria-valuemin="0"
                aria-valuemax={hpMax}
              />
            </div>
            <small>{hpCurrent} / {hpMax}</small>
          </div>

          {/* XP */}
          <div className="text-start mb-3">
            <small className="text-muted">XP</small>
            <div className="progress" style={{ height: '6px' }}>
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: `${xpPercent}%` }}
                aria-valuenow={xpCurrent}
                aria-valuemin="0"
                aria-valuemax={xpForNext}
              />
            </div>
            <small>{xpCurrent} / {xpForNext}</small>
          </div>

          {/* Next Level Reward with top border and centered text */}
          <div className="border-top pt-2 mt-2 text-center mb-2">
            <small className="text-muted d-block mb-1">Next Level Reward</small>
            <strong>{nextReward}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterStatsBox;