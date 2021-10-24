import { UsersActionTypes } from "./users.types";

const initialState = {
  processing: false,
  success: null,
  error: null,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case UsersActionTypes.GET_USERS_PROCESSING:
      return {
        ...state,
        processing: true,
        error: null,
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
    default:
      return state;
  }
};
