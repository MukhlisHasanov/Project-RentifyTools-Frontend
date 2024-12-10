import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { userSlice } from 'store/redux/userSlice/userSlice'
import { signInOutSlice } from 'store/redux/signInSlice/signInOutSlice'
import { categorySlice } from './redux/CategorySlice/categorySlice'
import { toolSlice } from './redux/ToolSlice/toolSlice'
import { messageSlice } from './redux/MessageSlice/messageSlice'
// import { addAdvertSlice } from 'store/redux/addAdvert/addAdvertSlice'

const rootReducer = combineSlices(
  userSlice,
  signInOutSlice,
  toolSlice,
  categorySlice,
  messageSlice,
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
