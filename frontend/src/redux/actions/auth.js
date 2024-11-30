import axios from 'axios';
import Cookies from 'js-cookie';
import { 
        REGISTER_SUCCESS, 
        REGISTER_FAIL,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        LOGOUT_SUCCESS,
        LOGOUT_FAIL,
        AUTHENTICATION_SUCCESS,
        AUTHENTICATION_FAIL,
        DELETE_USER_SUCCESS,
        DELETE_USER_FAIL 
        } from "./types";
import { load_user } from './profile';

// Authentication action (to check if an user is authenticated)
export const checkAuthenticated = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json', // To handle the json responses from the backend
            'Content-Type': 'application/json', // To handle the json requests from the frontend
        },
        withCredentials: true, // Ensures cookies (like session ID) are sent with the request
    };

    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/accounts/authenticated`,
            config // Pass config directly
        );
        
        if (response.data.isAuthenticated === 'success') { 
            dispatch({
                type: AUTHENTICATION_SUCCESS,
                payload: true
            });
        } else {
            dispatch({
                type: AUTHENTICATION_FAIL,
                payload: false
            });
        } 
    } catch(err) {
        // console.log(err);
        dispatch({
            type: AUTHENTICATION_FAIL,
            payload: false
        });

    }
}


// Register action
export const register = (username, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json', // To handle the json responses from the backend
            'Content-Type': 'application/json', // To handle the json requests from the frontend
            'X-CSRFToken' : Cookies.get('csrftoken') // Since the register view in the backend is csrf protected we need to pass the token
        }
    }

    const body = JSON.stringify({username, password, re_password}); // Converts the JavaScript object to a JSON string

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/accounts/register`, 
            body, 
            {
                ...config,
                withCredentials: true, // Ensures cookies are included in requests
            }
        );
        if (response.data.error) { // If there is an error, registration failed or else a success
            dispatch({
                type: REGISTER_FAIL,
                payload: response.data.error
            });
        } else {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data.success
            });
        }
    
    } catch(err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.error
        });

    }
}

// login action
export const login = (username, password) => async dispatch => { // Note: redux-thunk allows us to use the dispatch
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken' : Cookies.get('csrftoken')
        }
    }

    const body = JSON.stringify({username, password});

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/accounts/login`,
            body,
            {
                ...config,
                withCredentials: true, // To include the csrf token since login view is csrf protected in the django view
            }
        );
        if (response.data.error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: response.data.error
            });
            alert("Login failed!")
        } else {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data.success
            });
            dispatch(load_user());  // Everytime an user logs in we want to dispatch the user profile

        }

    } catch(err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.error
        });
        alert("Login failed!")
    }
}

// Logout action

export const logout = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken' : Cookies.get('csrftoken')
        }
    }
    const body = JSON.stringify({
        'withCredentials': true
    });    
    
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/accounts/logout`,
            {},
            {
                ...config,
                withCredentials: true,
            }
        );
        if (response.data.error) {
            dispatch({
                type: LOGOUT_FAIL,
                payload: response.data.error
            });
        } else {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: response.data.success
            });

        }

    } catch(err) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: err.response.data.error
        });

    }
}

// Delete user account action
export const delete_account = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken' : Cookies.get('csrftoken')
        }
    }
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_API_URL}/accounts/delete`,
            {
                ...config,
                withCredentials: true,
            }
        );
        if (response.data.success) {
            dispatch({
                type: DELETE_USER_SUCCESS,
                payload: response.data.success
            });
        } else {
            dispatch({
                type: DELETE_USER_FAIL,
                payload: response.data.error
            });

        }

    } catch(err) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: err.response.data.error
        });

    }
}