// Modal.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPlayerNames } from "../utilities/actions";
import "../styles/modal.css";

function Modal({ showModal, onStartGame }) {
  const dispatch = useDispatch();
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");

  const handleStart = () => {
    if(!name1 || !name2) return alert('Please enter player names');
    dispatch(setPlayerNames(name1, name2));
    onStartGame();
  };

  return (
    <div
      className="overlay"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={`modal ${showModal ? "show" : "hide"}`}>
        <div className="modal-content">
          <h2>Welcome to the Memory Game</h2>

          <div className="input-wrapper">
            <label>Player 1</label>
            <input
              type="text"
              placeholder="Enter player 1 name"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label>Player 2</label>
            <input
              type="text"
              placeholder="Enter player 2 name"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
            />
          </div>
          <button className="startBtn" onClick={handleStart}>
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
