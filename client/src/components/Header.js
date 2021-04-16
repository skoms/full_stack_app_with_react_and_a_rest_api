import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../Context';

export default function Header(props) {
  const context = useContext(Context);
  const location = useLocation();
  const authUser = context.authenticatedUser || null;
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo"><a href="/">Courses</a></h1>
        <nav>
            {!authUser // Checks if logged in and loads accordingly
            ?
              <ul className="header--signedout">
                <li><Link to={{ pathname: "/signup", state: { from: location }}}>Sign Up</Link></li> {/* Saves the current location when clicking the signin/signup button */}
                <li><Link to={{ pathname: "/signin", state: { from: location }}}>Sign In</Link></li> 
              </ul>
            :
              <ul className="header--signedout">
                <li><p style={{ marginBottom: 0}}>Hello, {context.actions.capitalize(`${authUser.firstName} ${authUser.lastName}`)}</p></li>
                <li><a href="/signout">Sign Out</a></li>
              </ul>
            }
        </nav>
      </div>
    </header>
  );
}
