import { SET_NAV } from "../actions/types";

const initialState = {
    nav: "/"
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_NAV:
            return {
                ...state,
                nav: payload
            };
        default:
            return state;
    }
}
