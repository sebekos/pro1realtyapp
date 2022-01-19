import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_USER,
  REGISTER_FAIL,
  SET_AUTH_LOADING,
} from "../constants/constants";
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
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login User
export const login = (form) => async (dispatch) => {
  dispatch(setAuthLoading());
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email: form.email, password: form.password });
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: LOGIN_FAIL,
      payload: errors,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  dispatch(setAuthLoading());
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);
  try {
    await axios.post("/api/user", body, config);
    dispatch({
      type: REGISTER_USER,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: REGISTER_FAIL,
      payload: errors,
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

// Set auth loading
export const setAuthLoading = (payload) => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADING, payload });
};
