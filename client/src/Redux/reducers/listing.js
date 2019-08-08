import {
    GET_LISTING,
    GET_LISTINGS,
    GET_USER_LISTINGS,
    ADD_LISTING,
    LISTING_ERROR,
    DELETE_LISTING,
    GET_AGENT_LISTINGS,
    PROGRESS_BAR
} from '../actions/types';

const initialState = {
    listings: [],
    listing: null,
    loading: true,
    progressbar: '',
    error: {}
}

export default function (state = initialState, action) {
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
        case GET_LISTING:
            return {
                ...state,
                listing: payload,
                loading: false
            }
        case ADD_LISTING:
            return {
                ...state,
                loading: false
            }
        case DELETE_LISTING:
            return {
                ...state,
                listing: state.listings.filter(listing => listing._id !== payload),
                loading: false
            }
        case PROGRESS_BAR:
            return {
                ...state,
                progressbar: payload,
                loading: false
            }
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

