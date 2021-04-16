import { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import { useHistory, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function CourseDetail(props) {
  const history = useHistory();
  const context = useContext(Context);
  const [ course, setCourse ] = useState({});
  const { id } = useParams();
  const [ didLoad, setDidLoad ] = useState(false);

  const deleteCourse = async () => {
    await context.data.deleteCourse(id)
              .then(response => {
                response.status !== 204 && history.push('/error'); 
              })
              .catch(err => console.error(err));
  }

  useEffect(() => {
    const getCourse = async () => {
      await context.data.getCourse(id)
      .then(response => {
        
        switch (response.status) {
          case 200:
            setCourse(response.course);
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
      .catch(err => console.log(err));
    }

    if (!didLoad) {
      getCourse();
      setDidLoad(true);
    }

  }, [context.data, didLoad, history, id]);

  return (
    <>
          
          {course.User 
            ? 
            (
              <>
              <div className="actions--bar">
                  <div className="wrap">
                    { context.authenticatedUser && 
                      course.userId === context.authenticatedUser.id 
                    ? (
                      <>
                        <a className="button" href={`/courses/${id}/update`}>Update Course</a>
                        <a className="button" href="/courses" onClick={deleteCourse}>Delete Course</a>
                      </>
                    ):(
                      <></>
                    )
                    }
                    <a className="button button-secondary" href="/">Return to List</a>
                  </div>
              </div>
              <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {context.actions.capitalize(`${course.User.firstName} ${course.User.lastName}`)}</p>

                            {course.description
                            ?
                              <ReactMarkdown>{course.description}</ReactMarkdown>
                            :
                              <p>Loading...</p>
                            }

                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                              {course.materialsNeeded
                              ?
                                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                              :
                                <li>Loading...</li>
                              }
                            </ul>
                        </div>
                    </div>
                </form>
              </div>
              </>
            ) 
            : 
              "Loading..."
          }
      </>
  );
  
}
