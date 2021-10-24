import { LoginActionTypes } from "./login.types";

export const loginStart = (email, password) => ({
  type: LoginActionTypes.LOGIN_PROCESSING,
  email,
  password,
});

export const loginSuccess = (data) => ({
  type: LoginActionTypes.LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error) => ({
  type: LoginActionTypes.LOGIN_FAILURE,
  payload: error,
});
