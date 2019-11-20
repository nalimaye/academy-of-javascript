import { initialState } from './index';

// Action Types
const GOT_ERROR = 'GOT_ERROR';
const RESET_ERROR = 'RESET_ERROR';

// Action Creators
export const gotError = errorMessage => ({
  type: GOT_ERROR,
  errorMessage,
});
export const resetError = () => ({
  type: RESET_ERROR,
});

// Reducer
function errorsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ERROR:
      return { ...state, errorMessage: action.errorMessage };
    case RESET_ERROR:
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
}

export default errorsReducer;
