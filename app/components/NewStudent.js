import React from 'react';
import { connect } from 'react-redux';
import { thunkToAddAStudentCreator } from '../reducers/studentsReducer';
import StudentForm from './StudentForm';

const mapStateToProps = state => {
  return { errorMessage: state.errorsReducer.errorMessage };
};

const mapDispatchToProps = dispatch => {
  return {
    thunkToAddAStudentCreator: newStudent =>
      dispatch(thunkToAddAStudentCreator(newStudent)),
  };
};

const defaultState = {
  firstName: '',
  lastName: '',
  email: '',
  imageUrl: '',
  gpa: '0.0',
  errorMsg: '',
};

class NewStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkForDuplicateName = this.checkForDuplicateName.bind(this);
    this.checkForDuplicateEmail = this.checkForDuplicateEmail.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  checkForDuplicateName(newStudent) {
    const newFullName = newStudent.firstName + ' ' + newStudent.lastName;
    const duplicate = this.props.students.filter(
      student => student.fullName === newFullName
    );
    if (duplicate.length > 0) return true;
    else return false;
  }

  checkForDuplicateEmail(newStudent) {
    const newEmail = newStudent.email;
    const duplicate = this.props.students.filter(
      student => student.email === newEmail
    );
    if (duplicate.length > 0) return true;
    else return false;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const newStudent = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      imageUrl: this.state.imageUrl,
      gpa: this.state.gpa,
    };
    if (this.checkForDuplicateName(newStudent) === true) {
      this.setState({ errorMsg: 'Student with this name already exists.' });
    } else if (this.checkForDuplicateEmail(newStudent) === true) {
      this.setState({ errorMsg: 'This email address is already used.' });
    } else {
      await this.props.thunkToAddAStudentCreator(newStudent);
      if (this.props.errorMessage === '') {
        this.setState(defaultState);
      } else {
        this.setState({ errorMsg: this.props.errorMessage });
      }
    }
  }

  render() {
    return (
      <StudentForm
        {...this.state}
        errorMessage={this.state.errorMsg}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        buttonName="Add This Student"
      />
    );
  }
}

const ConnectedNewStudent = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewStudent);

export default ConnectedNewStudent;
