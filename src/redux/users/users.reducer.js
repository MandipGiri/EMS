import { UsersActionTypes } from "./users.types";

const initialState = {
  processing: false,
  success: null,
  error: null,

  pendingList: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case UsersActionTypes.GET_USERS_PROCESSING:
      return {
        ...state,
        processing: true,
        error: null,
        pendingList: [],
      };
    case UsersActionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        processing: false,
        success: action.payload,
        error: null,
      };
    case UsersActionTypes.GET_USERS_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload,
      };
    case UsersActionTypes.GET_PENDING_USERS_SUCCESS:
      return {
        ...state,
        pendingList: action.payload,
      };
    case UsersActionTypes.GET_PENDING_USERS_FAILURE:
      return {
        ...state,
        pendingList: [],
      };
    default:
      return state;
  }
};
