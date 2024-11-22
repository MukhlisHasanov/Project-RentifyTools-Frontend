import { createAppSlice } from 'store/createAppSlice'

import { UserRequestDto, UserResponseDto, UserInitialState } from './types'

const userDataInitialState: UserInitialState = {
  userObj: undefined,
  isLoading: false,
  error: undefined,
}

export const signUpSlice = createAppSlice({
  name: 'REGISTER_USER',
  initialState: userDataInitialState,
  reducers: create => ({
    createUser: create.asyncThunk(
      async (userData: UserRequestDto, { rejectWithValue }) => {
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          })

          const result = await response.json()
          if (!response.ok) {
            return rejectWithValue(result.message || 'Failed to register user')
          }
          return result
        } catch (error) {
          return rejectWithValue('Network error or server is unavailable')
        }
      },
      {
        pending: (state: UserInitialState) => {
          state.userObj = undefined
          state.error = undefined
          state.isLoading = true
        },
        fulfilled: (state: UserInitialState, action) => {
          state.isLoading = false
          state.userObj = {
            id: action.payload.id,
            firstname: action.payload.firstname,
            lastname: action.payload.lastname,
            email: action.payload.email,
            phone: action.payload.phone,
          }
        },
        rejected: (state: UserInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),
  }),
  selectors: {
    register_user: (state: UserInitialState) => state,
  },
})

export const signUpSliceAction = signUpSlice.actions
export const signUpSliceSelectors = signUpSlice.selectors
