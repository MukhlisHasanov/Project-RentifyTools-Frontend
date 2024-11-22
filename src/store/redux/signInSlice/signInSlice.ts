import { createAppSlice } from 'store/createAppSlice'
import {jwtDecode} from "jwt-decode";

import { LoginInitialState, LoginRequestDto, TokenPayLoad } from './types'

const loginDataInitialState: LoginInitialState = {
  userId: null,
  isLoading: false,
  isAuthenticated: false,
  error: undefined,
}

export const signInOutSlice = createAppSlice({
  name: 'LOGIN_USER',
  initialState: loginDataInitialState,
  reducers: create => ({
    loginUser: create.asyncThunk(
      async (loginData: LoginRequestDto, { rejectWithValue }) => {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
          })

          const result = await response.json()
          if (!response.ok) {
            return rejectWithValue(
              result.message || 'Incorrect user password or email',
            )
          }
          return result
        } catch (error) {
          return rejectWithValue('Network error or server is unavailable')
        }
      },
      {
        pending: (state: LoginInitialState) => {
          state.isLoading = true
          state.isAuthenticated = false
          state.error = undefined
        },
        fulfilled: (state: LoginInitialState, action) => {
          const decoded = jwtDecode<TokenPayLoad>(action.payload.accessToken)
          localStorage.setItem('accessToken', action.payload.accessToken)
          localStorage.setItem('refreshToken', action.payload.refreshToken)
          localStorage.setItem("userId", decoded.sub.toString())
          state.isLoading = false
          state.isAuthenticated = true
          state.error = undefined
        },
        rejected: (state: LoginInitialState, action) => {
          state.isLoading = false
          state.isAuthenticated = false
          state.error = action.payload as string
        },
      },
    ),
    logoutUser: create.reducer((state: LoginInitialState) => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem("userId")
      state.isAuthenticated = false
      state.error = undefined
    }),
  }),
  selectors: {
    login_user: (state: LoginInitialState) => state,
  },
})

export const signInOutSliceAction = signInOutSlice.actions
export const signInOutSliceSelectors = signInOutSlice.selectors