import { combineReducers } from "redux";
import auth from "./auth";
import listing from "./listing";
import profile from "./profile";
import office from "./office";

export default combineReducers({
    auth,
    listing,
    profile,
    office
});
