import {
  SCHEDULE_REQUEST,
  SCHEDULE_SUCCESS,
  SCHEDULE_ERROR,
  SCHEDULE_UPDATE,
  SCHEDULE_UPDATE_SUCCESS,
} from "../constants/constants";

import { uuid } from "utils";

const initialState = {
  schedule: [],
  loading: true,
  errors: null,
  success: false,
  firstLoad: false,
  refresh: null,
};

function Schedule(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SCHEDULE_REQUEST:
    case SCHEDULE_UPDATE:
      return {
        ...state,
        loading: true,
      };
    case SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: payload,
        loading: false,
        firstLoad: true,
      };
    case SCHEDULE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        refresh: uuid(),
      };
    case SCHEDULE_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default Schedule;
