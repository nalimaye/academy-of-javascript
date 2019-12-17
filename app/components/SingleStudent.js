import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  thunkToGetAStudentCreator,
  thunkToUpdateAStudentCreator,
  thunkToDeleteAStudentCreator,
} from '../reducers/studentsReducer';
import { thunkToRemoveStudentFromCampusCreator } from '../reducers/campusesReducer';
import ConnectedUpdateStudent from './UpdateStudent';

const mapStateToProps = state => {
  return { student: state.studentsReducer.student };
};

const mapDispatchToProps = dispatch => {
  return {
    thunkToGetAStudentCreator: studentId =>
      dispatch(thunkToGetAStudentCreator(studentId)),
    thunkToUpdateAStudentCreator: studentToUpdate =>
      dispatch(thunkToUpdateAStudentCreator(studentToUpdate)),
    thunkToDeleteAStudentCreator: studentToDelete =>
      dispatch(thunkToDeleteAStudentCreator(studentToDelete)),
    thunkToRemoveStudentFromCampusCreator: (
      studentToRemoveFromCampus,
      campusId
    ) =>
      dispatch(
        thunkToRemoveStudentFromCampusCreator(
          studentToRemoveFromCampus,
          campusId
        )
      ),
  };
};

class SingleStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRemoveStudentFromCampus = this.handleRemoveStudentFromCampus.bind(
      this
    );
  }

  componentDidMount() {
    this.props.thunkToGetAStudentCreator(this.props.match.params.studentId);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ isClicked: true });
  }

  handleDelete() {
    this.props.thunkToDeleteAStudentCreator(this.props.student);
    this.props.thunkToGetAStudentCreator(this.props.match.params.studentId);
  }

  async handleRemoveStudentFromCampus() {
    const studentToRemoveFromCampus = Object.fromEntries(
      Object.entries(this.props.student).filter(
        ([key, value]) => typeof value !== 'object'
      )
    );
    studentToRemoveFromCampus.campusId = null;
    await this.props.thunkToRemoveStudentFromCampusCreator(
      studentToRemoveFromCampus,
      this.props.student.campusId
    );
    await this.props.thunkToGetAStudentCreator(
      this.props.match.params.studentId
    );
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
          {student.campus !== undefined && student.campus !== null ? (
            <p>
              This student is registered to the campus:{' '}
              <Link to={`/campuses/${student.campusId}`}>
                {student.campus.name}
              </Link>
              <button
                id="removeFrom"
                type="submit"
                name="removeStudentFromCampus"
                onClick={this.handleRemoveStudentFromCampus}
              >
                Remove From Campus
              </button>
            </p>
          ) : (
            <p>Currently, this student is not registered to a campus.</p>
          )}
        </div>
        <div id="aStudentInfoButtons">
          {this.state.isClicked === false ? (
            <button
              id="update"
              type="submit"
              name="updateStudent"
              onClick={this.handleClick}
            >
              Update This Student
            </button>
          ) : null}
          {this.state.isClicked === true ? (
            <ConnectedUpdateStudent student={student} />
          ) : null}
          <button
            id="delete"
            type="button"
            name="deleteStudent"
            onClick={this.handleDelete}
          >
            Delete This Student
          </button>
        </div>
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
