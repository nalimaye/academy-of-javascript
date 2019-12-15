import React from 'react';
import { connect } from 'react-redux';
import {
  thunkToGetACampusCreator,
  thunkToUpdateACampusCreator,
  thunkToAddStudentToCampusCreator,
} from '../reducers/campusesReducer';
import { thunkToGetStudentsCreator } from '../reducers/studentsReducer';
import { List } from './utils';
import CampusForm from './CampusForm';

const mapStateToProps = state => {
  return {
    errorMessage: state.errorsReducer.errorMessage,
    students: state.studentsReducer.students,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    thunkToGetACampusCreator: campusId =>
      dispatch(thunkToGetACampusCreator(campusId)),
    thunkToUpdateACampusCreator: campusToUpdate =>
      dispatch(thunkToUpdateACampusCreator(campusToUpdate)),
    thunkToAddStudentToCampusCreator: studentToAddToCampus =>
      dispatch(thunkToAddStudentToCampusCreator(studentToAddToCampus)),
    thunkToGetStudentsCreator: () => dispatch(thunkToGetStudentsCreator()),
  };
};

class UpdateCampus extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      name: '',
      address: '',
      imageUrl: '',
      description: '',
      studentToAddId: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddStudentToCampus = this.handleAddStudentToCampus.bind(this);
  }

  componentDidMount() {
    this.props.thunkToGetStudentsCreator();
    this.setState({
      id: this.props.campus.id,
      name: this.props.campus.name,
      address: this.props.campus.address,
      imageUrl: this.props.campus.imageUrl,
      description: this.props.campus.description,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit() {
    const campusToUpdate = {
      id: this.state.id,
      name: this.state.name,
      address: this.state.address,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
    };
    await this.props.thunkToUpdateACampusCreator(campusToUpdate);
  }

  async handleAddStudentToCampus(event) {
    event.preventDefault();
    const aStudentToAdd = this.props.students.filter(
      student => student.id === Number(this.state.studentToAddId)
    );

    const studentToAddToCampus = Object.fromEntries(
      Object.entries(aStudentToAdd[0]).filter(
        ([key, value]) => typeof value !== 'object'
      )
    );
    studentToAddToCampus.campusId = this.props.campus.id;
    console.log(
      'In handleAddStudentToCampus, studentToAddToCampus : ',
      studentToAddToCampus
    );
    await this.props.thunkToAddStudentToCampusCreator(studentToAddToCampus);
    console.log(
      'In handleAddStudentToCampus, this.props.campus.id : ',
      this.props.campus.id
    );
    await this.props.thunkToGetACampusCreator(this.props.campus.id);
    // this.setState({
    //   id: this.props.campus.id,
    //   name: this.props.campus.name,
    //   address: this.props.campus.address,
    //   imageUrl: this.props.campus.imageUrl,
    //   description: this.props.campus.description,
    // });
  }

  render() {
    const { errorMessage, students } = this.props;

    return (
      <div>
        <CampusForm
          {...this.state}
          errorMessage={errorMessage}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          buttonName="Update This Campus"
        />

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
      </div>
    );
  }
}

const ConnectedUpdateCampus = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCampus);

export default ConnectedUpdateCampus;
