import { combineReducers } from 'redux';

import studentsReducer from './studentsReducer';
import campusesReducer from './campusesReducer';
import errorsReducer from './errorsReducer';

export const initialState = {
  campuses: [],
  campus: {},
  students: [],
  student: {},
  errorMessage: '',
};

const rootReducer = combineReducers({
  campusesReducer,
  studentsReducer,
  errorsReducer,
});

export default rootReducer;
