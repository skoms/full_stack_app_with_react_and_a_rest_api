import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context';

export default function UserSignUp(props) {
  const context = useContext(Context);
  const history = useHistory();
  const [ firstName, setFirstName ] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const submit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const user = {
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        password: password
      }
      await context.actions.signUp(user)
        .then( status => {
          if (status === 201) {
            console.log('New user created and logged in');
            history.push('/api/courses');
          } else {
            console.log('Login Failed, Makes sure to fill in all the blanks!');
            console.dir(status);
            history.push('/sign-up');
          }
        })
        .catch(err => {
            console.log(err);
            history.push('/error');
        });
    } else {
      
    }
  }

  const cancel = (e) => {
    e.preventDefault();
    history.push('/api/courses');
  }

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      
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
      <p>Already have a user account? Click here to <Link to="/sign-in">sign in</Link>!</p>
    </div>
  );
}