import {React,Fragment, useEffect} from "react";
import {connect} from "react-redux";
import { checkAuthenticated } from "../redux/actions/auth";
import { load_user } from "../redux/actions/profile"; 
const Layout = ({children, isAuthenticated, checkAuthenticated, load_user}) => {

  useEffect(() => { // Every layout is mounted, this will check if an user is authenticated and if authenticated will set isAuthenticated to true
    if (isAuthenticated === null) {
      checkAuthenticated();
      load_user(); // Every time we refresh we load the user profile
    }  
  }, [isAuthenticated]);

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});



export default connect(mapStateToProps, {checkAuthenticated,load_user})(Layout); // null because we dont need any redux state here