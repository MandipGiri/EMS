import Axios from "axios";
import { takeLatest, call, put, all } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../utilities/APIEndpoints";
import {
  getPendingUsersFailure,
  getPendingUsersSuccess,
  getUsersFailure,
  getUsersSuccess,
} from "./users.action";
import { UsersActionTypes } from "./users.types";

export function* getUsers() {
  try {
    const success = yield Axios.get(API_ENDPOINTS.GET_ALL_USERS);

    const { data } = success;
    yield put(getUsersSuccess(data));
  } catch (error) {
    yield put(getUsersFailure(error.response));
  }
}

export function* getUsersStart() {
  yield takeLatest(UsersActionTypes.GET_USERS_PROCESSING, getUsers);
}

export function* getPendingUsers() {
  try {
    const success = yield Axios.get(API_ENDPOINTS.GET_ALL_PENDING_USERS);
    const { data } = success;
    yield put(getPendingUsersSuccess(data));
  } catch (error) {
    yield put(getPendingUsersFailure(error.response));
  }
}

export function* getPendingUsersStart() {
  yield takeLatest(
    UsersActionTypes.GET_PENDING_USERS_PROCESSING,
    getPendingUsers
  );
}

export function* usersSaga() {
  yield all([call(getUsersStart), call(getPendingUsersStart)]);
}
