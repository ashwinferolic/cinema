import { combineReducers } from 'redux';
import errorsReducer from './errors.reducer';
import { configReducer } from './config.reducer';
import { moviesReducer } from './moviesReducer';
import { movieReducer } from './movieReducer';
import { recommendationsReducer } from './recommendationsReducer';

export default combineReducers({
  errors: errorsReducer,
  config: configReducer,
  movies: moviesReducer,
  movie: movieReducer,
  recommended: recommendationsReducer,
});
