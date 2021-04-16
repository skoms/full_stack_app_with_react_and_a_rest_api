import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

// Creates Context
export const Context = React.createContext(); 

// Declare provider
export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data(); // Imports functions made for managing api calls, check '/src/Data.js'
    this.state = {
      authenticatedUser: Cookies.getJSON('authenticatedUser') || null, // Sets the 'authenticatedUser' if theres a cookie, or 'null' if not
    };
  }

  render() {
    const { authenticatedUser } = this.state;

    // Set value to be provided down to consumers
    const value = {
      authenticatedUser,
      data: this.data,
      actions: { 
        signIn: this.signIn,
        signOut: this.signOut,
        signUp: this.signUp,
        capitalize: this.capitalize,
      },
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  // Capitalizes either first word or all words (Used as 'user' info is stored in lowercase for consistency)
  capitalize = (string, firstOnly = false) => {
    let strArray = string.split(' ');
    if (strArray.length <= 1 || firstOnly) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      strArray = strArray.map( str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      });
      return strArray.join(' ');
    }
  }

  // Signs up (and if successful, signs in) the user, and sets cookie and global variable for authenticated user
  signUp = async (user) => {
    const createResponse = await this.data.createUser(user);
    if (createResponse.status === 201) {
      const getResponse = await this.data.getUser(user.emailAddress, user.password);
      if (getResponse.status === 200) {
        this.setState({ authenticatedUser: user });
        Cookies.set('authenticatedUser', JSON.stringify(user));
        return createResponse;
      } else {
        throw new Error();
      }
    } else if (createResponse.status === 400) {
      return createResponse;
    } else {
      throw new Error();
    }
  }
  
  // Signs in the user, and sets cookie and global variable for authenticated user
  signIn = async (emailAddress, password) => {
    const response = await this.data.getUser(emailAddress, password);
    if (response.status === 200) {
      const { user } = response;
      user.password = password;
      this.setState({ authenticatedUser: user });
      Cookies.set('authenticatedUser', JSON.stringify(user));
    } 
    return response;
  }

  // Signs out the user, and removes cookie and set global variable to 'null' for authenticated user
  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}


