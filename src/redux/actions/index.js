import * as TYPES from './types';
import tmdbAPI from '../tmdb.api';

export const init = () => async (dispatch) => {
  try {
    dispatch({ type: TYPES.SET_LOADING });
    await dispatch(getConfig());
    await dispatch(getGenres());
    dispatch({ type: TYPES.REMOVE_LOADING });
  } catch (err) {
    dispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
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
  } catch (err) {
    dispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
  }
};

export const getGenres = () => async (dispatch) => {
  try {
    const res = await tmdbAPI.get('genre/movie/list');
    dispatch({
      type: TYPES.GET_GENRES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
  }
};

export const getMoviesDiscover = (name, page) => async (dispatch, getState) => {
  try {
    const { selected } = getState().config;
    if (!selected) return;
    dispatch({ type: TYPES.FETCH_MOVIES_LOADING });

    const res = await tmdbAPI.get(`/movie/${name}`, {
      params: {
        page,
      },
    });

    await dispatch({
      type: TYPES.FETCH_MOVIES_DISCOVER,
      payload: res.data,
    });

    dispatch({ type: TYPES.FETCH_MOVIES_FINISHED });
  } catch (err) {
    dispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
  }
};

export const setSelectedMenu = (name) => async (dispatch, getState) => {
  try {
    const { staticCategories, genres, loading } = getState().config;
    if (!loading) {
      if (!name) {
        dispatch({ type: TYPES.REMOVE_SELECTED_MENU });
      } else if (
        staticCategories.find((category) => category === name) ||
        genres.find((genre) => genre.name === name)
      ) {
        dispatch({
          type: TYPES.SET_SELECTED_MENU,
          payload: name,
        });
      }
    }
  } catch (err) {
    dispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
  }
};

export const getMoviesGenre = (name, page) => async (dispatch, getState) => {
  try {
    const { genres, selected } = getState().config;
    if (!selected) return;
    dispatch({ type: TYPES.FETCH_MOVIES_LOADING });
    const genreId = genres
      .filter((el) => el.name === name)
      .map((el) => el.id)
      .join('');

    const res = await tmdbAPI.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
      },
    });

    await dispatch({
      type: TYPES.FETCH_MOVIES_GENRE,
      payload: res.data,
    });

    dispatch({ type: TYPES.FETCH_MOVIES_FINISHED });
  } catch (err) {
    dispatch({
      type: TYPES.INSERT_ERROR,
      payload: err.response,
    });
  }
};

export const getMoviesSearch = (query, page) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.FETCH_MOVIES_LOADING });

    const res = await tmdbAPI.get('/search/movie', {
      params: {
        query,
        page,
      },
    });

    await dispatch({
      type: TYPES.FETCH_MOVIES_SEARCH,
      payload: res.data,
    });

    dispatch({
      type: TYPES.FETCH_MOVIES_FINISHED,
    });
  } catch (err) {
    dispatch({
      type: TYPES.INSERT_ERROR,
      payload: err.response,
    });
  }
};

export const getMovie = (id) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.FETCH_MOVIE_LOADING });

    const res = await tmdbAPI.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    });

    await dispatch({
      type: TYPES.FETCH_MOVIE,
      payload: res.data,
    });

    dispatch({
      type: TYPES.FETCH_MOVIE_FINISHED,
    });
  } catch (err) {
    dispatch({
      type: TYPES.INSERT_ERROR,
      payload: err.response,
    });
  }
};

export const clearMovies = () => {
  return {
    type: TYPES.FETCH_MOVIES_LOADING,
  };
};

export const clearMovie = () => {
  return {
    type: TYPES.FETCH_MOVIE_LOADING,
  };
};

export const getRecommendations = (id, page) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.FETCH_RECOMMENDATIONS_LOADING });

    const res = await tmdbAPI.get(`/movie/${id}/recommendations`, {
      params: {
        page,
      },
    });

    await dispatch({
      type: TYPES.FETCH_RECOMMENDATIONS,
      payload: res.data,
    });

    dispatch({ type: TYPES.FETCH_RECOMMENDATIONS_FINISHED });
  } catch (err) {
    dispatch({
      type: TYPES.INSERT_ERROR,
      payload: err.response,
    });
  }
};

export const clearRecommendations = () => {
  return {
    type: TYPES.FETCH_RECOMMENDATIONS_LOADING,
  };
};
