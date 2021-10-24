import {UserActionTypes} from './user.types';

export const getUserStart = () => ({
  type: UserActionTypes.GET_USER_PROCESSING,
});

export const getUserSuccess = (data) => ({
  type: UserActionTypes.GET_USER_SUCCESS,
  payload: data,
});

export const getUserFailure = (errorMessage) => ({
  type: UserActionTypes.GET_USER_FAILURE,
  payload: errorMessage,
});
