import Axios from "axios";

import { takeLatest, call, put, all } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../utilities/APIEndpoints";

import { loginSuccess, loginFailure } from "./login.action";
import { LoginActionTypes } from "./login.types";

export function* login({ email, password }) {
  try {
    const success = yield Axios.post(API_ENDPOINTS.LOGIN, {
      email,
      password,
    });
    console.log(`success`, success);
    const {
      data: { token },
    } = success;
    Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    yield put(loginSuccess(token));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

export function* loginStart() {
  console.log("object");
  yield takeLatest(LoginActionTypes.LOGIN_PROCESSING, login);
}

export function* loginSaga() {
  yield all([call(loginStart)]);
}
