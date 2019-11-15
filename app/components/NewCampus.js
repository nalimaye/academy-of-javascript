import React from 'react';
import { connect } from 'react-redux';
import { thunkToAddACampusCreator } from '../reducers/campusesReducer';
import CampusForm from './CampusForm';

const mapDispatchToProps = dispatch => {
  return {
    thunkToAddACampusCreator: newCampus =>
      dispatch(thunkToAddACampusCreator(newCampus)),
  };
};

const defaultState = {
  name: '',
  address: '',
  description: '',
};

class NewCampus extends React.Component {
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
    this.props.thunkToAddACampusCreator(this.state);
    this.setState(defaultState);
  }
  render() {
    return (
      <CampusForm
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        buttonName="Add This Campus"
      />
    );
  }
}

const DisconnectedNewCampus = connect(
  null,
  mapDispatchToProps
)(NewCampus);

export default DisconnectedNewCampus;
