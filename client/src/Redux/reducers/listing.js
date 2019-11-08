import {
    GET_LISTING,
    GET_LISTINGS,
    GET_USER_LISTINGS,
    GET_LISTINGS_REFINED,
    ADD_LISTING,
    LISTING_ERROR,
    DELETE_LISTING,
    GET_AGENT_LISTINGS,
    MAX_BAR,
    INCREMENT_BAR,
    MANUAL_BAR,
    UPLOAD_SUCCESS,
    SET_LOADING_TRUE
} from '../actions/types';

const initialState = {
    listings: [],
    listing: null,
    loading: true,
    progressbar: {
        max: '',
        current: '',
        increment: ''
    },
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_LISTINGS:
            return {
                ...state,
                listings: payload,
                loading: false
            };
        case GET_USER_LISTINGS:
            return {
                ...state,
                listings: payload,
                loading: false
            };
        case GET_AGENT_LISTINGS:
            return {
                ...state,
                listings: payload,
                loading: false
            };
        case GET_LISTINGS_REFINED:
            return {
                ...state,
                listings: payload,
                loading: false
            };
        case GET_LISTING:
            return {
                ...state,
                listing: payload,
                loading: false
            };
        case ADD_LISTING:
            return {
                ...state,
                loading: false
            };
        case DELETE_LISTING:
            return {
                ...state,
                listing: state.listings.filter(
                    listing => listing._id !== payload
                ),
                loading: false
            };
        case MAX_BAR:
            return {
                ...state,
                progressbar: {
                    current: 0,
                    max: payload
                },
                loading: false
            };
        case INCREMENT_BAR:
            return {
                ...state,
                progressbar: {
                    ...state.progressbar,
                    current: state.progressbar.current + 1
                },
                loading: false
            };
        case MANUAL_BAR:
            return {
                ...state,
                progressbar: {
                    ...state.progressbar,
                    current: payload / state.progressbar.max
                },
                loading: false
            };
        case UPLOAD_SUCCESS:
            return {
                ...state,
                listing: payload,
                loading: false
            };
        case SET_LOADING_TRUE:
            return {
                ...state,
                loading: true
            };
        case LISTING_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
