// import { createAppSlice } from 'store/createAppSlice'
// import { UserSliceInitialState, User } from './types'
// import { PayloadAction } from '@reduxjs/toolkit'

// export const UserInitialState: UserSliceInitialState = {
//   data: [],
//   error: undefined,
//   isFetching: false,
// }

// export const userSlice = createAppSlice({
//   name: 'User',
//   initialState: UserInitialState,
//   reducers: create => ({
//     createUser: create.asyncThunk<User, { name: string }>(
//       async ({ name }, { rejectWithValue }) => {
//         const USER_API_URL: string = '/api/users/'
//         const response = await fetch(USER_API_URL)

//         const result = await response.json()
//         console.log(response.ok)
//         if (response.ok) {
//           return result
//         } else {
//           console.log(result)
//           rejectWithValue(result)
//         }
//       },
//       {
//         pending: (state: UserSliceInitialState) => {
//           state.isFetching = true
//           state.error = undefined
//         },
//         fulfilled: (
//           state: UserSliceInitialState,
//           action: PayloadAction<any>,
//         ) => {
//           state.data = [...state.data, {...
//             id: action.payload.id,
//             firstname: action.payload.firstname,
//             lastname: action.payload.lastname,
//             email: action.payload.email,
//             password: action.payload.password
//           },]
//         },
//         rejected: () => {},
//       },
//     ),
//   }),
// })
