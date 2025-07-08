import React from "react";
import logo from '../icons/gamepad-solid.png';
import userProfile from '../icons/145267625-confused-thinking-emoticon-boy-man-icon-vector-illustration-outline-style.jpg';
import coin from "../icons/vecteezy_silver-coin-game-pixel_49322947.jpg";
import { useNavigate } from "react-router-dom";


function Header({ setShowChallengeModal, setShowDailyModal, setShowHabitModal, setShowToDoModal, setShowRewardModal, goldAmount }) {
  const navigate = useNavigate();

  return (
    <div className="container-fluid" id="head-menu">
      <header className="container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none" id="logo">
            <img src={logo} height="20px" alt="" />
            <h2 id="head">TaskQuest</h2>
          </a>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a
              href="#"
              className="nav-link px-3 link-dark"
              onClick={(e) => {
                e.preventDefault();
                navigate('/challenge');
              }}
            >
              New Challenge
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link px-3 link-dark"
              onClick={(e) => {
                e.preventDefault();
                setShowDailyModal(true);
              }}
            >
              New Daily
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link px-3 link-dark"
              onClick={(e) => {
                e.preventDefault();
                setShowHabitModal(true);
              }}
            >
              New Habit
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link px-3 link-dark"
              onClick={(e) => {
                e.preventDefault();
                setShowToDoModal(true);
              }}
            >
              New To-Do
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link px-3 link-dark"
              onClick={(e) => {
                e.preventDefault();
                setShowRewardModal(true);
              }}
            >
              New Reward
            </a>
          </li>
        </ul>

        <div className="col-md-3 text-end" id="right-user">
          <img src={userProfile} height="30px" alt="" />
          <p className="me-3 ms-1" id="coin-count">{goldAmount}</p>
          <img src={coin} height="25px" alt="" />
        </div>
      </header>
    </div>
  );
}

export default Header;
