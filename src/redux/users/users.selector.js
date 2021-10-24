import { createSelector } from "reselect";

const selectUsersRoot = (state) => state.users;

export const selectUsers = createSelector(
  [selectUsersRoot],
  (users) => users.success
);
