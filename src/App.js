import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./utilities/store";
import Modal from "./components/Modal";
import GameBoard from "./components/GameBoard";
import "./App.css";

function App() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [showModal, setShowModal] = useState(true);

  const handleStartGame = () => {
    setShowModal(false);
  };

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          {showModal ? <Modal
            showModal={showModal}
            setPlayer1={setPlayer1}
            setPlayer2={setPlayer2}
            onStartGame={handleStartGame}
          />:
          <GameBoard player1={player1} player2={player2} />}
        </header>
      </div>
    </Provider>
  );
}

export default App;
