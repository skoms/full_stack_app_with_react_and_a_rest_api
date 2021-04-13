import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: ''
    }
  }
  render() {
    return (
      <div className="form--centered">
          <h2>Sign In</h2>
          <form>
              <label htmlFor="emailAddress">Email Address</label>
              <input id="emailAddress" onChange={this.change} name="emailAddress" type="email" value={this.state.emailAddress} />
              <label htmlFor="password">Password</label>
              <input id="password" name="password" onChange={this.change} type="password" value={this.state.password} />
              <button className="button" type="submit" onSubmit={this.submit}>Sign In</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button>
          </form>
          <p>Don't have a user account? Click here to <Link href="/sign-up">sign up</Link>!</p>
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