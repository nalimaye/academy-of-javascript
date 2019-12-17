import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  thunkToGetACampusCreator,
  thunkToAddStudentToCampusCreator,
  thunkToRemoveStudentFromCampusCreator,
} from '../reducers/campusesReducer';
import { thunkToGetStudentsCreator } from '../reducers/studentsReducer';
import { List } from './utils';
import ConnectedUpdateCampus from './UpdateCampus';

const mapStateToProps = state => {
  return {
    campus: state.campusesReducer.campus,
    students: state.studentsReducer.students,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    thunkToGetACampusCreator: campusId =>
      dispatch(thunkToGetACampusCreator(campusId)),
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
    thunkToGetStudentsCreator: () => dispatch(thunkToGetStudentsCreator()),
  };
};

class SingleCampus extends React.Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      studentToAddId: 1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddStudentToCampus = this.handleAddStudentToCampus.bind(this);
    this.handleRemoveStudentFromCampus = this.handleRemoveStudentFromCampus.bind(
      this
    );
  }

  componentDidMount() {
    this.props.thunkToGetACampusCreator(this.props.match.params.campusId);
    this.props.thunkToGetStudentsCreator();
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
    const aStudentToAdd = this.props.students.filter(
      student => student.id === Number(this.state.studentToAddId)
    );

    const studentToAddToCampus = Object.fromEntries(
      Object.entries(aStudentToAdd[0]).filter(
        ([key, value]) => typeof value !== 'object'
      )
    );
    studentToAddToCampus.campusId = this.props.campus.id;
    await this.props.thunkToAddStudentToCampusCreator(studentToAddToCampus);
  }

  async handleRemoveStudentFromCampus(studentToRemoveId) {
    const aStudentToRemove = this.props.students.filter(
      student => student.id === Number(studentToRemoveId)
    );

    const studentToRemoveFromCampus = Object.fromEntries(
      Object.entries(aStudentToRemove[0]).filter(
        ([key, value]) => typeof value !== 'object'
      )
    );
    studentToRemoveFromCampus.campusId = null;
    await this.props.thunkToRemoveStudentFromCampusCreator(
      studentToRemoveFromCampus,
      this.props.campus.id
    );
  }

  render() {
    const { campus, students } = this.props;

    return campus !== undefined ? (
      <div id="aCampus">
        <div className="aCampusInfo">
          <img className="imageLarge" src={campus.imageUrl} />
          <h2>{campus.name}</h2>
          <span>{campus.address}</span>
          <hr />
          <p>{campus.description}</p>
        </div>

        <div className="aCampusInfoExtra">
          <div id="aCampusInfoStudents">
            <div id="aCampusInfoStudentsList">
              <h4>
                {campus.students === undefined
                  ? 'No'
                  : `${campus.students.length}`}
                {' Students enrolled at this campus'}
              </h4>
              {campus.students !== undefined ? (
                <List
                  forEachOfThese={campus.students}
                  doThis={student => {
                    return (
                      <div
                        key={student.id}
                        class="aCampusInfoStudentsList-item"
                      >
                        <Link to={`/students/${student.id}`}>
                          <p>{student.fullName}</p>
                        </Link>
                        <button
                          id="removeFrom"
                          type="submit"
                          name="removeStudentFromCampus"
                          onClick={() =>
                            this.handleRemoveStudentFromCampus(student.id)
                          }
                        >
                          Remove From Campus
                        </button>
                      </div>
                    );
                  }}
                  unlessEmpty={() => (
                    <div>
                      <p>
                        Currently, there are no students registered at this
                        campus.
                      </p>
                    </div>
                  )}
                />
              ) : null}
            </div>

            <div id="student-options">
              <div id="Select-student-option">
                <label htmlFor="Student-select">Select student:</label>
                <select
                  id="Student-select"
                  name="studentToAddId"
                  value={this.state.studentToAddId}
                  onChange={this.handleChange}
                >
                  <List
                    forEachOfThese={students}
                    doThis={student => {
                      return (
                        <option key={student.id} value={student.id}>
                          {student.fullName}
                        </option>
                      );
                    }}
                    unlessEmpty={() => <option>No students registered.</option>}
                  />
                </select>

                <button
                  id="addTo"
                  type="submit"
                  name="addStudentToCampus"
                  onClick={this.handleAddStudentToCampus}
                >
                  Add To Campus
                </button>
              </div>
            </div>

            {this.state.isClicked === false ? (
              <div className="aCampusInfoButtons">
                <button
                  id="update"
                  type="submit"
                  name="updateCampus"
                  onClick={this.handleClick}
                >
                  Update This Campus
                </button>
              </div>
            ) : (
              <ConnectedUpdateCampus campus={campus} />
            )}
          </div>
        </div>
      </div>
    ) : (
      <div>
        <p>No campus with that Id exists !</p>
        <p>
          Please check the All Campuses List by clicking "Campuses" link in the
          navigation bar.
        </p>
      </div>
    );
  }
}

const ConnectedSingleCampus = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCampus);

export default ConnectedSingleCampus;
