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

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}


