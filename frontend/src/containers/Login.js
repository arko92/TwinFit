import {React, useState} from "react";
import { Link, Navigate } from "react-router-dom";
import { login } from "../redux/actions/auth";
import { connect } from "react-redux";
import CSRFToken from "../components/CSRFToken";
const Login = ({login, isAuthenticated}) => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });


  const { username, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = e => {
    e.preventDefault();  // Avoiding default page refresh
    login(username, password); // Using the login action to login an user
  };

  if (isAuthenticated) { // If account is created the user is redirected to the dashboard
    return <Navigate to="/dashboard" />
  }
  return (
  <div className='container mt-5'>
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form className="mb-4" onSubmit={e => onSubmit(e)}>
          <CSRFToken/> {/* This retrieves the csrf token as a hidden input field and keep our form csrf protected */}
          <div className="form-group mb-3">
            <label htmlFor="Username" className="mb-2">Username</label>
            <input 
              type="text" 
              className="form-control" 
              id="Username"
              name="username" 
              value={username} 
              onChange={e=>onChange(e)} 
              placeholder="Enter username"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="mb-2">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              name="password"
              value={password}
              onChange={e=>onChange(e)}
              placeholder="Enter password"
              minLength={6}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
          <div className="text-center">
            <p className="mb-0">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login); 
/**
 * Connects the Login component to the Redux store.
 * 
 * Maps the isAuthenticated state from the Redux store to the component's props
 * and binds the login action creator to the component.
 * 
 * @function
 * @param {Function} mapStateToProps - Maps state to component props.
 * @param {Object} actions - Contains action creators to be connected.
 * @returns {React.Component} The connected Login component.
 */
