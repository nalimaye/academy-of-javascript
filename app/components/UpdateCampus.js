import React from 'react';
import { connect } from 'react-redux';
import { thunkToUpdateACampusCreator } from '../reducers/campusesReducer';
import CampusForm from './CampusForm';

const mapStateToProps = state => {
  return {
    errorMessage: state.errorsReducer.errorMessage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    thunkToGetACampusCreator: campusId =>
      dispatch(thunkToGetACampusCreator(campusId)),
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

  async handleSubmit() {
    const campusToUpdate = {
      id: this.state.id,
      name: this.state.name,
      address: this.state.address,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
    };
    await this.props.thunkToUpdateACampusCreator(campusToUpdate);
  }

  render() {
    const { errorMessage } = this.props;

    return (
      <div>
        <CampusForm
          {...this.state}
          errorMessage={errorMessage}
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
