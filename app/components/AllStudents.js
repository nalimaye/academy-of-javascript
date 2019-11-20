import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkToGetStudentsCreator } from '../reducers/studentsReducer';
import { List } from './utils';
import ConnectedNewStudent from './NewStudent';

const mapStateToProps = state => {
  return { students: state.studentsReducer.students };
};

const mapDispatchToProps = dispatch => {
  return {
    thunkToGetStudentsCreator: () => dispatch(thunkToGetStudentsCreator()),
  };
};

class AllStudents extends React.Component {
  componentDidMount() {
    this.props.thunkToGetStudentsCreator();
  }

  render() {
    const { students } = this.props;

    return (
      <div id="allListing">
        <h2>Our Students</h2>
        <div id="list">
          <List
            forEachOfThese={students}
            doThis={student => {
              return (
                <div id="list-item-student" key={student.id}>
                  <Link to={`/students/${student.id}`}>
                    <img className="imageSmall" src={student.imageUrl} />
                    <p>{student.fullName}</p>
                  </Link>
                </div>
              );
            }}
            unlessEmpty={() => (
              <div>
                <p>
                  Currently, there are no students registered in the database.
                </p>
              </div>
            )}
          />
        </div>
        <hr />
        <div id="add-new-student">
          <ConnectedNewStudent />
        </div>
      </div>
    );
  }
}

const ConnectedAllStudents = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllStudents);

export default ConnectedAllStudents;
