import axios from "axios";
import {
  SCHEDULE_REQUEST,
  SCHEDULE_SUCCESS,
  SCHEDULE_ERROR,
  SCHEDULE_UPDATE,
  SCHEDULE_UPDATE_SUCCESS,
} from "../constants/constants";

// Load Team
export const loadSchedule = () => async (dispatch) => {
  dispatch({ type: SCHEDULE_REQUEST });
  try {
    const res = await axios.get("/api/schedule");
    dispatch({
      type: SCHEDULE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SCHEDULE_ERROR,
    });
  }
};

// Add/update Team member
export const updateSchedule = (form) => async (dispatch) => {
  dispatch({ type: SCHEDULE_UPDATE });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(form);
  try {
    const res = await axios.post("/api/schedule", body, config);
    dispatch({
      type: SCHEDULE_UPDATE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SCHEDULE_ERROR,
    });
  }
};
