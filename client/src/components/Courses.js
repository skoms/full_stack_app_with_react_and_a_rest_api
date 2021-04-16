import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Context } from '../Context';

export default function Courses (props) {
  const history = useHistory();
  const context = useContext(Context);
  const [ courses, setCourses ] = useState([]);
  const [ didLoad, setDidLoad ] = useState(false);

  useEffect(()=>{
    // Gets the courses, check '/src/Data.js/' for 'context.data.getCourses()'
    const getCourses = async () => {
      await context.data.getCourses()
        .then(response => {
          
          switch (response.status) {
            case 200:
              setCourses(response.courses);
              break;

            case 500:
              history.push('/error');
              break;
         
            default:
              break;
          }
        });
    }

    if (!didLoad){
      document.title = "Courses";
      getCourses();
      setDidLoad(true);
    }
  },[context.data, didLoad, history]);

  return (
    <div className="wrap main--grid">
      { courses.map(course => 
        <a className="course--module course--link" href={`/courses/${course.id}`} key={course.id}>
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </a>
      )}
      <a className="course--module course--add--module" href="/courses/create">
        <span className="course--add--title">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
          New Course
        </span>
      </a>
    </div>
  );
}