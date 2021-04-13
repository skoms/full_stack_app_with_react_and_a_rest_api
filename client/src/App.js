import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';


function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/api/courses" />} />
          <Route exact path="/api" render={() => <Redirect to="/api/courses" />} /> 
          <Route exact path="/api/courses" component={Courses} />
          <Route path="/api/courses/:id" component={CourseDetail} />
          <Route path="/sign-in" component={UserSignIn} />
          <Route path="/sign-up" component={UserSignUp} />
          <Route path="/create-course" component={CreateCourse} />
          <Route path="/update-course/:id" component={UpdateCourse} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
