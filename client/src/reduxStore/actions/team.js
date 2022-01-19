import axios from "axios";
import {
  TEAM_REQUEST,
  TEAM_SUCCESS,
  TEAM_ERROR,
  TEAM_UPDATE,
  TEAM_UPDATE_SUCCESS,
} from "../constants/constants";

// Load Team
export const loadTeam = () => async (dispatch) => {
  dispatch({ type: TEAM_REQUEST });
  try {
    const res = await axios.get("/api/team");
    dispatch({
      type: TEAM_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TEAM_ERROR,
    });
  }
};

// Add/update Team member
export const updateTeam = (form) => async (dispatch) => {
  dispatch({ type: TEAM_UPDATE });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(form);
  try {
    const res = await axios.post("/api/team", body, config);
    dispatch({
      type: TEAM_UPDATE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TEAM_ERROR,
    });
  }
};

// Update avatar
export const updateAvatar = (formData) => async (dispatch) => {
  dispatch({ type: TEAM_UPDATE });
  try {
    const res = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: TEAM_UPDATE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TEAM_ERROR,
    });
  }
};
