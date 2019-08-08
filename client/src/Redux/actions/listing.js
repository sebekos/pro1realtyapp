import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_LISTING,
    GET_LISTINGS,
    GET_USER_LISTINGS,
    GET_AGENT_LISTINGS,
    ADD_LISTING,
    DELETE_LISTING,
    LISTING_ERROR,
    PROGRESS_BAR
} from './types';

// Add Listing or Update
export const addListing = (formData, history, edit = false) => async dispatch => {
    console.log(formData);
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
        if (edit) {
            dispatch(setAlert('Listing Updated', 'success'));
        } else {
            dispatch(setAlert('Listing Added', 'success'));
            history.push(`/editlisting/addphotos/${res.data._id}`);
        }
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

// Get agent listings
export const getAgentListings = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/listing/user/${id}`);
        dispatch({
            type: GET_AGENT_LISTINGS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: LISTING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get one listing
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

// Delete listing - Set active to 0
export const deleteListing = (id, history) => async dispatch => {
    try {
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

// Upload all photos
export const uploadPhotos = (formData, id, total) => async dispatch => {
    try {
        await axios.post(`/api/upload/listingphotos/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
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

// Reorder photos
export const reOrderPhotos = (images, id) => async dispatch => {
    try {
        await axios.post(`/api/listing/reorderphotos/${id}`, images, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch(setAlert('Photos Updated', 'success'));
    } catch (err) {
        dispatch({
            type: LISTING_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Progress bar status
export const updateProgressBar = (value) => async dispatch => {
    dispatch({
        type: PROGRESS_BAR,
        payload: value
    })
}