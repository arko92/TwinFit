import React from "react";
import { connect } from "react-redux";
import { Route, Navigate } from 'react-router-dom';

/**
 * A higher-order component that conditionally renders the provided element based on authentication.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {React.Component} props.element - The element to render if authenticated.
 * @param {boolean} props.isAuthenticated - Flag indicating if the user is authenticated.
 * 
 * @returns {React.Element} The element to render or a redirect to the login page.
 */
const PrivateRoute = ({element: Element, isAuthenticated, ...rest}) => {
    return isAuthenticated ? (   // If authenticated, loads the element e.g. Dashboard 
      <Element {...rest} />     // Rest of the props of the element (e.g. Dashboard) in App.js
    ) : (               // If not authenticated, direct the user to the login page
      <Navigate to="/login" />
    )    
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);