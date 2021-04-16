import { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Context } from '../Context';

export default function UserSignUp(props) {
  const location = useLocation();
  const context = useContext(Context);
  const history = useHistory();
  const [ firstName, setFirstName ] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState(null);

  const [didLoad, setDidLoad] = useState(false);
  useEffect(() => {
    if (!didLoad) {
      document.title = "Sign Up";
      setDidLoad(true);
    }
  }, [didLoad]);

  const change = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'emailAddress':
        setEmailAddress(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  }

  const passwordIsConfirmed = () => { // Confirms that the password and confirmation matches, and sets errors accordingly
    if (password !== confirmPassword) {
      const errorMsg = 'Please make sure that the "Password" and "Confirm Password" matches';
      if (validationErrors !== null) {
        const errorNotFound = validationErrors.find(error => error === errorMsg) === undefined;
        if (errorNotFound) {
          setValidationErrors(prev => [...prev, errorMsg]);
        }
      } else {
        setValidationErrors([errorMsg]);
      }
      return false;
    } else {
      return true;
    }
  }

  const submit = async (e) => {
    e.preventDefault();
    const user = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      password: password
    }
    if (passwordIsConfirmed()) {
      const { from } = location.state || { from: { pathname: '/courses' } };
      // Signs Up the user with info given if valid, check '/src/Context.js/' for 'context.actions.signUp(user)'
      await context.actions.signUp(user)
        .then( response => {
          
          switch (response.status) {
            case 201:
              history.push(from);
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
            history.push('/error');
        });
    }
  }

  const cancel = (e) => {
    e.preventDefault();
    history.push('/courses');
  }

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
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
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" onChange={change} value={firstName}/>
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" onChange={change} value={lastName}/>
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" onChange={change} value={emailAddress}/>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" onChange={change} value={password}/>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" onChange={change} value={confirmPassword}/>
        <button className="button" type="submit" onSubmit={submit}>Sign Up</button><button className="button button-secondary" onClick={cancel}>Cancel</button>
      </form>
      <p>Already have a user account? Click here to <Link to={{ pathname: "/signin", state: { from: location }}}>sign in</Link>!</p>
    </div>
  );
}