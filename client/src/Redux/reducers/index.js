import { combineReducers } from 'redux'
import alert from './alert';
import auth from './auth';
import listing from './listing';
import profile from './profile';

export default combineReducers({
    alert,
    auth,
    listing,
    profile
});