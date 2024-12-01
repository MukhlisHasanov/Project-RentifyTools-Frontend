import { jwtDecode } from 'jwt-decode'

import { createAppSlice } from 'store/createAppSlice'

import { LoginInitialState, LoginRequestDto } from './types'

const loginDataInitialState: LoginInitialState = {
  user: undefined,
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
              result.message || 'Incorrect password or email address',
            )
          }
          return result
        } catch (error) {
          return rejectWithValue('Incorrect password or email address')
        }
      },
      {
        pending: (state: LoginInitialState) => {
          state.isLoading = true
          state.isAuthenticated = false
          state.error = undefined
        },
        fulfilled: (state: LoginInitialState, action) => {
          localStorage.setItem('accessToken', action.payload.accessToken)
          localStorage.setItem('refreshToken', action.payload.refreshToken)
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
      state.user = undefined
      state.isAuthenticated = false
      state.error = undefined
    }),
    getCurrentUser: create.asyncThunk(
      async (_: void, { rejectWithValue }) => {
        const response = await fetch('/api/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        })

        const result = await response.json()
        if (!response.ok) {
          return rejectWithValue(result.message || 'Failed to register user')
        }
        return result
      },
      {
        pending: (state: LoginInitialState) => {
          state.user = undefined
          state.error = undefined
          state.isLoading = true
        },
        fulfilled: (state: LoginInitialState, action) => {
          state.isLoading = false
          state.user = action.payload
        },
        rejected: (state: LoginInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),
  }),
  selectors: {
    login_user: (state: LoginInitialState) => state,
    currentUser: (state: LoginInitialState) => ({
      user: state.user,
      error: state.error,
    }),
  },
})

export const signInOutSliceAction = signInOutSlice.actions
export const signInOutSliceSelectors = signInOutSlice.selectors
