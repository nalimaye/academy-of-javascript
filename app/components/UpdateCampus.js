import React from 'react';
import { connect } from 'react-redux';
import {
  thunkToUpdateACampusCreator,
  thunkToGetCampusesCreator,
} from '../reducers/campusesReducer';
import CampusForm from './CampusForm';

const mapStateToProps = state => {
  return {
    errorMessage: state.errorsReducer.errorMessage,
    campuses: state.campusesReducer.campuses,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    thunkToGetACampusCreator: campusId =>
      dispatch(thunkToGetACampusCreator(campusId)),
    thunkToUpdateACampusCreator: campusToUpdate =>
      dispatch(thunkToUpdateACampusCreator(campusToUpdate)),
    thunkToGetCampusesCreator: () => dispatch(thunkToGetCampusesCreator()),
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
      errorMsg: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkForDuplicateName = this.checkForDuplicateName.bind(this);
  }

  async componentDidMount() {
    await this.props.thunkToGetCampusesCreator();
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

  checkForDuplicateName(campusToUpdate) {
    const newName = campusToUpdate.name;
    const duplicate = this.props.campuses.filter(
      campus => campus.name === newName && campus.id !== campusToUpdate.id
    );
    if (duplicate.length > 0) return true;
    else return false;
  }

  async handleSubmit() {
    const campusToUpdate = {
      id: this.state.id,
      name: this.state.name,
      address: this.state.address,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
    };
    if (this.checkForDuplicateName(campusToUpdate) === true) {
      event.preventDefault();
      this.setState({ errorMsg: 'Campus with this name already exists.' });
    } else {
      await this.props.thunkToUpdateACampusCreator(campusToUpdate);
      this.setState({ errorMsg: this.props.errorMessage });
    }
  }

  render() {
    return (
      <div>
        <CampusForm
          {...this.state}
          errorMessage={this.state.errorMsg}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          buttonName="Update This Campus"
        />
      </div>
    );
  }
}

const ConnectedUpdateCampus = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCampus);

export default ConnectedUpdateCampus;
