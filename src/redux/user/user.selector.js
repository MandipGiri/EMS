import { createSelector } from "reselect";
import { getInitials } from "../../utilities/helpers/NameHelper";

const selectUserRoot = (state) => state.user;

export const selectUser = createSelector(
  [selectUserRoot],
  (user) => user.success
);

export const selectUserInitials = createSelector([selectUser], (user) =>
  getInitials(user?.fullName ?? "")
);
