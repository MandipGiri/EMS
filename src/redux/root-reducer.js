import { combineReducers } from "redux";
import { loginReducer } from "./login/login.reducer";
import { userReducer } from "./user/user.reducer";
import { usersReducer } from "./users/users.reducer";

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  users:usersReducer
});

export default rootReducer;
