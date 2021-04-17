import React, { useState, useEffect } from 'react'

const UnhandledError = () => {
  const [didLoad, setDidLoad] = useState(false);
  useEffect(() => {
    if (!didLoad) {
      document.title = "Error";
      setDidLoad(true);
    }
  }, [didLoad]);
  return (
    <div className="error-container">
      <h1>Error</h1>
      <p>Sorry! We just encountered an unexpected error.</p>
      <iframe src="https://giphy.com/embed/uN5iwZB2v2dH2" title="Confused-Error" width="320" height="180" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
      <p>Please try to go back and try again.</p>
      <p>If you're still experiencing errors, please <a href="mailto:phony.email@notreal.no?subject=Feedback">contact us</a>.</p>
    </div>
  )
}

export default UnhandledError
