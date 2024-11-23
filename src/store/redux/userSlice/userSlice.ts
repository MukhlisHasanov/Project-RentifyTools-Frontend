//v231124  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//v231124  interface UserState {//v231124  
//v231124    data: any
//v231124    error: string | undefined
//v231124    isFetching: boolean
//v231124  }

//v231124  const initialState: UserState = {//v231124  
//v231124    data: null,
//v231124    error: undefined,
//v231124    isFetching: false,
//v231124  }

//v181124 POST-Anfrage an  Backend, um einen Benutzer zu registrieren
//v231124  export const createUser = createAsyncThunk(//v231124  
//v231124    'user/createUser',
//v231124    async (
//v231124      userData: {
//v231124        firstname: string
//v231124        lastname: string
//v231124        email: string
//v231124        phone: string
//v231124        password: string
//v231124      },
//v231124      { rejectWithValue },
//v231124    ) => {
//v231124      try {
//v231124        const response = await fetch('http://localhost:8080/api/users/', {//v171124 <--- hier  zeigt  website fehler '/article/fetch/post/user',
//v231124          
//v231124          method: 'POST',
//v231124          headers: {
//v231124            'Content-Type': 'application/json',
//v231124          },
//v231124          body: JSON.stringify(userData),
//v231124        })

//v231124        if (!response.ok) {
//v231124          const errorData = await response.json()
//v231124          return rejectWithValue(errorData)
//v231124        }
//v231124  
//v231124        const result = await response.json()
//v231124        return result
//v231124      } catch (error) {
//v231124        return rejectWithValue('An error occurred during registration')
//v231124      }
//v231124    },
//v231124  )

//v231124  export const creatTools = createAsyncThunk(
//v231124    'tools/creatTools',
//v231124    async (//v181124 <---- muss status besprochen werden
//v231124      toolData: {//v231124  
//v231124        titel: string
//v231124        description: string
//v231124        status: any
//v231124        image: string
//v231124        password: string
//v231124      },
//v231124      { rejectWithValue },
//v231124    ) => {
    
//v231124      try {
//v231124        const response = await fetch('http://localhost:8080/api/tools/', {
//v231124          method: 'POST',
//v231124          headers: {
//v231124            'Content-Type': 'application/json',
//v231124          },
//v231124          body: JSON.stringify(toolData),
//v231124        })
//v231124  
//v231124        if (!response.ok) {
//v231124          const errorData = await response.json()
//v231124          return rejectWithValue(errorData)
//v231124        }
//v231124  
//v231124        const result = await response.json()
//v231124        return result
//v231124      } catch (error) {
//v231124        return rejectWithValue('Bei einfügen ich ein fehler aufgetreten')
//v231124      }
//v231124    },
//v231124  )

//v231124  export const RentTool = createAsyncThunk(
//v231124  'rents/rentTool',
//v231124  async (
//v231124    rentData: {
//v231124      id: any
//v231124      firstname: string
//v231124      lastname: string
//v231124      email: string
//v231124      phone: string
//v231124      password: string
//v231124    },
//v231124    { rejectWithValue },
//v231124  ) => {
//v231124    try {
//v231124      const response = await fetch(
//v231124        `http://localhost:8080/api/tools/${rentData.id}`,
//v231124        {
//v231124          method: 'POST',
//v231124          headers: {
//v231124            'Content-Type': 'application/json',
//v231124          },
//v231124          body: JSON.stringify(rentData),
//v231124        },
//v231124      )
//v231124
//v231124      if (!response.ok) {
//v231124        const errorData = await response.json()
//v231124        return rejectWithValue(errorData)
//v231124      }
//v231124
//v231124      const result = await response.json()
//v231124      return result
//v231124    } catch (error) {
//v231124      return rejectWithValue('An error occurred during registration')
//v231124    }
//v231124  },
//v231124  )

//v231124  const userSlice = createSlice({
//v231124  name: 'user',
//v231124  initialState,
//v231124  reducers: {},
//v231124  extraReducers: builder => {
//v231124    builder
//v231124      .addCase(createUser.pending, state => {
//v231124   //v231124          state.isFetching = true
//v231124   //v231124          state.error = undefined
//v231124      })
//v231124      .addCase(createUser.fulfilled, (state, action) => {
//v231124   //v231124          state.isFetching = false
//v231124   //v231124          state.data = action.payload
//v231124      })
//v231124      .addCase(createUser.rejected, (state, action) => {
//v231124   //v231124          state.isFetching = false
//v231124   //v231124          state.error = action.payload as string
//v231124      })
//v231124  },
//v231124  })

//v231124  export default userSlice.reducer 
