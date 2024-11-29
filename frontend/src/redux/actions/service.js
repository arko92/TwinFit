// For redux actions related to services
import axios from 'axios';  // To make post request
import Cookies from 'js-cookie'; // To get csrf token for the post request
import {
    GET_HEALTH_ADVICE_SUCCESS,
    GET_HEALTH_ADVICE_FAIL
} from './types';

export const get_health_advice = (age, height, weight, sleep_hours, calories_intake, exercise_duration, water_intake) => async dispatch => {

    // Define config for the post request
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    // Define body of the post request
    const body = JSON.stringify({
        "age": age,
        "weight": weight,
        "height": height,
        "sleep_hours": sleep_hours,
        "calories_intake": calories_intake,
        "exercise_duration": exercise_duration,
        "water_intake": water_intake
    });

    // Make the post request
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/services/health-advice`,
            body, 
            {
                ...config,
                withCredentials: true, // Ensures cookies are included in requests
            }
        );
        if (response.data.health_advice) {
            dispatch({
                type: GET_HEALTH_ADVICE_SUCCESS,
                payload: response.data
            });
        } else {
            dispatch({
                type: GET_HEALTH_ADVICE_FAIL,
                payload: response.data.error
            });
        }
    } catch(err) {
        dispatch({
            type: GET_HEALTH_ADVICE_FAIL,
            payload: err.response.data.error
        });
    }
    
}