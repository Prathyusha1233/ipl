import { all, call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  GET_CURRENT_MATCH_INFO,
  GET_CURRENT_MATCH_INFO_SUCCESS,
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
import { resetUI } from "../actions/userActions";

const baseUrl = "http://3.141.196.2:8080/";

function* validateUser({ payload }) {
  try {
    let userInfo = yield call(
      axios.get,
      `${baseUrl}validate-user?emailId=${payload.email}&pin=${payload.password}`
    );
    yield put({ type: GET_VALID_USER_SUCCESS, data: userInfo.data });
  } catch (error) {
    yield put({ type: GET_VALID_USER_FAILED, message: error.message });
    if (error.response.status === 500) {
      notification.error({
        message: "User is not Registered",
        description: "User is not Registered",
      });
    }
    if (error) {
      notification.error({
        message: "Validate User Failed",
        description: `${error.response.data.message}`,
      });
    }
    // if (error.response.data.message === "Invalid Token") {
    //   notification.error({
    //     message: "Session Expired, Please login",
    //   });
    //   resetUI();
    // }
  }
}

const getMatchInfo = (userId) => ({
  type: GET_MATCH_INFO,
  userId,
});

const getCurrentMatchInfo = (userId) => ({
  type: GET_CURRENT_MATCH_INFO,
  userId,
});

function* scheduleMatches({ token }) {
  try {
    let matches = yield call(axios.get, `${baseUrl}schedule`, {
      headers: {
        token: `${token}`,
      },
    });
    yield put({ type: GET_MATCH_INFO_SUCCESS, data: matches.data });
  } catch (error) {
    yield put({
      type: GET_MATCH_INFO_FAILED,
      message: error.response.data.message,
    });
    if (error) {
      notification.error({
        message: "Failed to Get the Matches",
        description: `${error.response.data.message}`,
      });
    }
    // if (error.response.data.message === "Invalid Token") {
    //   notification.error({
    //     message: "Session Expired, Please login",
    //   });
    //   resetUI();
    // }
  }
}

function* currentScheduleMatches({ token }) {
  try {
    let current_matches = yield call(axios.get, `${baseUrl}current-schedule`, {
      headers: {
        token: `${token}`,
      },
    });
    yield put({
      type: GET_CURRENT_MATCH_INFO_SUCCESS,
      data: current_matches.data,
    });
  } catch (error) {
    yield put({
      type: GET_MATCH_INFO_FAILED,
      message: error.response.data.message,
    });
    if (error) {
      notification.error({
        message: "Failed to Get Current Matches",
        description: `${error.response.data.message}`,
      });
    }
    // if (error.response.data.message === "Invalid token") {
    //   notification.error({
    //     message: "Session Expired, Please login",
    //   });
    //   resetUI();
    // }
  }
}

function* updateMatchesSaga({
  updated_matches,
  selectedTeam,
  matchId,
  activeTab,
}) {
  try {
    const userdetails = yield select(userSelector);
    const requestBody = {
      matchId: matchId,
      selectedTeam: selectedTeam,
      userId: userdetails.userId,
    };

    const getTeamsForMatchId = (matchId) => {
      const match = updated_matches.find((match) => match.matchId === matchId);
      return match ? `${match.homeTeam} vs ${match.awayTeam}` : null;
    };

    const response = yield call(
      axios.post,
      `${baseUrl}select-team`,
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
    if (activeTab === "next5matches") {
      yield put(getCurrentMatchInfo(userdetails.userId));
    } else yield put(getMatchInfo(userdetails.userId));
  } catch (error) {
    yield put({
      type: GET_MATCH_INFO_FAILED,
      message: error.response.data.message,
    });
    if (error) {
      notification.error({
        message: "Update Matches Failed",
        description: `${error.response.data.message}`,
      });
    }
    if (error.response.data.message === "Invalid Token") {
      notification.error({
        message: "Session Expired, Please login",
      });
      resetUI();
    }
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
      `${baseUrl}winning-team`,
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
    yield put({
      type: GET_MATCH_INFO_FAILED,
      message: error.response.data.message,
    });
    if (error) {
      notification.error({
        message: "Update Winning Match Failed",
        description: `${error.response.data.message}`,
      });
    }
    if (error.response.data.message === "Invalid Token") {
      notification.error({
        message: "Session Expired, Please login",
      });
      resetUI();
    }
  }
}

function* getPointsSaga() {
  try {
    const points = yield call(axios.get, `${baseUrl}points`);
    yield put({ type: GET_POINTS_SUCCESS, data: points.data });
  } catch (error) {
    yield put({
      type: GET_MATCH_INFO_FAILED,
      message: error.response.data.message,
    });
    if (error) {
      notification.error({
        message: "Get Points Failed",
        description: `${error.response.data.message}`,
      });
    }
    // if (error.response.data.message === "Invalid Token") {
    //   notification.error({
    //     message: "Session Expired, Please login",
    //   });
    //   resetUI();
    // }
  }
}

export function* watchUser() {
  yield all([takeLatest(GET_VALID_USER, validateUser)]);
  yield all([takeLatest(GET_MATCH_INFO, scheduleMatches)]);
  yield all([takeLatest(GET_CURRENT_MATCH_INFO, currentScheduleMatches)]);
  yield all([takeLatest(UPDATE_MATCHES, updateMatchesSaga)]);
  yield all([takeLatest(UPDATE_WINNING_MATCH, updateWinningMatchSaga)]);
  yield all([takeLatest(GET_POINTS, getPointsSaga)]);
}
