import { UsersActionTypes } from "./users.types";

export const getUsersStart = () => ({
  type: UsersActionTypes.GET_USERS_PROCESSING,
});

export const getUsersSuccess = (data) => ({
  type: UsersActionTypes.GET_USERS_SUCCESS,
  payload: data,
});

export const getUsersFailure = (errorMessage) => ({
  type: UsersActionTypes.GET_USERS_FAILURE,
  payload: errorMessage,
});

export const getPendingUsersStart = () => ({
  type: UsersActionTypes.GET_PENDING_USERS_PROCESSING,
});

export const getPendingUsersSuccess = (data) => ({
  type: UsersActionTypes.GET_PENDING_USERS_SUCCESS,
  payload: data,
});

export const getPendingUsersFailure = (errorMessage) => ({
  type: UsersActionTypes.GET_PENDING_USERS_FAILURE,
  payload: errorMessage,
});
