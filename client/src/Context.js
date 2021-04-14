import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

export const Context = React.createContext(); 

export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data();
    this.state = {
      authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    };
  }

  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: { 
        signIn: this.signIn,
        signOut: this.signOut,
        signUp: this.signUp,
      },
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  signUp = async (user) => {
    const newUser = await this.data.createUser(user);
    if (newUser.length === 0) {
      const savedUser = await this.data.getUser(user.emailAddress, user.password);
      if (savedUser) {
        this.setState({ authenticatedUser: user });
        Cookies.set('authenticatedUser', JSON.stringify(user));
        return 201;
      } else {
        throw new Error();
      }
    } else if (newUser.length > 0) {
      return newUser;
    } else {
      throw new Error();
    }
  }
  
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user !== null) {
      user.password = password;
      this.setState({ authenticatedUser: user });
      Cookies.set('authenticatedUser', JSON.stringify(user));
    }
    return 200;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}


