import {
    ADD_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    UPLOAD_AVATAR,
    PROFILE_ERROR,
    CLEAR_PROFILE
} from '../actions/types';

const initialState = {
    profiles: [],
    profile: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            };
        case UPLOAD_AVATAR:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        default:
            return state;
    }
}

