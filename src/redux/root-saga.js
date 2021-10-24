import { all, call } from "redux-saga/effects";
import { loginSaga } from "./login/login.sagas";
import { userSaga } from "./user/user.sagas";
import { usersSaga } from "./users/users.sagas";

export function* rootSaga() {
  yield all([call(loginSaga), call(userSaga), call(usersSaga)]);
}
