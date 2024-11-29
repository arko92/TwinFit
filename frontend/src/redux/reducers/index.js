import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import service from './service';

export default combineReducers({  // Combines multiple reducer functions into one reducer function
    auth,
    profile,
    service
});