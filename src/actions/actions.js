const DASHBOARD_PREFIX = "/dashboard";
const HOME_PREFIX = "/";

export const GET_MATCH_INFO = `${DASHBOARD_PREFIX}GET_MATCH_INFO`;
export const GET_MATCH_INFO_SUCCESS = `${DASHBOARD_PREFIX}GET_MATCH_INFO_SUCCESS`;
export const GET_MATCH_INFO_FAILED = `${DASHBOARD_PREFIX}GET_MATCH_INFO_FAILED`;

export const GET_CURRENT_MATCH_INFO = `${DASHBOARD_PREFIX}GET_CURRENT_MATCH_INFO`;
export const GET_CURRENT_MATCH_INFO_SUCCESS = `${DASHBOARD_PREFIX}GET_CURRENT_MATCH_INFO_SUCCESS`;

export const RESET_MATCHES = `${DASHBOARD_PREFIX}RESET_MATCHES`;

export const UPDATE_MATCHES = `${DASHBOARD_PREFIX}UPDATE_MATCHES`;
export const UPDATE_MATCHES_SUCCESS = `${DASHBOARD_PREFIX}UPDATE_MATCHES_SUCCESS`;

export const RESET_UI = `${DASHBOARD_PREFIX}RESET_UI`;

export const GET_VALID_USER = `${HOME_PREFIX}GET_VALID_USER`;
export const GET_VALID_USER_SUCCESS = `${HOME_PREFIX}GET_VALID_USER_SUCCESS`;
export const GET_VALID_USER_FAILED = `${HOME_PREFIX}GET_VALID_USER_FAILED`;

export const UPDATE_WINNING_MATCH = `${DASHBOARD_PREFIX}UPDATE_WINNING_MATCH`;
export const UPDATE_WINNING_MATCH_SUCCESS = `${DASHBOARD_PREFIX}UPDATE_WINNING_MATCH_SUCCESS`;

export const GET_POINTS = `${DASHBOARD_PREFIX}GET_POINTS`;
export const GET_POINTS_SUCCESS = `${DASHBOARD_PREFIX}GET_POINTS_SUCCESS`;
export const RESET_POINTS = `${DASHBOARD_PREFIX}RESET_POINTS`;

export const SET_SESSION_EXPIRED = `${HOME_PREFIX}SET_SESSION_EXPIRED`;
