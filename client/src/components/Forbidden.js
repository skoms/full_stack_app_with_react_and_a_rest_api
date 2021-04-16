import { useState, useEffect } from 'react'

const Forbidden = () => {
  const [didLoad, setDidLoad] = useState(false);
  useEffect(() => {
    if (!didLoad) {
      document.title = "Course Detail";
      setDidLoad(true);
    }
  }, [didLoad]);
  return (
    <div className="error-container">
      <iframe title="shall-not-pass" src="https://giphy.com/embed/xTiTnhnS1kQKfgpAHK" width="480" height="197" frameBorder="0"></iframe>
      <h1>Forbidden</h1>
      <p>Oh-oh! It appears your access-level wont let you pass to this page.</p>
    </div>
  )
}

export default Forbidden
