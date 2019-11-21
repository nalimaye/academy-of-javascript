import React from 'react';
import { connect } from 'react-redux';
import {
  thunkToGetACampusCreator,
  thunkToUpdateACampusCreator,
  thunkToDeleteACampusCreator,
} from '../reducers/campusesReducer';
import StudentsList from './StudentsList';
import ConnectedUpdateCampus from './UpdateCampus';

const mapStateToProps = state => {
  return { campus: state.campusesReducer.campus };
};

const mapDispatchToProps = dispatch => {
  return {
    thunkToGetACampusCreator: campusId =>
      dispatch(thunkToGetACampusCreator(campusId)),
    thunkToUpdateACampusCreator: campusToUpdate =>
      dispatch(thunkToUpdateACampusCreator(campusToUpdate)),
    thunkToDeleteACampusCreator: campusToDelete =>
      dispatch(thunkToDeleteACampusCreator(campusToDelete)),
  };
};

class SingleCampus extends React.Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.thunkToGetACampusCreator(this.props.match.params.campusId);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ isClicked: true });
  }

  handleDelete() {
    this.props.thunkToDeleteACampusCreator(this.props.campus);
    this.props.thunkToGetACampusCreator(this.props.match.params.campusId);
  }

  render() {
    const { campus } = this.props;

    return campus !== undefined ? (
      <div id="aCampus">
        <img className="imageLarge" src={campus.imageUrl} />
        <h2>{campus.name}</h2>
        <span>{campus.address}</span>
        <hr />
        <p>{campus.description}</p>
        <hr />

        <div id="aCampusInfo">
          <div id="aCampusInfoStudents">
            <StudentsList students={campus.students} />
          </div>
          <div id="aCampusInfoButtons">
            {this.state.isClicked === false ? (
              <button
                id="update"
                type="submit"
                name="updateCampus"
                onClick={this.handleClick}
              >
                Update This Campus
              </button>
            ) : null}
            {this.state.isClicked === true ? (
              <ConnectedUpdateCampus campus={campus} />
            ) : null}
            <button
              id="delete"
              type="button"
              name="deleteCampus"
              onClick={this.handleDelete}
            >
              Delete This Campus
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <p>No campus with that Id exists !</p>
        <p>
          Please check the All Campuses List by clicking "Campuses" link in the
          navigation bar.
        </p>
      </div>
    );
  }
}

const ConnectedSingleCampus = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCampus);

export default ConnectedSingleCampus;
