// For redux reducers related to user profile

import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL
} from '../actions/types';

const initialState = {
    username: '',
    first_name: '',
    last_name: '',
    age: '',
    weight: '',
    height: '',
    sleep_hours: '',
    calories_intake: '',
    exercise_duration: '',
    water_intake: ''
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case LOAD_USER_PROFILE_SUCCESS:
        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                username: payload.username,
                first_name: payload.profile.first_name,
                last_name: payload.profile.last_name,
                age: payload.profile.age,
                weight: payload.profile.weight,
                height: payload.profile.height,
                sleep_hours: payload.profile.sleep_hours,
                calories_intake: payload.profile.calories_intake,
                exercise_duration: payload.profile.exercise_duration,
                water_intake: payload.profile.water_intake
            }
        case LOAD_USER_PROFILE_FAIL:
            return {
                ...state,
                username: '',
                first_name: '',
                last_name: '',
                age: '',
                weight: '',
                height: '',
                sleep_hours: '',
                calories_intake: '',
                exercise_duration: '',
                water_intake: ''
            }
        case UPDATE_USER_PROFILE_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }
}