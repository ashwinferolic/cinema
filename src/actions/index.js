import * as TYPES from "./types";
import tmdbAPI from "../api/tmdb";

export const init = () => async (dispatch) => {
  dispatch({ type: TYPES.SET_LOADING });
  await dispatch(getConfig());
  await dispatch(getGenres());
  dispatch({ type: TYPES.REMOVE_LOADING });
};

// get config object from the api
export const getConfig = () => async (dispatch) => {
  const res = await tmdbAPI.get("/configuration");
  dispatch({
    type: TYPES.GET_CONFIG,
    payload: res.data,
  });
};

export const getGenres = () => async (dispatch) => {
  const res = await tmdbAPI.get("genre/movie/list");
  dispatch({
    type: TYPES.GET_GENRES,
    payload: res.data,
  });
};
