import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function CourseDetail(props) {
  const [ course, setCourse ] = useState({});
  const { id } = useParams();
  const [ didLoad, setDidLoad ] = useState(false);

  const getMaterials = () => {
    let materials = course.materialsNeeded.split('*');
    if (!materials[0]) {
      materials.shift();
    }
    
    return materials.map( (material, index)=> {
        return <li key={index}>{material}</li>
    });
  }

  const getInstructions = () => {
    let instructions = course.description.split('\n\n');
    return instructions.map( (instruction, index)=> {
      return (<p key={index} className="instruction">{instruction}</p>)
    });
  }

  const deleteCourse = async () => {
    await axios.delete(`http://localhost:5000/api/courses/${id}`)
              .catch(err => console.error(err));
  }

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

  return (
    <>
          <div className="actions--bar">
              <div className="wrap">
                  <a className="button" href={`/update-course/${id}`}>Update Course</a>
                  <a className="button" href="/api/courses" onClick={deleteCourse}>Delete Course</a>
                  <a className="button button-secondary" href="/">Return to List</a>
              </div>
          </div>
          {course.User 
            ? 
            (
              <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {`${course.User.firstName} ${course.User.lastName}`}</p>

                            {course.description
                            ?
                              getInstructions()
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
                                getMaterials()
                              :
                                <li>Loading...</li>
                              }
                            </ul>
                        </div>
                    </div>
                </form>
              </div>
            ) 
            : 
              "Loading..."
          }
      </>
  );
  
}
