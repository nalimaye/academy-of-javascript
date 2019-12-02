import axios from 'axios';
import { initialState } from './index';
import { gotError, resetError } from './errorsReducer';
import { updatedAStudent } from './studentsReducer';

// Action Types
const GOT_ALL_CAMPUSES = 'GOT_ALL_CAMPUSES_SUCCESSFULLY';
const GOT_A_CAMPUS = 'GOT_A_CAMPUS_SUCCESSFULLY';
const ADDED_A_CAMPUS = 'ADDED_A_CAMPUS_SUCCESSFULLY';
const DELETED_A_CAMPUS = 'DELETED_A_CAMPUS_SUCCESSFULLY';
const UPDATED_A_CAMPUS = 'UPDATED_A_CAMPUS_SUCCESSFULLY';

// Action Creators
const gotAllCampuses = campuses => ({
  type: GOT_ALL_CAMPUSES,
  campuses,
});
const gotACampus = campus => ({
  type: GOT_A_CAMPUS,
  campus,
});
const addedACampus = campus => ({
  type: ADDED_A_CAMPUS,
  campus,
});
const deletedACampus = campusId => ({
  type: DELETED_A_CAMPUS,
  campusId,
});
const updatedACampus = campus => ({
  type: UPDATED_A_CAMPUS,
  campus,
});

// Thunk Creator
export const thunkToGetCampusesCreator = function() {
  return async function(dispatch) {
    const { data } = await axios.get('/api/campuses');
    dispatch(gotAllCampuses(data));
  };
};
export const thunkToGetACampusCreator = function(campusId) {
  return async function(dispatch) {
    const { data } = await axios.get(`/api/campuses/${campusId}`);
    dispatch(gotACampus(data[0]));
  };
};
export const thunkToAddACampusCreator = function(newCampus) {
  return async function(dispatch) {
    try {
      const { data } = await axios.post('/api/campuses', newCampus);
      dispatch(addedACampus(data));
      dispatch(resetError());
    } catch (error) {
      dispatch(gotError(error.response.data));
    }
  };
};
export const thunkToDeleteACampusCreator = function(campusToDeleteId) {
  return async function(dispatch) {
    try {
      await axios.delete(`/api/campuses/${campusToDeleteId}`);
      dispatch(deletedACampus(campusToDeleteId));
      dispatch(resetError());
    } catch (error) {
      dispatch(gotError(error.response.data));
    }
  };
};
export const thunkToUpdateACampusCreator = function(campusToUpdate) {
  return async function(dispatch) {
    try {
      const { data } = await axios.put(
        `/api/campuses/${campusToUpdate.id}`,
        campusToUpdate
      );
      dispatch(updatedACampus(data));
      dispatch(resetError());
    } catch (error) {
      dispatch(gotError(error.response.data));
    }
  };
};
export const thunkToAddStudentToCampusCreator = function(student, campus) {
  return async function(dispatch) {
    try {
      const studentToAdd = {};
      Object.assign(studentToAdd, student);
      studentToAdd.campusId = campusToUpdate.id;

      const campusToUpdate = {};
      Object.assign(campusToUpdate, campus);
      campusToUpdate.students.push(studentToAdd);

      const responseStudent = await axios.put(
        `/api/students/${studentToUpdate.id}`,
        studentToUpdate
      );
      const responseCampus = await axios.put(
        `/api/campuses/${campusToUpdate.id}`,
        campusToUpdate
      );

      // console.log(
      //   'In thunkToAddStudentToCampusCreator, responseCampus.data : ',
      //   responseCampus.data
      // );
      // console.log(
      //   'In thunkToAddStudentToCampusCreator, responseStudent.data : ',
      //   responseStudent.data
      // );
      dispatch(updatedAStudent(responseStudent.data));
      dispatch(updatedACampus(responseCampus.data));
      dispatch(resetError());
    } catch (error) {
      dispatch(gotError(error.response.data));
    }
  };
};

// Reducer
function campusesReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_CAMPUSES:
      return { ...state, campuses: action.campuses };
    case GOT_A_CAMPUS:
      return { ...state, campus: action.campus };
    case ADDED_A_CAMPUS:
      return { ...state, campuses: [...state.campuses, action.campus] };
    case DELETED_A_CAMPUS:
      return {
        ...state,
        campuses: state.campuses.filter(campus => campus.id !== action.id),
      };
    case UPDATED_A_CAMPUS:
      return {
        ...state,
        campuses: state.campuses.map(campus => {
          if (campus.id !== action.campus.id) return campus;
          else return action.campus;
        }),
      };
    default:
      return state;
  }
}

export default campusesReducer;
