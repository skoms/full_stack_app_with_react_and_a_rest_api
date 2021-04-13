import './styles/reset.css';
import './styles/global.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/api/courses" component={Courses} />
          <Route path="/api/courses/:id" component={CourseDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
