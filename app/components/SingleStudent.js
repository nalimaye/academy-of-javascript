import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  thunkToGetAStudentCreator,
  thunkToDeleteAStudentCreator,
} from '../reducers/studentsReducer';

const mapStateToProps = state => {
  return { student: state.studentsReducer.student };
};

const mapDispatchToProps = dispatch => {
  return {
    thunkToGetAStudentCreator: studentId =>
      dispatch(thunkToGetAStudentCreator(studentId)),
    thunkToDeleteAStudentCreator: studentToDelete =>
      dispatch(thunkToDeleteAStudentCreator(studentToDelete)),
  };
};

class SingleStudent extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.thunkToGetAStudentCreator(this.props.match.params.studentId);
  }

  handleDelete() {
    this.props.thunkToDeleteAStudentCreator(this.props.student);
    this.props.thunkToGetAStudentCreator(this.props.match.params.studentId);
  }

  render() {
    const { student } = this.props;
    return student !== undefined ? (
      <div id="aStudent">
        <img className="imageBig" src={student.imageUrl} />
        <h2>{student.fullName}</h2>
        <p>Email: {student.email}</p>
        <p>GPA: {student.gpa}</p>

        <div>
          {student.campus !== undefined ? (
            <p>
              This student is registered to the campus:{' '}
              <Link to={`/campuses/${student.campusId}`}>
                {student.campus.name}
              </Link>
            </p>
          ) : (
            <p>Currently, this student is not registered to a campus.</p>
          )}
        </div>
        <button
          id="delete"
          type="button"
          name="deleteStudent"
          onClick={this.handleDelete}
        >
          Delete This Student
        </button>
      </div>
    ) : (
      <div>
        <p>No student with that Id exists !</p>
        <p>
          Please check the All Students List by clicking "Students" link in the
          navigation bar.
        </p>
      </div>
    );
  }
}
const ConnectedSingleStudent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStudent);

export default ConnectedSingleStudent;
