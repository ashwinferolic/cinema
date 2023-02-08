import * as TYPES from "../actions/types";

export const recommendationsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case TYPES.FETCH_RECOMMENDATIONS_LOADING:
      return { ...state, loading: true };
    case TYPES.FETCH_RECOMMENDATIONS_FINISHED:
      return { ...state, loading: false };
    case TYPES.FETCH_RECOMMENDATIONS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
