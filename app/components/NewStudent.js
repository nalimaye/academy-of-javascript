import React from 'react';
import { connect } from 'react-redux';
import { thunkToAddAStudentCreator } from '../reducers/studentsReducer';
import StudentForm from './StudentForm';

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
};

class NewStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.thunkToAddAStudentCreator(this.state);
    this.setState(defaultState);
  }

  render() {
    return (
      <StudentForm
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        buttonName="Add This Student"
      />
    );
  }
}

const DisconnectedNewStudent = connect(
  null,
  mapDispatchToProps
)(NewStudent);

export default DisconnectedNewStudent;
