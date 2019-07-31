import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_LISTING,
    GET_LISTINGS,
    GET_USER_LISTINGS,
    ADD_LISTING,
    DELETE_LISTING,
    LISTING_ERROR,
    UPLOAD_LISTING_PHOTOS
} from './types';

// Add Listing or Update
export const addListing = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/listing', formData, config);
        dispatch({
            type: ADD_LISTING,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Listing Updated' : 'Listing Added', 'success'));
        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LISTING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

    }
}

// Get all active listings
export const getListings = () => async dispatch => {
    try {
        const res = await axios.get(`/api/listing`);
        dispatch({
            type: GET_LISTINGS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: LISTING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get user listings
export const getUserListings = () => async dispatch => {
    try {
        const res = await axios.get(`/api/listing/user`);
        dispatch({
            type: GET_USER_LISTINGS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: LISTING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get listing
export const getListing = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/listing/${id}`);
        dispatch({
            type: GET_LISTING,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: LISTING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete listing
export const deleteListing = (id, history) => async dispatch => {
    try {
        console.log(id);
        const res = await axios.delete(`/api/listing/${id}`);
        dispatch({
            type: DELETE_LISTING,
            payload: res.data
        })
        dispatch(setAlert('Listing deleted', 'danger'));
        history.push('/dashboard');
    } catch (err) {
        dispatch({
            type: LISTING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get all profile
export const uploadPhotos = (formData, id) => async dispatch => {
    try {
        const res = await axios.post(`/api/upload/listingphotos/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (err) {
        if (err.response.status === 500) {
            console.log('There was a problem with the server');
        } else {
            console.log(err.response.data.msg);
        }
    }
}

// Get all profile
export const reOrderPhotos = (images, id, history) => async dispatch => {
    try {
        const res = await axios.post(`/api/listing/reorderphotos/${id}`, images, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch(setAlert('Photos Updated', 'success'));
        // history.push('/dashboard');
    } catch (err) {
        if (err.response.status === 500) {
            console.log('There was a problem with the server');
        } else {
            console.log(err.response.data.msg);
        }
    }
}