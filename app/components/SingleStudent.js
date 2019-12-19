import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  thunkToGetAStudentCreator,
  thunkToUpdateAStudentCreator,
} from '../reducers/studentsReducer';
import {
  thunkToGetCampusesCreator,
  thunkToAddStudentToCampusCreator,
  thunkToRemoveStudentFromCampusCreator,
} from '../reducers/campusesReducer';
import { List } from './utils';
import ConnectedUpdateStudent from './UpdateStudent';

const mapStateToProps = state => {
  return {
    student: state.studentsReducer.student,
    campuses: state.campusesReducer.campuses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    thunkToGetCampusesCreator: () => dispatch(thunkToGetCampusesCreator()),
    thunkToGetAStudentCreator: studentId =>
      dispatch(thunkToGetAStudentCreator(studentId)),
    thunkToUpdateAStudentCreator: studentToUpdate =>
      dispatch(thunkToUpdateAStudentCreator(studentToUpdate)),
    thunkToAddStudentToCampusCreator: studentToAddToCampus =>
      dispatch(thunkToAddStudentToCampusCreator(studentToAddToCampus)),
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
      campusToAddToId: 1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddStudentToCampus = this.handleAddStudentToCampus.bind(this);
    this.handleRemoveStudentFromCampus = this.handleRemoveStudentFromCampus.bind(
      this
    );
  }

  async componentDidMount() {
    await this.props.thunkToGetAStudentCreator(
      this.props.match.params.studentId
    );
    await this.props.thunkToGetCampusesCreator();
    if (this.props.campuses.length > 0) {
      this.setState({
        campusToAddToId: this.props.campuses[0].id,
      });
    }
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ isClicked: true });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleAddStudentToCampus() {
    const studentToAddToCampus = Object.fromEntries(
      Object.entries(this.props.student).filter(
        ([key, value]) => typeof value !== 'object'
      )
    );
    studentToAddToCampus.campusId = this.state.campusToAddToId;
    await this.props.thunkToAddStudentToCampusCreator(studentToAddToCampus);
    await this.props.thunkToGetAStudentCreator(
      this.props.match.params.studentId
    );
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
    const { student, campuses } = this.props;

    return student !== undefined ? (
      <div id="aStudent">
        <img className="imageBig" src={student.imageUrl} />
        <h2>{student.fullName}</h2>
        <p>Email: {student.email}</p>
        <p>GPA: {student.gpa}</p>

        {student.campus !== undefined && student.campus !== null ? (
          <div>
            <p>This student is registered to the campus:</p>
            <div className="aStudentInfo">
              <div>
                <Link to={`/campuses/${student.campusId}`}>
                  <img className="imageSmall" src={student.campus.imageUrl} />
                </Link>
              </div>
              <div>
                <Link to={`/campuses/${student.campusId}`}>
                  <span className="textImageTiny">{student.campus.name}</span>
                </Link>
              </div>
              <div>
                <button
                  id="removeFrom"
                  type="submit"
                  name="removeStudentFromCampus"
                  onClick={this.handleRemoveStudentFromCampus}
                >
                  Remove From Campus
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>Currently, this student is not registered to a campus.</p>
            <div id="campus-options">
              <div id="Select-campus-option">
                <label htmlFor="Campus-select">Select campus:</label>
                <select
                  id="Campus-select"
                  name="campusToAddToId"
                  value={this.state.campusToAddToId}
                  onChange={this.handleChange}
                >
                  <List
                    forEachOfThese={campuses}
                    doThis={campus => {
                      return (
                        <option key={campus.id} value={campus.id}>
                          {campus.name}
                        </option>
                      );
                    }}
                    unlessEmpty={() => <option>No campuses registered.</option>}
                  />
                </select>

                <button
                  id="addTo"
                  type="submit"
                  name="addStudentToCampus"
                  onClick={this.handleAddStudentToCampus}
                  disabled={campuses.length === 0}
                >
                  Add To Campus
                </button>
              </div>
            </div>
          </div>
        )}

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
