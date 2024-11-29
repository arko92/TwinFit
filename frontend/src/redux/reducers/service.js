// For redux reducers related to services

// Importing dispatch types
import {
    GET_HEALTH_ADVICE_SUCCESS,
    GET_HEALTH_ADVICE_FAIL
} from '../actions/types';

//Defining initial state
const initialState = {
    health_advice: "",
    error: "", // To store error messages
}

// Defining reducer
export default function(state = initialState, action) {

    const { type, payload } = action;

    switch(type) {
        case GET_HEALTH_ADVICE_SUCCESS:
            return {
                ...state,
                health_advice: payload.health_advice,
                error: ""
            }
        case GET_HEALTH_ADVICE_FAIL:
                return {
                    ...state,
                    health_advice: "",
                    error: payload
                }
        default:
            return state;
        }
}
