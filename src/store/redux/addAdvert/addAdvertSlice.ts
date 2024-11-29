import { PayloadAction } from '@reduxjs/toolkit'

import { createAppSlice } from 'store/createAppSlice'

import {
  AdvertRequestDto,
  AdvertInitialState,
  AdvertResponseDto,
} from './types'

const advertDataInitialState: AdvertInitialState = {
  adverts: [],
  images: [],
  dataAdv: undefined,
  isLoading: false,
  error: undefined,
}

const token = localStorage.getItem('accessToken')

export const addAdvertSlice = createAppSlice({
  name: 'ADD_ADVERT',
  initialState: advertDataInitialState,
  reducers: create => ({
    createAdvert: create.asyncThunk(
      async (advertData: AdvertRequestDto, { rejectWithValue }) => {
        try {
          const response = await fetch('/api/tools', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(advertData),
          })

          const result = await response.json()
          if (!response.ok) {
            return rejectWithValue(result.message || 'Failed to create advert')
          }
          return result as AdvertResponseDto
        } catch (error) {
          return rejectWithValue('Network error or server is unavailable')
        }
      },
      {
        pending: (state: AdvertInitialState) => {
          state.dataAdv = undefined
          state.error = undefined
          state.isLoading = true
        },
        fulfilled: (state: AdvertInitialState, action) => {
          state.isLoading = false
          state.dataAdv = {
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            status: action.payload.status,
            image: action.payload.image,
            price: action.payload.price,
          }
          state.adverts.push({
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            status: action.payload.status,
            image: action.payload.image,
            price: action.payload.price,
          })
          state.error = undefined
        },
        rejected: (state: AdvertInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),
    //посмотреть все мои объявления
    fetchUserAdverts: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const response = await fetch('api/tools/my', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ' + token,
            },
          })
          const result = await response.json()
          if (!response.ok) {
            return rejectWithValue(
              result.message || 'Failed to fetch user adverts',
            )
          }
          console.log(result)
          return result as AdvertResponseDto[]
        } catch (error) {
          return rejectWithValue('Network error or server is unavailable')
        }
      },
      {
        pending: (state: AdvertInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: AdvertInitialState, action) => {
          state.isLoading = false
          state.adverts = action.payload.map(advert => ({
            id: advert.id,
            title: advert.title,
            description: advert.description,
            status: advert.status,
            image: advert.image,
            price: advert.price,
          }))
          state.error = undefined
        },
        rejected: (state: AdvertInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    updateAdvert: create.asyncThunk(
      async (
        { id, advert }: { id: string; advert: AdvertRequestDto },
        { rejectWithValue },
      ) => {
        try {
          const response = await fetch(`/api/tools/${id}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(advert),
          })

          const result = await response.json()
          if (!response.ok) {
            return rejectWithValue(result.message || 'Failed to update advert')
          }
          console.log(result)
          return result as AdvertResponseDto
        } catch (error) {
          return rejectWithValue('Network error or server is unavailable')
        }
      },
      {
        pending: (state: AdvertInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: AdvertInitialState, action) => {
          state.isLoading = false
          const updatedAdvert = action.payload
          state.adverts = state.adverts.map(advert =>
            advert.id === updatedAdvert.id ? updatedAdvert : advert,
          )
          state.error = undefined
        },
        rejected: (state: AdvertInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    deleteAdvert: create.asyncThunk(
      async (id: string, { rejectWithValue }) => {
        try {
          const response = await fetch(`/api/tools/${id}`, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ' + token,
            },
          })

          if (!response.ok) {
            const result = await response.json()
            return rejectWithValue(result.message || 'Failed to delete advert')
          }
          return id
        } catch (error) {
          return rejectWithValue('Network error or server is unavailable')
        }
      },
      {
        pending: (state: AdvertInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: AdvertInitialState, action) => {
          state.isLoading = false
          state.adverts = state.adverts.filter(
            advert => advert.id !== action.payload,
          )
          state.error = undefined
        },
        rejected: (state: AdvertInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),
  }),
  selectors: {
    adverts_data: (state: AdvertInitialState) => ({
      adverts: state.dataAdv,
      isLoading: state.isLoading,
      error: state.error,
    }),

    userAdverts_data: (state: AdvertInitialState) => ({
      userAdverts: state.adverts,
      isLoading: state.isLoading,
      error: state.error,
    }),
  },
})

export const addAdvertSliceAction = addAdvertSlice.actions
export const addAdvertSliceSelectors = addAdvertSlice.selectors

// saveAdvertData: create.reducer((state: AdvertInitialState) => {
//   state.adverts = state.dataAdv
//     ? [...state.adverts, state.dataAdv]
//     : state.adverts
//   state.dataAdv = undefined
// }),
// addAdvert: create.reducer(
//   (state: AdvertInitialState, action: PayloadAction<AdvertResponseDto>) => {
//     state.adverts = [
//       ...state.adverts,
//       {
//         id: action.payload.id,
//         title: action.payload.title,
//         description: action.payload.description,
//         status: action.payload.status,
//         image: action.payload.image,
//         price: action.payload.price,
//       },
//     ]
//   },
// ),
// deleteAdvert: create.reducer(
//   (state: AdvertInitialState, action: PayloadAction<string>) => {
//     state.adverts = [...state.adverts].filter(
//       (advert: AdvertResponseDto) => advert.id !== action.payload,
//     )
//   },
// ),
// updateAdvert: create.reducer(
//   (state: AdvertInitialState, action: PayloadAction<AdvertResponseDto>) => {
//     const index = state.adverts.findIndex(
//       advert => advert.id === action.payload.id,
//     )
//     if (index !== -1) {
//       state.adverts[index] = {
//         ...state.adverts[index],
//         ...action.payload,
//       }
//     }
//   },
// ),
// findAdvertById: create.reducer(
//   (state: AdvertInitialState, action: PayloadAction<string>) => {
//     const advert = state.adverts.find(
//       advert => advert.id === action.payload,
//     )
//     if (!advert) {
//       state.error = 'Advert not found'
//     }
//   },
// ),
// addImage: create.reducer(
//   (state: AdvertInitialState, action: PayloadAction<string>) => {
//     state.images.push(action.payload);
//   }
// ),
// clearImages: create.reducer((state: AdvertInitialState) => {
//   state.images = [];
// }),
// }),
// selectors: {
// adverts: (state: AdvertInitialState) => state,
// advertById: (state: AdvertInitialState) => (id: string) =>
//   state.adverts.find(advert => advert.id === id),
// },
