import '../styles/reset.css';
import '../styles/global.css';

export default function Header() {
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo"><a href="/">Courses</a></h1>
        <nav>
          <ul className="header--signedout">
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="/signin">Sign In</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
