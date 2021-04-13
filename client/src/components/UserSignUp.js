import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: ''
    }
  }

  render() {
    return (
      <div className="form--centered">
        <h2>Sign Up</h2>
        
        <form>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" onChange={this.change} value={this.state.firstName}/>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" onChange={this.change} value={this.state.lastName}/>
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" onChange={this.change} value={this.state.emailAddress}/>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" onChange={this.change} value={this.state.password}/>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" onChange={this.change} value={this.state.confirmPassword}/>
          <button className="button" type="submit" onSubmit={this.submit}>Sign Up</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button>
        </form>
        <p>Already have a user account? Click here to <Link href="/sign-in">sign in</Link>!</p>
      </div>
    );
  }

  change = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  submit = () => {

  }

  cancel = (e) => {
    e.preventDefault();
    this.props.history.push('/api/courses');
  }
}