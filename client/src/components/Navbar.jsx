import { Link } from "react-router-dom";
import './NavBar.css';  

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-logo">ThoughtFULL</div>
      <nav>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="navbar-item">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="navbar-item">
              Contact
            </Link>
          </li>

          <li className="navbar-profile">
            <span className="navbar-item">Profile</span>
            <ul className="profile-dropdown">
              <li>
                <Link to="/dashboard" className="profile-dropdown-item">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/logout" className="profile-dropdown-item">
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
