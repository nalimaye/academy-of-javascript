import React from 'react';
import { connect } from 'react-redux';
import { thunkToAddACampusCreator } from '../reducers/campusesReducer';
import CampusForm from './CampusForm';

const mapStateToProps = state => {
  return { errorMessage: state.errorsReducer.errorMessage };
};

const mapDispatchToProps = dispatch => {
  return {
    thunkToAddACampusCreator: newCampus =>
      dispatch(thunkToAddACampusCreator(newCampus)),
  };
};

const defaultState = {
  name: '',
  address: '',
  imageUrl: '',
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

  async handleSubmit(event) {
    event.preventDefault();

    await this.props.thunkToAddACampusCreator(this.state);

    const { errorMessage } = this.props;
    if (errorMessage === '') {
      this.setState(defaultState);
    }
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <CampusForm
        {...this.state}
        errorMessage={errorMessage}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        buttonName="Add This Campus"
      />
    );
  }
}

const ConnectedNewCampus = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCampus);

export default ConnectedNewCampus;
