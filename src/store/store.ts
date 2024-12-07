import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { userSlice } from 'store/redux/userSlice/userSlice'
import { signInOutSlice } from 'store/redux/signInSlice/signInOutSlice'
import { toolSlice } from 'store/redux/ToolSlice/toolSlice'
import { adminSlice } from 'store/redux/adminSlice/adminSlice'

const rootReducer = combineSlices(
  userSlice,
  signInOutSlice,
  toolSlice,
  adminSlice,
)

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
