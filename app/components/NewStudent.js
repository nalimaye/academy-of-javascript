import React from 'react';
import { connect } from 'react-redux';
import { thunkToAddAStudentCreator } from '../reducers/studentsReducer';
import StudentForm from './StudentForm';

const mapStateToProps = state => {
  return { errorMessage: state.studentsReducer.errorMessage };
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

  async handleSubmit(event) {
    event.preventDefault();

    const newStudent = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
    };
    await this.props.thunkToAddAStudentCreator(newStudent);

    const { errorMessage } = this.props;
    if (errorMessage === '') {
      this.setState(defaultState);
    }
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <StudentForm
        {...this.state}
        errorMessage={errorMessage}
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
