import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ConnectedAllCampuses from './AllCampuses';
import ConnectedAllStudents from './AllStudents';
import ConnectedSingleCampus from './SingleCampus';
import ConnectedSingleStudent from './SingleStudent';
import PageNotFound from './PageNotFound';
import HomePage from './HomePage';

const Root = () => {
  return (
    <div>
      <nav>
        <div className="nav-item">
          <Link to="/">Home</Link>
        </div>
        <div className="nav-item">
          <Link to="/campuses">Campuses</Link>
        </div>
        <div className="nav-item">
          <Link to="/students">Students</Link>
        </div>
      </nav>
      <main>
        <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/campuses" component={ConnectedAllCampuses} />
          <Route path="/campuses/:campusId" component={ConnectedSingleCampus} />
          <Route exact path="/students" component={ConnectedAllStudents} />
          <Route
            path="/students/:studentId"
            component={ConnectedSingleStudent}
          />
          <Route component={PageNotFound} />
        </Switch>
      </main>
    </div>
  );
};

export default Root;
