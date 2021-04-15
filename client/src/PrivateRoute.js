import { useContext } from 'react';
import { Route, Redirect } from 'react-router';
import { Context } from './Context';

export default function PrivateRoute({ component: Component, ...rest }) {
  const context = useContext(Context);
  const user = context.authenticatedUser;
  return (
    <Route
      {...rest}
      render={ props => user ? <Component {...props} /> : 
        (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}