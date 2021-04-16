import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Provider } from './Context';
import PrivateRoute from './PrivateRoute';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';


function App() {
  return (
    <Provider>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/courses" />} /> 
            <PrivateRoute exact path="/courses/create" component={CreateCourse} />
            <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/courses/:id" component={CourseDetail} />
            <Route exact path="/signin" component={UserSignIn} />
            <Route exact path="/signup" component={UserSignUp} />
            <Route exact path="/signout" component={UserSignOut} />
            <Route exact path="/forbidden" component={Forbidden} />
            <Route exact path="/error" component={UnhandledError} />
            <Route exact path="/notfound" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
