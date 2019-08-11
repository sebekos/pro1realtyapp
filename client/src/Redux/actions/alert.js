import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERTS } from './types';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
}

export const setAllAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuid.v4();
    // Remove all alerts first;
    dispatch({ type: REMOVE_ALL_ALERTS })
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
}

export const removeAlerts = () => dispatch => {
    dispatch({ type: REMOVE_ALL_ALERTS });
}