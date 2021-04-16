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
      <p>Please try to go back and try again.</p>
      <p>If you're still experiencing errors, please <a href="mailto:phony.email@notreal.no?subject=Feedback">contact us</a>.</p>
    </div>
  )
}

export default UnhandledError
