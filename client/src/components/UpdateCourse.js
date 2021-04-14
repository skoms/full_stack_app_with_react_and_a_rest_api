import { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import { useParams, useHistory } from 'react-router-dom';


export default function UpdateCourse(props) {
  const history = useHistory();
  const context = useContext(Context);
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
      await context.data.getCourse(id)
      .then(response => setCourse(response))
      .catch(err => console.error(err));
    }

    if (!didLoad) {
      getCourse();
      setDidLoad(true);
    }
  }, [context.data, didLoad, id]);

  useEffect(() => {
    setCourseTitle(course.title);
    setCourseAuthor(course.User ? `${course.User.firstName} ${course.User.lastName}` : 'Loading...');
    setCourseDescription(course.description);
    setEstimatedTime(course.estimatedTime);
    setMaterialsNeeded(course.materialsNeeded);
  }, [course]);

  const change = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'courseTitle':
        setCourseTitle(value);
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

  const submit = async (e) => {
    e.preventDefault();
    const updatedCourse = {
      title: courseTitle,
      description: courseDescription,
      estimatedTime: estimatedTime,
      materialsNeeded: materialsNeeded
    }
    console.log(updatedCourse);
    let user;
    if (context.authenticatedUser) {
      const { emailAddress, password } = context.authenticatedUser;
      user = {
        username: emailAddress,
        password: password
      }
    } else {
      user = {
        username: '',
        password: ''
      };
    }
    
    await context.data.updateCourse(updatedCourse, id, user)
      .then( status => {
        if (status === 204) {
          console.log(`${updatedCourse.courseTitle} was successfully updated!`);
          history.push(`/api/courses/${id}`);
        } else {
          console.log('Update Failed, Makes sure to fill in all the required blanks!');
          console.dir(status);
        }
      })
      .catch(err => {
          console.log(err.message);
          history.push('/error');
      });
  }

  const cancel = (e) => {
    e.preventDefault();
    history.push('/api/courses');
  }

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <form onSubmit={submit}>
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