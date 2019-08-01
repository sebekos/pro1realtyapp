import {
    GET_OFFICE,
    OFFICE_ERROR
} from '../actions/types';

const initialState = {
    office: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_OFFICE:
            return {
                ...state,
                office: payload,
                loading: false
            };
        case OFFICE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}

