import {React, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux"; // To connect the component to a redux state
import { logout } from "../redux/actions/auth";
import { useNavigate } from 'react-router-dom';

const Navbar = ({isAuthenticated,logout}) => {

  // To handle logout 
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/'); // Redirects user to homepage
  };

  /**
   * Renders navigation links for guest users.
   * 
   * This component provides links to the login and register pages,
   * intended for users who are not authenticated.
  */
  const guestLinks = (
    <Fragment>
        <li className='nav-item'>
            <NavLink className='nav-link' to='/login'>Login</NavLink>
        </li>
        <li className='nav-item'>
            <NavLink className='nav-link' to='/register'>Register</NavLink>
        </li>
    </Fragment>
  );

   /**
   * Renders navigation links for authenticated users.
   * 
   * This component provides links to the Dashboard and logout,
   * intended for users who are authenticated.
  */ 
  const authLinks = (
    <Fragment>
        <li className='nav-item'>
            <NavLink className='nav-link' to='/dashboard'>Dashboard</NavLink>
        </li>
        <li className='nav-item'>
            <a className='nav-link' onClick={handleLogout} href="#!">Logout</a>
        </li>
    </Fragment>
  );

  return (
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" exact to="/">TwinFit</Link>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            {/* Note: Navlink element makes the navbarbar element active when the url is same as their path */}
            <NavLink className="nav-link" exact to="/">Home</NavLink> 
          </li>
          {isAuthenticated ? authLinks: guestLinks}  
        </ul>
      </div>
    </div>
  </nav>
  );
};

const mapStateToProps = state => ({ // A function to map navbar prop to redux state (which is automatically returned by the redux store when we connect it with a react component)
  isAuthenticated: state.auth.isAuthenticated  // mapping navbar prop "isAuthenticated" to the redux state "state.auth.isAuthenticated"
});

export default connect(mapStateToProps,{logout})(Navbar); // Connects navbar component to the redux store with arguments as the mapping function and the logout action



