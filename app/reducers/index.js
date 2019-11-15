import { combineReducers } from 'redux';

import studentsReducer from './studentsReducer';
import campusesReducer from './campusesReducer';

export const initialState = {
  campuses: [],
  campus: {},
  students: [],
  student: {},
};

const rootReducer = combineReducers({ campusesReducer, studentsReducer });

export default rootReducer;
