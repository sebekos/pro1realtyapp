import axios from "axios";
import { toast } from "react-toastify";
import {
    GET_LISTING,
    GET_LISTINGS_REFINED,
    ADD_LISTING,
    DELETE_LISTING,
    UPLOAD_SUCCESS,
    LISTING_ERROR,
    SET_LOADING_TRUE,
    PROGRESS_BAR_VALUE,
    TOGGLE_PROGRESS_BAR,
    GET_LISTING_COUNT,
    SET_SEARCH
} from "./types";

// Add Listing or Update
export const addListing = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const res = await axios.post("/api/listing", formData, config);
        dispatch({
            type: ADD_LISTING,
            payload: res.data
        });
        if (edit) {
            toast.success("Listing updated");
        } else {
            toast.success("Listing added");
            history.push(`/editlisting/addphotos/${res.data._id}`);
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => toast.error(error.msg));
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

// Get refined listings
export const getRefinedListings = formData => async dispatch => {
    dispatch({
        type: SET_LOADING_TRUE
    });
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await axios.post("/api/listing/refined", formData, config);
        dispatch({
            type: GET_LISTINGS_REFINED,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => toast.error(error.msg));
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
        toast.error("Get listing error");
    }
};

// Get one listing
export const getListingCount = id => async dispatch => {
    try {
        const res = await axios.get(`/api/listing/count/${id}`);
        dispatch({
            type: GET_LISTING_COUNT,
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
        toast.error("Listing count error");
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
        toast.success("Listing deleted");
        history.push("/mylistings");
    } catch (err) {
        dispatch({
            type: LISTING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
        toast.error("Delete lisitng error");
    }
};

// Upload all photos
export const uploadPhotos = formData => async dispatch => {
    try {
        dispatch({
            type: TOGGLE_PROGRESS_BAR
        });
        const res = await axios.post(`/api/upload/listingphotos`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent;
                dispatch({
                    type: PROGRESS_BAR_VALUE,
                    payload: (loaded / total) * 100
                });
            }
        });
        dispatch({
            type: UPLOAD_SUCCESS,
            payload: res.data
        });
        dispatch({
            type: TOGGLE_PROGRESS_BAR
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => toast.error(error.msg));
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
                "Content-Type": "application/json"
            }
        });
        toast.success("Photos updated");
    } catch (err) {
        dispatch({
            type: LISTING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
        toast.error("Reorder photos error");
    }
};

// Toggle progress bar
export const toggleProgressBar = () => async dispatch => {
    dispatch({
        type: TOGGLE_PROGRESS_BAR
    });
};

// Progress bar increment
export const progressBarValue = payload => async dispatch => {
    dispatch({
        type: PROGRESS_BAR_VALUE,
        payload: payload
    });
};

// Progress bar manual change
export const setLoadingTrue = () => async dispatch => {
    dispatch({
        type: SET_LOADING_TRUE
    });
};

// Update search
export const setSearch = data => async dispatch => {
    dispatch({
        type: SET_SEARCH,
        payload: data
    });
};
