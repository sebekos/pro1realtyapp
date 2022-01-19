import {
  TEAM_REQUEST,
  TEAM_SUCCESS,
  TEAM_ERROR,
  TEAM_UPDATE,
  TEAM_UPDATE_SUCCESS,
} from "../constants/constants";

import { uuid } from "utils";

const initialState = {
  team: [],
  loading: true,
  errors: null,
  success: false,
  firstLoad: false,
  refresh: null,
};

function Team(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case TEAM_REQUEST:
    case TEAM_UPDATE:
      return {
        ...state,
        loading: true,
      };
    case TEAM_SUCCESS:
      return {
        ...state,
        team: payload,
        loading: false,
        firstLoad: true,
      };
    case TEAM_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        refresh: uuid(),
      };
    case TEAM_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default Team;
