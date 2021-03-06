import {
    GET_LISTING,
    GET_LISTINGS_REFINED,
    ADD_LISTING,
    LISTING_ERROR,
    DELETE_LISTING,
    TOGGLE_PROGRESS_BAR,
    PROGRESS_BAR_VALUE,
    UPLOAD_SUCCESS,
    SET_LOADING_TRUE,
    GET_LISTING_COUNT,
    SET_SEARCH
} from "../actions/types";

const initialState = {
    listings: [],
    listing: null,
    loading: true,
    progressbar: false,
    progressbarvalue: 0,
    count: 0,
    pages: 0,
    zipcode: "",
    type: "Newest",
    group: "All",
    agentid: "",
    page: 0,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_LISTINGS_REFINED:
            return {
                ...state,
                listings: payload.data,
                pages: Math.ceil(payload.totalCount / 10),
                currentPage: 1,
                loading: false
            };
        case GET_LISTING:
            return {
                ...state,
                listing: payload,
                loading: false
            };
        case GET_LISTING_COUNT:
            return {
                ...state,
                count: payload.count,
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
                listing: state.listings.filter(listing => listing._id !== payload),
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
        case TOGGLE_PROGRESS_BAR:
            return {
                ...state,
                progressbar: !state.progressbar
            };
        case PROGRESS_BAR_VALUE:
            return {
                ...state,
                progressbarvalue: payload
            };
        case LISTING_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case SET_SEARCH:
            return {
                ...state,
                [payload.field]: payload.data
            };
        default:
            return state;
    }
}
