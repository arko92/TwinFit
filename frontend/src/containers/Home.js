import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/auth';
import { useNavigate } from 'react-router-dom';

const Home = ({isAuthenticated, logout}) => {
  // To handle logout 
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/'); // Redirects user to homepage
      };

    return (
    <div className='container'>
        <div className='mt-5 p-5 bg-light'>
            <h1 className='display-4'>Welcome to TwinFit</h1>
            <p className='lead'>
                An application that predicts your health based on your current health status using generative AI.
            </p>
            <hr className='my-4' />
            {isAuthenticated ? ( // If the user is authenticated, show the logout button
                <>
                    <p>Click the button below to log out</p>
                    <button 
                    className='btn btn-primary btn-lg' 
                    onClick={handleLogout}
                    >
                        Logout
                    </button>
                </>
            ) : (  // If the user is authenticated, show the login button
                <>
                    <p>Click the button below to log in</p>
                    <Link className='btn btn-primary btn-lg' to='/login'>Login</Link>
                </>
            )}      
        </div>
    </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{logout})(Home); // connect home to the redux store to get the isAuthenticated state