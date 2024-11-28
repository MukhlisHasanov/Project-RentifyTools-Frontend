import { createAppSlice } from 'store/createAppSlice'

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
          // const decoded = jwtDecode<TokenPayLoad>(action.payload.accessToken)
          localStorage.setItem('accessToken', action.payload.accessToken)
          localStorage.setItem('refreshToken', action.payload.refreshToken)
          // localStorage.setItem("userId", decoded.sub.toString())
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
      localStorage.removeItem("userObj")
      state.isAuthenticated = false
      state.error = undefined
    }),
    getUserById: create.asyncThunk(
      async (userId: number, { rejectWithValue }) => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) throw new Error('Access token is missing');
    
          const response = await fetch(`/api/users/${userId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
    
          const result = await response.json();
          if (!response.ok) {
            return rejectWithValue(result.message || 'Failed to fetch user data');
          }
    
          return result;
        } catch (error) {
          return rejectWithValue('Network error or server is unavailable')
        }
      },
      {
        pending: (state: LoginInitialState) => {
          state.isLoading = true;
          state.error = undefined;
        },
        fulfilled: (state: LoginInitialState, action) => {
          localStorage.setItem('userObj', JSON.stringify(action.payload));
          state.isLoading = false;
          state.error = undefined;
        },
        rejected: (state: LoginInitialState, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        },
      }
    ),    
  }),
  selectors: {
    login_user: (state: LoginInitialState) => state,
  },
})

export const signInOutSliceAction = signInOutSlice.actions
export const signInOutSliceSelectors = signInOutSlice.selectors