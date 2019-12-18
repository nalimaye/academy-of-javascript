import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  thunkToGetCampusesCreator,
  thunkToDeleteACampusCreator,
} from '../reducers/campusesReducer';
import { List } from './utils';
import ConnectedNewCampus from './NewCampus';

const mapStateToProps = state => {
  return { campuses: state.campusesReducer.campuses };
};

const mapDispatchToProps = dispatch => {
  return {
    thunkToGetCampusesCreator: () => dispatch(thunkToGetCampusesCreator()),
    thunkToDeleteACampusCreator: campusToDeleteId =>
      dispatch(thunkToDeleteACampusCreator(campusToDeleteId)),
  };
};

class AllCampuses extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    await this.props.thunkToGetCampusesCreator();
  }

  async handleDelete(campusId) {
    await this.props.thunkToDeleteACampusCreator(campusId);
    await this.props.thunkToGetCampusesCreator();
    this.setState();
  }

  render() {
    const { campuses } = this.props;

    return (
      <div id="allListing">
        <h2>Our Campuses</h2>
        <div id="list">
          <List
            forEachOfThese={campuses}
            doThis={campus => {
              return (
                <div id="list-item-campus" key={campus.id}>
                  <div className="list-item-campus-image">
                    <Link to={`/campuses/${campus.id}`}>
                      <img className="imageBig" src={campus.imageUrl} />
                    </Link>
                  </div>

                  <div className="list-item-campus-info">
                    <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                    {campus.students !== undefined ? (
                      <p>
                        {campus.students.length === 0
                          ? 'No'
                          : campus.students.length}{' '}
                        {campus.students.length === 1 ? 'student' : 'students'}
                      </p>
                    ) : (
                      <p>No students</p>
                    )}
                    <button
                      id="delete"
                      type="button"
                      name="deleteCampus"
                      onClick={() => this.handleDelete(campus.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            }}
            unlessEmpty={() => (
              <div>
                <p>
                  Currently, there are no campuses registered in the database.
                </p>
              </div>
            )}
          />
        </div>
        <hr />
        <div id="add-new-campus">
          <ConnectedNewCampus />
        </div>
      </div>
    );
  }
}

const ConnectedAllCampuses = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCampuses);

export default ConnectedAllCampuses;
