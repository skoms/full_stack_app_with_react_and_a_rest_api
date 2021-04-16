import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Context } from '../Context';

export default function UserSignIn(props) {
  const location = useLocation();
  const context = useContext(Context);
  const [ emailAddress, setEmailAddress ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loginFailed, setLoginFailed ] = useState(false);
  const history = useHistory();

  const [didLoad, setDidLoad] = useState(false);
  useEffect(() => {
    if (!didLoad) {
      document.title = "Sign In";
      setDidLoad(true);
    }
  }, [didLoad]);

  const change = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'emailAddress':
        setEmailAddress(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        break;
    }
  }

  const submit = async (e) => {
    e.preventDefault();
    const { from } = location.state || { from: { pathname: '/courses' } }; // gets the saved location before signin
    // Signs in the user if credentials match, check '/src/Context.js/' for 'context.actions.signIn(emailAddress, password)'
    await context.actions.signIn(emailAddress, password)
      .then( response => {
        
        switch (response.status) {
          case 200:
            history.push(from);
            break;

          case 401:
            setLoginFailed(true);
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
    <div className="form--centered">
        <h2>Sign In</h2>
        { loginFailed 
        ? (
          <div className="validation--errors">
            <h3>Login Failed</h3>
            <p style={{marginBottom: 0}}>Password and/or Email Address was wrong, Please try again</p>
          </div>
        ):(
          <>
          </>
        )
        }
        <form onSubmit={submit}>
            <label htmlFor="emailAddress">Email Address</label>
            <input id="emailAddress" onChange={change} name="emailAddress" type="email" value={emailAddress} />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" onChange={change} type="password" value={password} />
            <button className="button" type="submit" onSubmit={submit}>Sign In</button><button className="button button-secondary" onClick={cancel}>Cancel</button>
        </form>
        <p>Don't have a user account? Click here to <Link to={{ pathname: "/signup", state: { from: location }}}>sign up</Link>!</p>
    </div>
  );
}