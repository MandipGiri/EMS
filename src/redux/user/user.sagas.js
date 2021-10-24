import Axios from "axios";
import { takeLatest, call, put, all } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../utilities/APIEndpoints";
import { getUserFailure, getUserSuccess } from "./user.action";
import { UserActionTypes } from "./user.types";

export function* getUser() {
  try {
    const success = yield Axios.get(API_ENDPOINTS.GET_USER);
    const { data } = success;
    yield put(getUserSuccess(data));
  } catch (error) {
    yield put(getUserFailure(error.response));
  }
}

export function* getUserStart() {
  yield takeLatest(UserActionTypes.GET_USER_PROCESSING, getUser);
}

export function* userSaga() {
  yield all([call(getUserStart)]);
}
