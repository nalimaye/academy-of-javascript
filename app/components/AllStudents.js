import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  thunkToGetStudentsCreator,
  thunkToDeleteAStudentCreator,
} from '../reducers/studentsReducer';
import { List } from './utils';
import ConnectedNewStudent from './NewStudent';

const mapStateToProps = state => {
  return { students: state.studentsReducer.students };
};

const mapDispatchToProps = dispatch => {
  return {
    thunkToGetStudentsCreator: () => dispatch(thunkToGetStudentsCreator()),
    thunkToDeleteAStudentCreator: studentToDelete =>
      dispatch(thunkToDeleteAStudentCreator(studentToDelete)),
  };
};

class AllStudents extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    await this.props.thunkToGetStudentsCreator();
  }

  async handleDelete(studentId) {
    await this.props.thunkToDeleteAStudentCreator(studentId);
    await this.props.thunkToGetStudentsCreator();
    this.setState();
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
                  <div className="list-item-student-image">
                    <Link to={`/students/${student.id}`}>
                      <img className="imageSmall" src={student.imageUrl} />
                    </Link>
                  </div>

                  <div className="list-item-student-info">
                    <Link to={`/students/${student.id}`}>
                      {student.fullName}
                    </Link>
                    {student.campus !== null ? (
                      <p>
                        {'@ '}
                        <Link to={`/campuses/${student.campus.id}`}>
                          {student.campus.name}
                        </Link>
                      </p>
                    ) : (
                      <p> </p>
                    )}
                    <button
                      id="delete"
                      type="button"
                      name="deleteStudent"
                      onClick={() => this.handleDelete(student.id)}
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
