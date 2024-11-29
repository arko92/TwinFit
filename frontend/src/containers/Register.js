import {React, useState} from "react";
import { Link, Navigate } from "react-router-dom";
import { register } from "../redux/actions/auth";
import { connect } from "react-redux";
import CSRFToken from "../components/CSRFToken";
const Register = ({register, isAuthenticated}) => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    re_password: "",
  });

  const [accountCreated, setAccountCreated] = useState(false); // To check is registration is successful and an account is created.

  const { username, password, re_password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = e => {
    e.preventDefault();  // Avoiding default page refresh
    if (password === re_password) { // Only if the password matches the user is registered
      register(username, password, re_password); // Using the register action to register an user
      setAccountCreated(true);
    } else {
      alert("Passwords do not match");
    }
  };

  if (isAuthenticated) { // If an user is authenticated direct that user to the dashboard
    return <Navigate to="/dashboard" />
  }
  if (accountCreated) { // If account is created the user is redirected to the login page
    return <Navigate to="/login" />
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
          <div className="form-group mb-3">
            <label htmlFor="re_password" className="mb-2">Confirm Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="re_password"
              name="re_password"
              value={re_password} 
              onChange={e=>onChange(e)} 
              placeholder="Retype your password"
              minLength={6}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Register</button>
          <div className="text-center">
            <p className="mb-0">
              Already have an account? <Link to="/login">Login</Link>
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

export default connect(mapStateToProps, {register})(Register);