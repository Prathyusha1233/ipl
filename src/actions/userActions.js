import {
  GET_MATCH_INFO,
  GET_POINTS,
  GET_VALID_USER,
  RESET_UI,
  UPDATE_MATCHES,
  UPDATE_WINNING_MATCH,
  GET_CURRENT_MATCH_INFO,
  RESET_MATCHES,
} from "./actions";

export const validateUser = ({ payload }) => {
  return { type: GET_VALID_USER, payload };
};

export const scheduleMatches = (userId) => {
  return { type: GET_MATCH_INFO, userId };
};

export const currentScheduleMatches = (userId) => {
  return { type: GET_CURRENT_MATCH_INFO, userId };
};

export const resetMatches = () => {
  return { type: RESET_MATCHES };
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

export const resetPoints = () => {
  return { type: GET_POINTS };
};

export const resetUI = () => {
  return { type: RESET_UI };
};
