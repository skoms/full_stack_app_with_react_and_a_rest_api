import { useContext, useState, useEffect } from 'react'; 
import { useHistory } from 'react-router';
import { Context } from '../Context';

export default function CreateCourse() {
  const context = useContext(Context);
  const history = useHistory();
  const [ didLoad, setDidLoad ] = useState(false);
  const [ courseTitle, setCourseTitle ] = useState('');
  const [ courseDescription, setCourseDescription ] = useState('');
  const [ estimatedTime, setEstimatedTime ] = useState('');
  const [ materialsNeeded, setMaterialsNeeded ] = useState('');
  const [validationErrors, setValidationErrors] = useState(null);

  const authUser = context.authenticatedUser;
  const courseAuthor = `${authUser.firstName} ${authUser.lastName}`;

  useEffect(() => {
    if (!didLoad) {
      document.title = 'Create Course';
      setDidLoad(true);
    }
  }, [didLoad]);

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
    const newCourse = {
      title: courseTitle,
      description: courseDescription,
      estimatedTime: estimatedTime,
      materialsNeeded: materialsNeeded
    }
    console.log(newCourse);
    let user = context.authenticatedUser;

    await context.data.createCourse(newCourse, user)
      .then( response => {
        
        switch (response.status) {
          case 201:
            history.push(`/courses/`);
            break;

          case 400:
            setValidationErrors(response.errors);
            break;

          case 500:
            history.push('/error');
            break;
                    
          default:
            break;
        }
      })
      .catch(err => {
          console.log(err.message);
          history.push('/error');
      });
  }

  const cancel = (e) => {
    e.preventDefault();
    history.push('/courses');
  }

  return (
    <div className="wrap">
              <h2>Create Course</h2>
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
                  <div className="main--flex">
                      <div>
                          <label htmlFor="courseTitle">Course Title</label>
                          <input id="courseTitle" name="courseTitle" type="text" value={courseTitle} onChange={change}/>

                          <label htmlFor="courseAuthor">Course Author</label>
                          <input id="courseAuthor" name="courseAuthor" type="text" value={courseAuthor}  onChange={change}/>

                          <label htmlFor="courseDescription">Course Description</label>
                          <textarea onChange={change} value={courseDescription} id="courseDescription" name="courseDescription"></textarea>
                      </div>
                      <div>
                          <label htmlFor="estimatedTime">Estimated Time</label>
                          <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={change}/>

                          <label htmlFor="materialsNeeded">Materials Needed</label>
                          <textarea onChange={change} value={materialsNeeded} id="materialsNeeded" name="materialsNeeded"></textarea>
                      </div>
                  </div>
                  <button className="button" type="submit" onSubmit={submit}>Create Course</button><button className="button button-secondary" onClick={cancel}>Cancel</button>
              </form>
          </div>
  );
}