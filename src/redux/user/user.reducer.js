import { UserActionTypes } from "./user.types";

const initialState = {
  processing: false,
  success: null,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.GET_USER_PROCESSING:
      return {
        ...state,
        processing: true,
        error: null,
      };
    case UserActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        processing: false,
        success: action.payload,
        error: null,
      };
    case UserActionTypes.GET_USER_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
