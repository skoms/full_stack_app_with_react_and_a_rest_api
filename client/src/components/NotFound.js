import React, { useEffect, useState } from 'react'
import NotFoundPic from '../images/NotFoundPants.png';

const NotFound = () => {
  const [didLoad, setDidLoad] = useState(false);
  useEffect(() => {
    if (!didLoad) {
      document.title = "404: Not Found";
      setDidLoad(true);
    }
  }, [didLoad]);
  return (
    <div className="error-container">
      <img src={NotFoundPic} alt="404 figure"/>
      <h1>Not Found</h1>
      <h1>You've caught us with our pants down!</h1>

      <p>Well, this is embarrassing. We can't find the page you are looking for. <strong>Bad link? Mistyped address?</strong> We're not sure.</p>

      <p>Perhaps, try to navigate through <a href="/courses">the Courses list</a>. If you think something's wrong, <a href="mailto:phony.email@notreal.no?subject=Feedback">contact us</a>.</p>

      <p>Now if you'll just turn around for a moment, we'll be putting our pants back on...</p>
    </div>
  )
}

export default NotFound
