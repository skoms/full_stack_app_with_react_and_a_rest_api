import { useContext } from 'react';
import { Context } from '../Context';

export default function Header(props) {
  const context = useContext(Context);
  const authUser = context.authenticatedUser || null;
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo"><a href="/">Courses</a></h1>
        <nav>
            {!authUser
            ?
              <ul className="header--signedout">
                <li><a href="/sign-up">Sign Up</a></li>
                <li><a href="/sign-in">Sign In</a></li>
              </ul>
            :
              <ul className="header--signedout">
                <li><p>Hello, {authUser.firstName}</p></li>
                <li><a href="/sign-out">Sign Out</a></li>
              </ul>
            }
        </nav>
      </div>
    </header>
  );
}
