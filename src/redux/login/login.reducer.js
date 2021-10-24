import { LoginActionTypes } from "./login.types";

const initialState = {
  processing: false,
  success: null,
  error: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LoginActionTypes.LOGIN_PROCESSING:
      return {
        ...state,
        processing: true,
        success: null,
        error: null,
      };
    case LoginActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        processing: false,
        success: action.payload,
        error: null,
      };
    case LoginActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        processing: false,
        success: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
