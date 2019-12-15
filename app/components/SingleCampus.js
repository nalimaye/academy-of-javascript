import React from 'react';
import { connect } from 'react-redux';
import { thunkToGetACampusCreator } from '../reducers/campusesReducer';
import StudentsList from './StudentsList';
import ConnectedUpdateCampus from './UpdateCampus';

const mapStateToProps = state => {
  return {
    campus: state.campusesReducer.campus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    thunkToGetACampusCreator: campusId =>
      dispatch(thunkToGetACampusCreator(campusId)),
  };
};

class SingleCampus extends React.Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.thunkToGetACampusCreator(this.props.match.params.campusId);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ isClicked: true });
  }

  render() {
    const { campus } = this.props;

    return campus !== undefined ? (
      this.state.isClicked === false ? (
        <div id="aCampus">
          <div className="aCampusInfo">
            <img className="imageLarge" src={campus.imageUrl} />
            <h2>{campus.name}</h2>
            <span>{campus.address}</span>
            <hr />
            <p>{campus.description}</p>
          </div>

          <div className="aCampusInfoExtra">
            <div id="aCampusInfoStudents">
              <div>
                <StudentsList students={campus.students} />
              </div>

              <div className="aCampusInfoButtons">
                <button
                  id="update"
                  type="submit"
                  name="updateCampus"
                  onClick={this.handleClick}
                >
                  Update This Campus
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ConnectedUpdateCampus campus={campus} />
      )
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
