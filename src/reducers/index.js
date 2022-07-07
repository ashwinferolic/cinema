import { combineReducers } from "redux";
import { configReducer } from "./configReducer";
import { moviesReducer } from "./moviesReducer";

export default combineReducers({
  config: configReducer,
  movies: moviesReducer,
});
