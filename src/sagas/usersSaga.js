import { all, call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  GET_MATCH_INFO,
  GET_MATCH_INFO_FAILED,
  GET_MATCH_INFO_SUCCESS,
  GET_POINTS,
  GET_POINTS_SUCCESS,
  GET_VALID_USER,
  GET_VALID_USER_FAILED,
  GET_VALID_USER_SUCCESS,
  UPDATE_MATCHES,
  UPDATE_MATCHES_SUCCESS,
  UPDATE_WINNING_MATCH,
  UPDATE_WINNING_MATCH_SUCCESS,
} from "../actions/actions";
import { userSelector } from "../selectors/user";
import { notification } from "antd";

function* validateUser({ email }) {
  try {
    let userInfo = yield call(
      axios.get,
      "http://localhost:8080/validate-user?emailId=" + email
    );
    yield put({ type: GET_VALID_USER_SUCCESS, data: userInfo.data });
  } catch (error) {
    yield put({ type: GET_VALID_USER_FAILED, message: error.message });
    if (error.response.status === 500) {
      // Show a success notification
      notification.error({
        message: "User is not Registered",
        description: "User is not Registered",
      });
    }
  }
}

const getMatchInfo = (userId) => ({
  type: GET_MATCH_INFO,
  userId,
});

function* sheduleMatches({ userId }) {
  try {
    let matches = yield call(
      axios.get,
      "http://localhost:8080/schedule?userId=" + userId
    );
    yield put({ type: GET_MATCH_INFO_SUCCESS, data: matches.data });
  } catch (error) {
    yield put({ type: GET_MATCH_INFO_FAILED, message: error.message });
  }
}

function* updateMatchesSaga({ updated_matches, selectedTeam, matchId }) {
  try {
    const userdetails = yield select(userSelector);
    const requestBody = {
      matchId: matchId,
      selectedTeam: selectedTeam,
      userId: userdetails.userId,
    };
    console.log("updated_matches", updated_matches);

    const getTeamsForMatchId = (matchId) => {
      const match = updated_matches.find((match) => match.matchId === matchId);
      return match ? `${match.homeTeam} vs ${match.awayTeam}` : null;
    };

    const response = yield call(
      axios.post,
      "http://localhost:8080/select-team",
      requestBody
    );
    if (response.status === 200) {
      // Show a success notification
      notification.success({
        message: "Update Successful",
        description: `${getTeamsForMatchId(
          matchId
        )} - Updated ${selectedTeam} as your team. Good luck!`,
      });
    }
    yield put({ type: UPDATE_MATCHES_SUCCESS, data: updated_matches });
    yield put(getMatchInfo(userdetails.userId));
  } catch (error) {
    //yield put({ type: SET_TABLE_DATA_FAILED, message: error.message });
  }
}

function* updateWinningMatchSaga({ updated_matches, winningTeam, matchId }) {
  try {
    const userdetails = yield select(userSelector);
    const requestBody = {
      matchId: matchId,
      winningTeam: winningTeam,
      userId: userdetails.userId,
    };
    const response = yield call(
      axios.post,
      "http://localhost:8080/winning-team",
      requestBody
    );
    if (response.status === 200) {
      // Show a success notification
      notification.success({
        message: "Update Successful",
        description: "The matches have been successfully updated.",
      });
    }
    yield put({ type: UPDATE_WINNING_MATCH_SUCCESS, data: updated_matches });
    yield put(getMatchInfo(userdetails.userId));
  } catch (error) {
    //yield put({ type: SET_TABLE_DATA_FAILED, message: error.message });
  }
}

function* getPointsSaga() {
  try {
    const points = yield call(axios.get, "http://localhost:8080/points");
    yield put({ type: GET_POINTS_SUCCESS, data: points.data });
  } catch (error) {
    yield put({ type: GET_MATCH_INFO_FAILED, message: error.message });
  }
}

export function* watchUser() {
  yield all([takeLatest(GET_VALID_USER, validateUser)]);
  yield all([takeLatest(GET_MATCH_INFO, sheduleMatches)]);
  yield all([takeLatest(UPDATE_MATCHES, updateMatchesSaga)]);
  yield all([takeLatest(UPDATE_WINNING_MATCH, updateWinningMatchSaga)]);
  yield all([takeLatest(GET_POINTS, getPointsSaga)]);
}
