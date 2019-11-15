import axios from 'axios';
import { initialState } from './index';

// Action Types
const GOT_ALL_STUDENTS = 'GOT_ALL_STUDENTS_SUCCESSFULLY';
const GOT_A_STUDENT = 'GOT_A_STUDENT_SUCCESSFULLY';
const ADDED_A_STUDENT = 'ADDED_A_STUDENT_SUCCESSFULLY';
const DELETED_A_STUDENT = 'DELETED_A_STUDENT_SUCCESSFULLY';

// Action Creators
const gotAllStudents = students => ({
  type: GOT_ALL_STUDENTS,
  students,
});
const gotAStudent = student => ({
  type: GOT_A_STUDENT,
  student,
});
const addedAStudent = student => ({
  type: ADDED_A_STUDENT,
  student,
});
const deletedAStudent = student => ({
  type: DELETED_A_STUDENT,
  student,
});

// Thunk Creators
export const thunkToGetStudentsCreator = function() {
  return async function(dispatch) {
    const { data } = await axios.get('/api/students');
    dispatch(gotAllStudents(data));
  };
};
export const thunkToGetAStudentCreator = function(studentId) {
  return async function(dispatch) {
    const { data } = await axios.get(`/api/students/${studentId}`);
    dispatch(gotAStudent(data[0]));
  };
};
export const thunkToAddAStudentCreator = function(newStudent) {
  return async function(dispatch) {
    const { data } = await axios.post('/api/students', newStudent);
    dispatch(addedAStudent(data));
  };
};
export const thunkToDeleteAStudentCreator = function(studentToDelete) {
  return async function(dispatch) {
    await axios.delete(`/api/students/${studentToDelete.id}`);
    dispatch(deletedAStudent(studentToDelete));
  };
};

// Reducer
function studentsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_STUDENTS:
      return { ...state, students: action.students };
    case GOT_A_STUDENT:
      return { ...state, student: action.student };
    case ADDED_A_STUDENT:
      return { ...state, students: [...state.students, action.student] };
    case DELETED_A_STUDENT:
      return {
        ...state,
        students: state.students.filter(
          student => student.id !== action.student.id
        ),
      };
    default:
      return state;
  }
}

export default studentsReducer;
