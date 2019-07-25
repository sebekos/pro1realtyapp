import axios from 'axios';
import { setAlert } from './alert';
import {
    ADD_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    UPLOAD_AVATAR,
    PROFILE_ERROR
} from './types';

// Get profile
export const getProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get all profile
export const getProfiles = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add Profile
export const addProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: ADD_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Added', 'success'));
        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

// Get all profile
export const uploadAvatar = (formData, profile, history) => async dispatch => {
    try {
        const res = await axios.post('/api/upload/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({
            type: UPLOAD_AVATAR,
            payload: {
                ...profile,
                photo: res.data.Location
            }
        })
        dispatch(setAlert('Avatar Updated', 'success'));
        history.push('/dashboard');
    } catch (err) {
        if (err.response.status === 500) {
            console.log('There was a problem with the server');
        } else {
            console.log(err.response.data.msg);
        }
    }
}