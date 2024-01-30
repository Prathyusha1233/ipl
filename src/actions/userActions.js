import {
  GET_MATCH_INFO,
  GET_POINTS,
  GET_VALID_USER,
  RESET_UI,
  UPDATE_MATCHES,
  UPDATE_WINNING_MATCH,
} from "./actions";

export const validateUser = (email) => {
  return { type: GET_VALID_USER, email };
};

export const sheduleMatches = (userId) => {
  return { type: GET_MATCH_INFO, userId };
};

export const updateMatches = (updated_matches, selectedTeam, matchId) => {
  return { type: UPDATE_MATCHES, updated_matches, selectedTeam, matchId };
};

export const updateWinningMatch = (updated_matches, winningTeam, matchId) => {
  return { type: UPDATE_WINNING_MATCH, updated_matches, winningTeam, matchId };
};

export const getPoints = () => {
  return { type: GET_POINTS };
};

export const resetUI = () => {
  localStorage.removeItem("userDetails");
  return { type: RESET_UI };
};
