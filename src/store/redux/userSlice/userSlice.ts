
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


interface UserState {
  data: any; 
  error: string | undefined;
  isFetching: boolean;
}

const initialState: UserState = {
  data: null,
  error: undefined,
  isFetching: false,
}

//v181124 POST-Anfrage an  Backend, um einen Benutzer zu registrieren
export const createUser = createAsyncThunk(
  'user/createUser', 
  async (userData: { firstname: string; lastname: string; email: string; phone: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/api/users/', {          //v171124 <--- hier  zeigt  website fehler '/article/fetch/post/user',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData); 
      }

      const result = await response.json();
      return result; 
    } catch (error) {
      return rejectWithValue('An error occurred during registration'); 
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isFetching = true;
        state.error = undefined;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = action.payload; 
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as string; 
      });
  }
});

export default userSlice.reducer;



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
//         const USER_API_URL: string = 'http://77.237.244.113:8080/api/users'
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
