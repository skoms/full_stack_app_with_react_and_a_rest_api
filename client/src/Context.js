import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext(); 

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
      },
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }
  
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user !== null) {
      this.setState({ authenticatedUser: user });
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        { context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
