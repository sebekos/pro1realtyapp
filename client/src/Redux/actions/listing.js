import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_LISTING,
    GET_LISTINGS,
    GET_USER_LISTINGS,
    GET_AGENT_LISTINGS,
    GET_LISTINGS_REFINED,
    ADD_LISTING,
    DELETE_LISTING,
    UPLOAD_SUCCESS,
    LISTING_ERROR,
    MAX_BAR,
    INCREMENT_BAR,
    MANUAL_BAR,
    SET_LOADING_TRUE
} from './types';

// Add Listing or Update
export const addListing = (
    formData,
    history,
    edit = false
) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/listing', formData, config);
        dispatch({
            type: ADD_LISTING,
            payload: res.data
        });
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
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Get all active listings
export const getListings = () => async dispatch => {
    try {
        const res = await axios.get(`/api/listing`);
        dispatch({
            type: GET_LISTINGS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LISTING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Get user listings
export const getUserListings = () => async dispatch => {
    try {
        const res = await axios.get(`/api/listing/user`);
        dispatch({
            type: GET_USER_LISTINGS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LISTING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Get agent listings
export const getAgentListings = id => async dispatch => {
    try {
        const res = await axios.get(`/api/listing/user/${id}`);
        dispatch({
            type: GET_AGENT_LISTINGS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LISTING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Get refined listings
export const getRefinedListings = formData => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('/api/listing/refined', formData, config);
        dispatch({
            type: GET_LISTINGS_REFINED,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LISTING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Get one listing
export const getListing = id => async dispatch => {
    try {
        const res = await axios.get(`/api/listing/${id}`);
        dispatch({
            type: GET_LISTING,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: LISTING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Delete listing - Set active to 0
export const deleteListing = (id, history) => async dispatch => {
    try {
        const res = await axios.delete(`/api/listing/${id}`);
        dispatch({
            type: DELETE_LISTING,
            payload: res.data
        });
        dispatch(setAlert('Listing deleted', 'danger'));
        history.push('/mylistings');
    } catch (err) {
        dispatch({
            type: LISTING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Upload all photos
export const uploadPhotos = formData => async dispatch => {
    try {
        const res = await axios.post(`/api/upload/listingphotos`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({
            type: UPLOAD_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LISTING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

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
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Progress bar max
export const maxProgressBar = value => async dispatch => {
    dispatch({
        type: MAX_BAR,
        payload: value
    });
};

// Progress bar increment
export const incrementProgressBar = () => async dispatch => {
    dispatch({
        type: INCREMENT_BAR
    });
};

// Progress bar manual change
export const manualProgressBar = value => async dispatch => {
    dispatch({
        type: MANUAL_BAR,
        payload: value
    });
};

// Progress bar manual change
export const setLoadingTrue = () => async dispatch => {
    dispatch({
        type: SET_LOADING_TRUE
    });
};
