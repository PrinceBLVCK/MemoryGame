// actions.js
export const setPlayerNames = (player1, player2) => {
    return {
      type: 'SET_PLAYER_NAMES',
      payload: { player1, player2 }
    };
  };
  
export const incrementPlayerScore = (player) => {
  return {
    type: 'INCREMENT_PLAYER_SCORE',
    payload: player
  };
};

export const resetPlayersScores = (player) => {
  return {
    type: 'RESET_PLAYERS_SCORES',
    payload: { player1: 0, player2: 0 }
  };
};
  