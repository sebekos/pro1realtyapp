import axios from "axios";
import { GET_OFFICE, OFFICE_ERROR } from "./types";
import { toast } from "react-toastify";

// Get office info
export const getOffice = () => async dispatch => {
    try {
        const res = await axios.get(`/api/office`);
        dispatch({
            type: GET_OFFICE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: OFFICE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
        toast.error("Get office info error");
    }
};
