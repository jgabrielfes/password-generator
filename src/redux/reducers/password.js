const INITIAL_STATE = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: false,
};

function passwordReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'CHANGE_LENGTH':
    return { ...state, length: action.value };
  case 'CHANGE_INCLUDE':
    return { ...state, [action.include]: action.value };
  default:
    return state;
  }
}

export default passwordReducer;
