import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
const axios = require('axios')

function App() {
  const [ courses, setCourses ] = useState([]);

  const getCourses = (async () => {
    const response = await axios('http://localhost:5000/api/courses');
    console.log(response.data);
    setCourses(response.data);
  } )

  useEffect(() => {
    getCourses();
  }, []);

  let results;
  if (courses.length) {
    results = courses.map( course => 
      <li key={course.id}>{course.title}</li>
    );
  } else {
    console.log('Error: ' + courses);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          { results }
        </ul>
      </header>
    </div>
  );
}

export default App;
