import React from 'react';
import { Link } from 'react-router-dom';
import { List } from './utils';

const StudentsList = props => {
  const students = props.students || [];
  return (
    <div>
      <h4>Students enrolled at this campus</h4>
      <List
        forEachOfThese={students}
        doThis={student => {
          return (
            <div key={student.id}>
              <Link to={`/students/${student.id}`}>
                <p>{student.fullName}</p>
              </Link>
            </div>
          );
        }}
        unlessEmpty={() => (
          <div>
            <p>Currently, there are no students registered at this campus.</p>
          </div>
        )}
      />
    </div>
  );
};

export default StudentsList;
