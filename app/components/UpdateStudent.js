import React from 'react';
import { connect } from 'react-redux';
import {
  thunkToUpdateAStudentCreator,
  thunkToGetStudentsCreator,
} from '../reducers/studentsReducer';
import StudentForm from './StudentForm';

const mapStateToProps = state => {
  return {
    errorMessage: state.errorsReducer.errorMessage,
    students: state.studentsReducer.students,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    thunkToUpdateAStudentCreator: studentToUpdate =>
      dispatch(thunkToUpdateAStudentCreator(studentToUpdate)),
    thunkToGetStudentsCreator: () => dispatch(thunkToGetStudentsCreator()),
  };
};

class UpdateStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      gpa: '0.0',
      errorMsg: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkForDuplicateName = this.checkForDuplicateName.bind(this);
    this.checkForDuplicateEmail = this.checkForDuplicateEmail.bind(this);
  }

  async componentDidMount() {
    await this.props.thunkToGetStudentsCreator();
    this.setState({
      id: this.props.student.id,
      firstName: this.props.student.firstName,
      lastName: this.props.student.lastName,
      email: this.props.student.email,
      imageUrl: this.props.student.imageUrl,
      gpa: this.props.student.gpa,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  checkForDuplicateName(updatedStudent) {
    const newFullName =
      updatedStudent.firstName + ' ' + updatedStudent.lastName;
    const duplicate = this.props.students.filter(
      student =>
        student.fullName === newFullName && student.id !== updatedStudent.id
    );
    if (duplicate.length > 0) return true;
    else return false;
  }

  checkForDuplicateEmail(updatedStudent) {
    const newEmail = updatedStudent.email;
    const duplicate = this.props.students.filter(
      student => student.email === newEmail && student.id !== updatedStudent.id
    );
    if (duplicate.length > 0) return true;
    else return false;
  }

  async handleSubmit(event) {
    const updatedStudent = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      imageUrl: this.state.imageUrl,
      gpa: this.state.gpa,
    };
    if (this.checkForDuplicateName(updatedStudent) === true) {
      event.preventDefault();
      this.setState({ errorMsg: 'Student with this name already exists.' });
    } else if (this.checkForDuplicateEmail(updatedStudent) === true) {
      event.preventDefault();
      this.setState({ errorMsg: 'This email address is already used.' });
    } else {
      await this.props.thunkToUpdateAStudentCreator(updatedStudent);
      console.log('updated');
      this.setState({ errorMsg: this.props.errorMessage });
    }
  }

  render() {
    return (
      <StudentForm
        {...this.state}
        errorMessage={this.state.errorMsg}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        buttonName="Update This Student"
      />
    );
  }
}

const ConnectedUpdateStudent = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateStudent);

export default ConnectedUpdateStudent;
