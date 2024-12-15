import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { userSlice } from 'store/redux/userSlice/userSlice'
import { signInOutSlice } from 'store/redux/signInSlice/signInOutSlice'
import { categorySlice } from './redux/categorySlice/categorySlice'
import { toolSlice } from './redux/toolSlice/toolSlice'
import { adminSlice } from 'store/redux/adminSlice/adminSlice'

// import { addAdvertSlice } from 'store/redux/addAdvert/addAdvertSlice'
import { messageSlice } from './redux/messageSlice/messageSlice'
import { addressSlice } from '../store/redux/AddressSlice/addressSlice'

const rootReducer = combineSlices(
  userSlice,
  signInOutSlice,
  toolSlice,
  adminSlice,
  categorySlice,
  messageSlice,
  addressSlice,
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
