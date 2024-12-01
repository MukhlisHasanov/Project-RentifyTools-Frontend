// src/store/redux/selectors/userSelectors.ts
import { createSelector } from 'reselect'
// userSelectors.ts
import { RootState } from '../../store';

export const selectToolsData = (state: RootState) => state.tools;

const selectLoginState = (state: any) => state.login_user 

export const selectUserId = createSelector(
  [selectLoginState],
  (userState) => userState.userId
)

export const selectIsAuthenticated = createSelector(
  [selectLoginState],
  (userState) => userState.isAuthenticated
)

export const selectLoginError = createSelector(
  [selectLoginState],
  (userState) => userState.error
)
