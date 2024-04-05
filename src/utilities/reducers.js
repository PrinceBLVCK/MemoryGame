// reducers.js
const initialState = {
    player1: { name: '', score: 0 },
    player2: { name: '', score: 0 }
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PLAYER_NAMES':
        return {
          ...state,
          player1: { ...state.player1, name: action.payload.player1 },
          player2: { ...state.player2, name: action.payload.player2 }
        };
      case 'INCREMENT_PLAYER_SCORE':
        return {
          ...state,
          [action.payload]: { ...state[action.payload], score: state[action.payload].score + 1 }
        };
      case 'RESET_PLAYERS_SCORES':
        return {
          ...state,
          player1: { ...state.player1, score: 0 },
          player2: { ...state.player2, score: 0 }
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  