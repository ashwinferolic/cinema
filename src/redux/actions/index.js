import * as TYPES from './types';
import tmdbAPI from '../tmdb.api';

export const init = () => async (dispatch) => {
  try {
    dispatch({ type: TYPES.SET_LOADING });
    await dispatch(getConfig());
    await dispatch(getGenres());
    dispatch({ type: TYPES.REMOVE_LOADING });
  } catch (error) {
    dispatch({
      type: TYPES.INSERT_ERROR,
      payload: error.response,
    });
  }
};

// get config object from the api
export const getConfig = () => async (dispatch) => {
  try {
    const res = await tmdbAPI.get('/configuration');
    dispatch({
      type: TYPES.GET_CONFIG,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: TYPES.INSERT_ERROR,
      payload: error.response,
    });
  }
};

export const getGenres = () => async (dispatch) => {
  try {
    const res = await tmdbAPI.get('genre/movie/list');
    dispatch({
      type: TYPES.GET_GENRES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: TYPES.INSERT_ERROR,
      payload: error.response,
    });
  }
};
