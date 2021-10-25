import { createSelector } from "reselect";

const selectUsersRoot = (state) => state.users;

export const selectUsers = createSelector(
  [selectUsersRoot],
  (users) => users.success
);

export const selectPendingUsers = createSelector(
  [selectUsersRoot],
  (users) => users.pendingList
);
