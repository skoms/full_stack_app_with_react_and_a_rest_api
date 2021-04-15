import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';

export default function UserSignIn(props) {
  const context = useContext(Context);
  const [ emailAddress, setEmailAddress ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loginFailed, setLoginFailed ] = useState(false);
  const history = useHistory();

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
    const { from } = props.location.state || { from: { pathname: '/courses' } };
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
          console.log(err);
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
        <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
    </div>
  );
}