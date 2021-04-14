import { useContext, useState } from 'react'; 
import { useHistory } from 'react-router';
import { Context } from '../Context';

export default function CreateCourse(props) {
  const context = useContext(Context);
  const history = useHistory();
  const [ courseTitle, setCourseTitle ] = useState('');
  const [ courseAuthor, setCourseAuthor ] = useState('');
  const [ courseDescription, setCourseDescription ] = useState('');
  const [ estimatedTime, setEstimatedTime ] = useState('');
  const [ materialsNeeded, setMaterialsNeeded ] = useState('');

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

  const submit = async (e) => {
    e.preventDefault();
    const newCourse = {
      title: courseTitle,
      description: courseDescription,
      estimatedTime: estimatedTime,
      materialsNeeded: materialsNeeded
    }
    console.log(newCourse);
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

    await context.data.createCourse(newCourse, user)
      .then( status => {
        if (status === 201) {
          console.log(`${newCourse.courseTitle} was successfully updated!`);
          history.push(`/api/courses/`);
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
              <h2>Create Course</h2>
              <div className="validation--errors">
                  <h3>Validation Errors</h3>
                  <ul>
                      <li>Please provide a value for "Title"</li>
                      <li>Please provide a value for "Description"</li>
                  </ul>
              </div>
              <form onSubmit={submit}>
                  <div className="main--flex">
                      <div>
                          <label htmlFor="courseTitle">Course Title</label>
                          <input id="courseTitle" name="courseTitle" type="text" value={courseTitle} onChange={change}/>

                          <label htmlFor="courseAuthor">Course Author</label>
                          <input id="courseAuthor" name="courseAuthor" type="text" value={courseAuthor} onChange={change}/>

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