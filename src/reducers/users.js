import {
  GET_MATCH_INFO_FAILED,
  GET_MATCH_INFO_SUCCESS,
  GET_POINTS_SUCCESS,
  GET_VALID_USER_FAILED,
  GET_VALID_USER_SUCCESS,
  RESET_POINTS,
  RESET_UI,
  UPDATE_MATCHES_SUCCESS,
  UPDATE_WINNING_MATCH,
  UPDATE_WINNING_MATCH_SUCCESS,
} from "../actions/actions";

export const initialContacts = {
  user: {},
  message: null,
  matches: [],
  points: [],
  isloading: false,
  isUserLoaded: false,
};

export const userReducer = (state = initialContacts, action) => {
  switch (action.type) {
    case GET_VALID_USER_SUCCESS:
      return { ...state, user: action.data, message: null, isUserLoaded: true };
    case GET_VALID_USER_FAILED:
      return { ...state, message: action.message };
    case GET_MATCH_INFO_SUCCESS:
      return { ...state, matches: action.data };
    case GET_MATCH_INFO_FAILED:
      return { ...state, message: action.message };
    case RESET_UI:
      return { user: {} };
    case UPDATE_MATCHES_SUCCESS:
      return { ...state, matches: action.data };
    case UPDATE_WINNING_MATCH_SUCCESS:
      return { ...state, matches: action.data };
    case GET_POINTS_SUCCESS:
      return { ...state, points: action.data };
    case RESET_POINTS:
      return { ...state, points: [] };
    default:
      return state;
  }
};
