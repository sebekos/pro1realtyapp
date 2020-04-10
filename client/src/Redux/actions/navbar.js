import { SET_NAV } from "./types";

// Delete account
export const setNav = (payload) => async (dispatch) => {
    dispatch({ type: SET_NAV, payload });
};
