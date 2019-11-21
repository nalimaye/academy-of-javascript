import React from 'react';
import { connect } from 'react-redux';
import { thunkToUpdateAStudentCreator } from '../reducers/studentsReducer';
import StudentForm from './StudentForm';

const mapStateToProps = state => {
  return { errorMessage: state.errorsReducer.errorMessage };
};
const mapDispatchToProps = dispatch => {
  return {
    thunkToUpdateAStudentCreator: studentToUpdate =>
      dispatch(thunkToUpdateAStudentCreator(studentToUpdate)),
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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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

  handleSubmit() {
    this.props.thunkToUpdateAStudentCreator(this.state);
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <StudentForm
        {...this.state}
        errorMessage={errorMessage}
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
