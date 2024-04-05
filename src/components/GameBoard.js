// GameBoard.js
import React, { useState, useEffect , Component} from "react";
import Card from "./Card";
import { shuffle } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { incrementPlayerScore,resetPlayersScores } from "../utilities/actions";
import "../styles/game-board.css";
import { connect } from 'react-redux';
import { cards } from "../utilities/globals";
import WinnerModal from "./WinnerModal";

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 'player1', // Initialize current player
      flippedCards: [],
      matchedCards: [],
      shuffledCards: [],
      winner: null, // Track the winner
      isGameOver: false, // Track if the game is over
    };
  }

  componentDidMount() {
    this.setState({ shuffledCards: shuffle(cards.concat(cards)) });
  }

  resetGame = () => {
    this.setState({
      currentPlayer: 'player1',
      flippedCards: [],
      matchedCards: [],
      shuffledCards: shuffle(cards.concat(cards)),
      winner: null,
      isGameOver: false,
    }, () => {
      this.props.resetPlayersScores();
    })
  };

  handleCardClick = (cardId) => {
    const { flippedCards } = this.state;
    if (flippedCards.length < 2 && !flippedCards.includes(cardId)) {
      this.setState({ flippedCards: [...flippedCards, cardId] });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { flippedCards, matchedCards, shuffledCards, currentPlayer } = this.state;
    if (flippedCards.length === 2 && prevState.flippedCards !== flippedCards) {
      const [card1, card2] = flippedCards;
      if (
        shuffledCards[card1].value === shuffledCards[card2].value &&
        shuffledCards[card1].color === shuffledCards[card2].color &&
        shuffledCards[card1].shape === shuffledCards[card2].shape
      ) {
        // If matched, update matched cards array, player's score, and switch to the next player
        setTimeout(() => {
          this.setState({ 
            matchedCards: [...matchedCards, shuffledCards[card1]],
            flippedCards: [],
            shuffledCards: [...shuffledCards.filter((card, index) => index !== card1 && index !== card2)] // Remove matched cards from the board
          }, () => {
            if (shuffledCards.length === 2) {
              // If there are only two cards left, the game is over
              const { player1, player2 } = this.props;
              const winner = player1.score > player2.score ? player1.name : player2.name;
              this.setState({ 
                isGameOver: true,
                winner
              });
            }
          });
        }, 1000);
        this.props.incrementPlayerScore(currentPlayer); // Increment current player's score
      } else {
        // If not matched, switch to the next player
        const nextPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
        this.setState({ currentPlayer: nextPlayer });
        setTimeout(() => {
          this.setState({ 
            flippedCards: []
          });
        }, 1000);
      }
    }
  }

  render() {
    const { player1, player2 } = this.props;
    const { currentPlayer, flippedCards, shuffledCards,isGameOver, winner } = this.state;
    const currentPlayerData = currentPlayer === 'player1' ? player1 : player2;

    return (
      <>
        <div className="game-board">
          <div className="score-board">
            <h2>Score</h2>
            <div className="scores">
              <p className="player-score">
                {player1.name}: {player1.score}
              </p>
              <p className="player-score">
                {player2.name}: {player2.score}
              </p>
            </div>
          </div>
          <p style={{textAlign:'start',padding:'10px', width:'100%'}}>Current Player: {currentPlayerData.name}</p>
          <div className="board">
            {shuffledCards.map((card, index) => (
              <Card
                key={index}
                id={index}
                value={card.value}
                color={card.color}
                shape={card.shape}
                suit={card.suit}
                isFlipped={flippedCards.includes(index)}
                onClick={this.handleCardClick}
              />
            ))}
          </div>
          
        </div>
        <WinnerModal isOpen={isGameOver} winner={winner} onClose={this.resetGame} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  player1: state.player1,
  player2: state.player2,
});

const mapDispatchToProps = {
  incrementPlayerScore,
  resetPlayersScores
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);


