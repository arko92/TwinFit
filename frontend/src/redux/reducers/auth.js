
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
} from '../actions/types';

const initialState = { // Defining initial authentication state of an user
    isAuthenticated: null
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                payload,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                payload,
                isAuthenticated: true
            }
        case LOGOUT_SUCCESS:
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                payload,
                isAuthenticated: false
            }
        case AUTHENTICATION_SUCCESS:
        case AUTHENTICATION_FAIL:            
            return {
                ...state,
                isAuthenticated: payload // depending on what was set the action it will be either true or false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
        case DELETE_USER_FAIL:
            return {
                state,
                payload
            };
        default:
            return state;
    }
}