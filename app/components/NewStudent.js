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

    await this.props.thunkToAddAStudentCreator(this.state);

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
