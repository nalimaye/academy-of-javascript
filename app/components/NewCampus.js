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
  errorMsg: '',
};

class NewCampus extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkForDuplicateName = this.checkForDuplicateName.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  checkForDuplicateName(newCampus) {
    const newName = newCampus.name;
    const duplicate = this.props.campuses.filter(
      campus => campus.name === newName
    );
    if (duplicate.length > 0) return true;
    else return false;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const newCampus = {
      name: this.state.name,
      address: this.state.address,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
    };
    if (this.checkForDuplicateName(newCampus) === true) {
      this.setState({ errorMsg: 'Campus with this name already exists.' });
    } else {
      await this.props.thunkToAddACampusCreator(newCampus);
      if (this.props.errorMessage === '') {
        this.setState(defaultState);
      } else {
        this.setState({ errorMsg: this.props.errorMessage });
      }
    }
  }

  render() {
    return (
      <CampusForm
        {...this.state}
        errorMessage={this.state.errorMsg}
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
