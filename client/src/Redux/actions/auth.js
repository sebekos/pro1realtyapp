import axios from "axios";
import { toast } from "react-toastify";
import { setNav } from "./navbar";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    PW_RESET,
    PW_RESET_SAVE,
    SET_AUTH_LOADING
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load user
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get("/api/auth");
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// Register User
export const register = ({ name, email, password, registerkey }) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ name, email, password, registerkey });
    dispatch(setAuthLoadingTrue);
    try {
        const res = await axios.post("/api/user", body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// Login User
export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({ email, password });
    dispatch(setAuthLoadingTrue);
    try {
        const res = await axios.post("/api/auth", body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
        dispatch(setNav("/myprofile"));
        toast.dismiss();
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

// Reset password
export const pwreset = (email) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ email });
    console.log(body);
    try {
        await axios.post("/api/user/pwreset", body, config);
        dispatch({
            type: PW_RESET
        });
        toast.success("Check your email for the reset link");
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        }
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// Resset user save
export const pwresetsave = (email, password, hash, history) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({ email, password, hash });

    try {
        await axios.post("/api/user/pwresetsave", body, config);
        dispatch({
            type: PW_RESET_SAVE
        });
        toast.success("Reset successful");
        history.push("/login");
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => toast.error(error.msg));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// Logout / Clear profile
export const logout = () => (dispatch) => {
    dispatch(setNav("/login"));
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};

// Loading true
export const setAuthLoadingTrue = () => async (dispatch) => {
    dispatch({
        type: SET_AUTH_LOADING
    });
};
