import {
  GET_CURRENT_MATCH_INFO_SUCCESS,
  GET_MATCH_INFO_FAILED,
  GET_MATCH_INFO_SUCCESS,
  GET_POINTS_SUCCESS,
  GET_VALID_USER_FAILED,
  GET_VALID_USER_SUCCESS,
  RESET_POINTS,
  RESET_UI,
  UPDATE_MATCHES_SUCCESS,
  UPDATE_WINNING_MATCH_SUCCESS,
  RESET_MATCHES,
  SET_SESSION_EXPIRED,
} from "../actions/actions";

export const initialContacts = {
  user: sessionStorage.getItem("userData")
    ? JSON.parse(sessionStorage.getItem("userData"))
    : {},
  message: null,
  matches: [],
  current_matches: [],
  points: [],
  isloading: false,
  isUserLoaded: false,
  error: null,
  isSessionExpired: true,
};

export const userReducer = (state = initialContacts, action) => {
  switch (action.type) {
    case GET_VALID_USER_SUCCESS:
      return { ...state, user: action.data };
    case GET_VALID_USER_FAILED:
      return { ...state, message: action.message };
    case GET_MATCH_INFO_SUCCESS:
      return { ...state, matches: action.data };
    case GET_CURRENT_MATCH_INFO_SUCCESS:
      return { ...state, current_matches: action.data };
    case GET_MATCH_INFO_FAILED:
      return { ...state, error: action.message };
    case RESET_UI:
      sessionStorage.removeItem("userData");
      return { ...state, user: {} };
    case UPDATE_MATCHES_SUCCESS:
      return { ...state, matches: action.data };
    case UPDATE_WINNING_MATCH_SUCCESS:
      return { ...state, matches: action.data };
    case GET_POINTS_SUCCESS:
      return { ...state, points: action.data };
    case RESET_POINTS:
      return { ...state, points: [] };
    case RESET_MATCHES:
      return { ...state, matches: [], current_matches: [] };
    case SET_SESSION_EXPIRED:
      return {
        ...state,
        isSessionExpired: action.expired,
      };
    default:
      return state;
  }
};
