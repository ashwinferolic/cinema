import { combineReducers } from 'redux';
import errorsReducer from './errors.reducer';
import { configReducer } from './config.reducer';

export default combineReducers({
  errors: errorsReducer,
  config: configReducer,
});
