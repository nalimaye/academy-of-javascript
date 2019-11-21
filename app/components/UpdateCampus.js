import React from 'react';
import { connect } from 'react-redux';
import { thunkToUpdateACampusCreator } from '../reducers/campusesReducer';
import CampusForm from './CampusForm';

const mapStateToProps = state => {
  return { errorMessage: state.errorsReducer.errorMessage };
};
const mapDispatchToProps = dispatch => {
  return {
    thunkToUpdateACampusCreator: campusToUpdate =>
      dispatch(thunkToUpdateACampusCreator(campusToUpdate)),
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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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

  handleSubmit() {
    this.props.thunkToUpdateACampusCreator(this.state);
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <CampusForm
        {...this.state}
        errorMessage={errorMessage}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        buttonName="Update This Campus"
      />
    );
  }
}

const DisconnectedUpdateCampus = connect(
  null,
  mapDispatchToProps
)(UpdateCampus);

export default DisconnectedUpdateCampus;
