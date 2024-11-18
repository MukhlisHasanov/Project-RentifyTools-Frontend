import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { registerUser } from 'store/redux/signUpSlice/signUpSlice' 
// import { userSlice } from 'store/redux/userSlice/userSlice'

const rootReducer = combineSlices(registerUser)

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
  reducer: {
    user: userReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
