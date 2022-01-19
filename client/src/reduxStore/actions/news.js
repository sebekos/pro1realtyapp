import axios from "axios";
import {
  NEWS_REQUEST,
  NEWS_SUCCESS,
  NEWS_ERROR,
  NEWS_UPDATE,
  NEWS_UPDATE_SUCCESS,
} from "../constants/constants";

// Load Team
export const loadNews = () => async (dispatch) => {
  dispatch({ type: NEWS_REQUEST });
  try {
    const res = await axios.get("/api/news");
    dispatch({
      type: NEWS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NEWS_ERROR,
    });
  }
};

// Add/update Team member
export const updateNews = (form) => async (dispatch) => {
  dispatch({ type: NEWS_UPDATE });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(form);
  try {
    const res = await axios.post("/api/news", body, config);
    dispatch({
      type: NEWS_UPDATE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NEWS_ERROR,
    });
  }
};
