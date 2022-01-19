import { combineReducers } from "redux";
import auth from "./auth";
import team from "./team";
import schedule from "./schedule";
import news from "./news";

export default combineReducers({
  auth,
  team,
  schedule,
  news,
});
