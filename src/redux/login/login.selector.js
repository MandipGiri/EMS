import {createSelector} from 'reselect';

const loginRoot = (state) => state.login;

export const selectLogin = createSelector(
  [loginRoot],
  (login) => login,
);
