import { createAppSlice } from 'store/createAppSlice'

import {
  SearchUserRequestDto,
  SearchUserResponseDto,
  SearchUserInitialState,
} from './types'

const searchUserDataInitialState: SearchUserInitialState = {
  userData: undefined,
  foundUsers: [],
  isLoading: false,
  error: undefined,
}

export const adminSlice = createAppSlice({
  name: 'ADMIN',
  initialState: searchUserDataInitialState,
  reducers: create => ({
    searchUsers: create.asyncThunk(
      async (
        searchParams: SearchUserRequestDto,
        { rejectWithValue, getState },
      ) => {
        try {
          console.log('Request Body:', searchParams)
          const response = await fetch('/api/users/search', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchParams),
          })

          const result = await response.json()

          if (!response.ok) {
            return rejectWithValue(result.message || 'Failed to find user')
          }
          //   if (!Array.isArray(result)) {
          //     return rejectWithValue('Unexpected server response');
          //   }
          return result as SearchUserResponseDto
        } catch (error) {
          return rejectWithValue('An unexpected error occurred')
        }
      },
      {
        pending: (state: SearchUserInitialState) => {
          state.error = undefined
          state.isLoading = true
        },
        fulfilled: (state: SearchUserInitialState, action) => {
          console.log('Payload received:', action.payload)
          state.isLoading = false
          state.userData = action.payload
          state.foundUsers.push(action.payload)
          state.error = undefined
        },
        rejected: (state: SearchUserInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),
    getAllUsers: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const response = await fetch('/api/users', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json',
            },
          })
          const result = await response.json()
          if (!response.ok) {
            return rejectWithValue(result.message || 'Failed to load users')
          }
          if (!Array.isArray(result)) {
            return rejectWithValue('Unexpected server response')
          }
          return result
        } catch (error) {
          return rejectWithValue('An unexpected error occurred')
        }
      },
      {
        pending: (state: SearchUserInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: SearchUserInitialState, action) => {
          state.isLoading = false
          state.foundUsers = action.payload
        },
        rejected: (state: SearchUserInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),
    deleteUser: create.asyncThunk(
      async (userId: string, { rejectWithValue }) => {
        const response = await fetch(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          method: 'DELETE',
        })

        if (!response.ok) {
          const result = await response.json()
          return rejectWithValue(result.message || 'Failed to delete user')
        }
        return 'User deleted successfully'
      },
      {
        pending: (state: SearchUserInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: SearchUserInitialState, action) => {
          state.isLoading = false
          state.foundUsers = state.foundUsers.filter(
            user => user.id !== action.payload,
          )
        },
        rejected: (state: SearchUserInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),
  }),
  selectors: {
    search_users: (state: SearchUserInitialState) => ({
      userData: state.userData,
      foundUsers: state.foundUsers,
      isLoading: state.isLoading,
      error: state.error,
    }),
  },
})

export const adminSliceAction = adminSlice.actions
export const adminSliceSelectors = adminSlice.selectors
