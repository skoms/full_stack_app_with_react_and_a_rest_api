import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';


export default function UpdateCourse(props) {
  let history = useHistory();
  const [ course, setCourse ] = useState({});
  const { id } = useParams();
  const [ didLoad, setDidLoad ] = useState(false);

  const [ courseTitle, setCourseTitle ] = useState('');
  const [ courseAuthor, setCourseAuthor ] = useState('');
  const [ courseDescription, setCourseDescription ] = useState('');
  const [ estimatedTime, setEstimatedTime ] = useState('');
  const [ materialsNeeded, setMaterialsNeeded ] = useState('');

  useEffect(() => {
    const getCourse = async () => {
      await axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => setCourse(response.data))
      .catch(err => console.error(err));
    }

    if (!didLoad) {
      getCourse();
      setDidLoad(true);
    }
  }, [didLoad, id]);

  const change = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'courseTitle':
        setCourseTitle(value);
        break;
      case 'courseAuthor':
        setCourseAuthor(value);
        break;
      case 'courseDescription':
        setCourseDescription(value);
        break;
      case 'estimatedTime':
        setEstimatedTime(value);
        break;
      case 'materialsNeeded':
        setMaterialsNeeded(value);
        break;
      default:
        break;
    }
  }

  const submit = () => {

  }

  const cancel = (e) => {
    e.preventDefault();
    history.push('/api/courses');
  }

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <form>
        {course.User
        ?
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" value={courseTitle || course.title} onChange={change} />

              <label htmlFor="courseAuthor">Course Author</label>
              <input id="courseAuthor" name="courseAuthor" type="text" value={courseAuthor || `${course.User.firstName} ${course.User.lastName}`} onChange={change} />

              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" onChange={change} value={courseDescription || course.description}></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime || course.estimatedTime} onChange={change} />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" onChange={change} value={materialsNeeded || course.materialsNeeded}></textarea>
            </div>
        </div>
        :
          <p>Loading...</p>
        }
        <button className="button" type="submit" onSubmit={submit}>Update Course</button><button className="button button-secondary" onClick={cancel}>Cancel</button>
      </form>
    </div>
  );
}