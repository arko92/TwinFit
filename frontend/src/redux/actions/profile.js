// For redux actions related to user profile
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL
} from './types';

export const load_user = () => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    };

    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/profiles/user`,
            config
        );
        if (response.data.error) {
            dispatch({
                type: LOAD_USER_PROFILE_FAIL,
                payload: response.data.error
            }); 
        } else {
            dispatch({
                type: LOAD_USER_PROFILE_SUCCESS,
                payload: response.data
            });
        }
    } catch(err) {
        dispatch({
            type: LOAD_USER_PROFILE_FAIL,
            payload: err.response.data.error
        });
    }
}

// Redux action for updating an user profile
export const update_profile = (first_name, last_name, age, weight, height, sleep_hours,calories_intake,exercise_duration,water_intake) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken' : Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        "first_name": first_name,
        "last_name": last_name,
        "age": age,
        "weight": weight,
        "height": height,
        "sleep_hours": sleep_hours,
        "calories_intake": calories_intake,
        "exercise_duration": exercise_duration,
        "water_intake": water_intake

    });

    try {
        const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/profiles/update`,
            body, 
            {
                ...config,
                withCredentials: true, // Ensures cookies are included in requests
            }
        );
        if (response.data.profile && response.data.username) {
            dispatch({
                type: UPDATE_USER_PROFILE_SUCCESS,
                payload: response.data
            });
        } else {
            dispatch({
                type: UPDATE_USER_PROFILE_FAIL,
                payload: response.data.error
            });
        }

    } catch(err) {
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL,
            payload: err.response.data.error
        });
    }
}
