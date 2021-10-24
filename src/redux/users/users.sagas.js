import Axios from "axios";
import { takeLatest, call, put, all } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../utilities/APIEndpoints";
import { getUsersFailure, getUsersSuccess } from "./users.action";
import { UsersActionTypes } from "./users.types";

export function* getUsers() {
  try {
    const success = yield Axios.get(API_ENDPOINTS.GET_ALL_USERS);
    console.log(`success`, success)
    const { data } = success;
    yield put(getUsersSuccess(data));
  } catch (error) {
    yield put(getUsersFailure(error.response));
  }
}

export function* getUsersStart() {
  yield takeLatest(UsersActionTypes.GET_USERS_PROCESSING, getUsers);
}

export function* usersSaga() {
  yield all([call(getUsersStart)]);
}
