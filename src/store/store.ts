import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { signUpSlice } from 'store/redux/signUpSlice/signUpSlice'
import { addAdvertSlice } from 'store/redux/addAdvert/addAdvertSlice'
import { signInSlice } from 'store/redux/signInSlice/signInSlice'
// import { userSlice } from 'store/redux/userSlice/userSlice'

const rootReducer = combineSlices(signUpSlice, addAdvertSlice, signInSlice)

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  })
  return store
}

export const store = makeStore()
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
