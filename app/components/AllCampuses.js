import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkToGetCampusesCreator } from '../reducers/campusesReducer';
import { List } from './utils';
import ConnectedNewCampus from './NewCampus';

const mapStateToProps = state => {
  return { campuses: state.campusesReducer.campuses };
};

const mapDispatchToProps = dispatch => {
  return {
    thunkToGetCampusesCreator: () => dispatch(thunkToGetCampusesCreator()),
  };
};

class AllCampuses extends React.Component {
  componentDidMount() {
    this.props.thunkToGetCampusesCreator();
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
                  <Link to={`/campuses/${campus.id}`}>
                    <p>{campus.name}</p>
                    <img className="imageBig" src={campus.imageUrl} />
                  </Link>
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
