import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface UserState {
  data: any
  error: string | undefined
  isFetching: boolean
}

const initialState: UserState = {
  data: null,
  error: undefined,
  isFetching: false,
}

//v181124 POST-Anfrage an  Backend, um einen Benutzer zu registrieren
export const createUser = createAsyncThunk(
  'user/createUser',
  async (
    userData: {
      firstname: string
      lastname: string
      email: string
      phone: string
      password: string
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch('http://localhost:8080/api/users/', {//v171124 <--- hier  zeigt  website fehler '/article/fetch/post/user',
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData)
      }

      const result = await response.json()
      return result
    } catch (error) {
      return rejectWithValue('An error occurred during registration')
    }
  },
)

export const creatTools = createAsyncThunk(
  'tools/creatTools',
  async (//v181124 <---- muss status besprochen werden
    toolData: {
      titel: string
      description: string
      status: any
      image: string
      password: string
    },
    { rejectWithValue },
  ) => {
    
    try {
      const response = await fetch('http://localhost:8080/api/tools/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toolData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData)
      }

      const result = await response.json()
      return result
    } catch (error) {
      return rejectWithValue('Bei einfügen ich ein fehler aufgetreten')
    }
  },
)

export const RentTool = createAsyncThunk(
  'rents/rentTool',
  async (
    rentData: {
      id: any
      firstname: string
      lastname: string
      email: string
      phone: string
      password: string
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/tools/${rentData.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rentData),
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData)
      }

      const result = await response.json()
      return result
    } catch (error) {
      return rejectWithValue('An error occurred during registration')
    }
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createUser.pending, state => {
        state.isFetching = true
        state.error = undefined
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isFetching = false
        state.data = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isFetching = false
        state.error = action.payload as string
      })
  },
})

export default userSlice.reducer

