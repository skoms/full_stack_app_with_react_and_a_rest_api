import { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import { useParams, useHistory } from 'react-router-dom';


export default function UpdateCourse(props) {
  const history = useHistory();
  const context = useContext(Context);
  const [ course, setCourse ] = useState({});
  const { id } = useParams();
  const [ didLoad, setDidLoad ] = useState(false);
  const authUser = context.authenticatedUser;

  const [ courseTitle, setCourseTitle ] = useState('');
  const [ courseAuthor, setCourseAuthor ] = useState('');
  const [ courseDescription, setCourseDescription ] = useState('');
  const [ estimatedTime, setEstimatedTime ] = useState('');
  const [ materialsNeeded, setMaterialsNeeded ] = useState('');
  const [validationErrors, setValidationErrors] = useState(null);

  useEffect(() => {
    // Gets the course matching the '/:id/', check '/src/Data.js/' for 'context.data.getCourse(id)'
    const getCourse = async () => {
      await context.data.getCourse(id)
        .then(response => {
          switch (response.status) {
            case 200:
              if (response.course.User.emailAddress !== authUser.emailAddress) { // Makes sure user is authorized before loading page
                history.push('/forbidden');
              } else {
                setCourse(response.course);
              }
              break;

            case 404:
              history.push('/notfound');
              break;

            case 500:
              history.push('/error');
              break;
                      
            default:
              break;
          }
        })
        .catch(err => {
          history.push('/error');
        });
    }

    if (!didLoad) {
      getCourse();
      setDidLoad(true);
    }
  }, [authUser.emailAddress, context.data, didLoad, history, id]);

  useEffect(() => {
    setCourseTitle(course.title);
    setCourseAuthor(course.User ? `${course.User.firstName} ${course.User.lastName}` : 'Loading...');
    setCourseDescription(course.description);
    setEstimatedTime(course.estimatedTime);
    setMaterialsNeeded(course.materialsNeeded);
  }, [didLoad, course]);

  useEffect(() => {
    document.title = `Update: ${courseTitle}`;
  })

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
    const { emailAddress, password } = context.authenticatedUser;
    const user = {
      emailAddress: emailAddress,
      password: password
    }
    // updates the course matching the '/:id/', check '/src/Data.js/' for 'context.data.updateCourse(updatedCourse, id, user)'
    await context.data.updateCourse(updatedCourse, id, user)
      .then( response => {
        switch (response.status) {
          case 204:
            history.push(`/courses/${id}`);
            break;

          case 400:
            setValidationErrors(response.errors);
            break;

          case 403:
            history.push('/forbidden');
            break;
            
          case 500:
            history.push('/error');
            break;
                    
          default:
            break;
        }
      })
      .catch(err => {
          history.push('/error');
      });
  }

  const cancel = (e) => {
    e.preventDefault();
    history.push('/courses');
  }

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      { validationErrors 
        ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
                {
                  validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                  ))
                }
            </ul>
          </div>
        ):(
          <>
          </>
        )
      }
      <form onSubmit={submit}>
        {course.User
        ?
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" value={courseTitle || ''} onChange={change} />

              <label htmlFor="courseAuthor">Course Author</label>
              <input id="courseAuthor" name="courseAuthor" type="text" value={courseAuthor || ''} onChange={change} />

              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription" onChange={change} value={courseDescription || ''}></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime || ''} onChange={change} />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded" onChange={change} value={materialsNeeded || ''}></textarea>
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