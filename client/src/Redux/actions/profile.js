import axios from "axios";
import { toast } from "react-toastify";
import { ADD_PROFILE, GET_PROFILE, GET_PROFILES, UPLOAD_AVATAR, DELETE_PROFILE, PROFILE_ERROR, LOGOUT } from "./types";

// Get profile
export const getProfile = () => async dispatch => {
    try {
        const res = await axios.get("/api/profile/me");
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get all profile
export const getProfiles = () => async dispatch => {
    try {
        const res = await axios.get("/api/profile");
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        toast.error("Get agents error");
    }
};

// Add Profile
export const addProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const res = await axios.post("/api/profile", formData, config);
        dispatch({
            type: ADD_PROFILE,
            payload: res.data
        });
        toast.success(edit ? "Profile Updated" : "Profile Added");
        history.push("/myprofile");
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => toast.error(error.msg));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get all profile
export const uploadAvatar = (formData, profile, history) => async dispatch => {
    try {
        const res = await axios.post("/api/upload/avatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        const newPro = {
            ...profile.profile,
            photo: res.data.Location
        };
        dispatch({
            type: UPLOAD_AVATAR,
            payload: newPro
        });
        toast.success("Avatar updated");
        history.push("/myprofile");
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => toast.error(error.msg));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete account
export const deleteProfile = () => async dispatch => {
    try {
        await axios.delete("/api/profile");
        dispatch({ type: DELETE_PROFILE });
        dispatch({ type: LOGOUT });
        toast.success("Profile deleted");
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        toast.error("Delete profile error");
    }
};
