import { PayloadAction } from '@reduxjs/toolkit'

import { createAppSlice } from 'store/createAppSlice'

import {
  AdvertRequestDto,
  AdvertInitialState,
  AdvertResponseDto,
} from './types'

const advertDataInitialState: AdvertInitialState = {
  adverts: [],
  dataAdv: undefined,
  images:[],
  error: undefined,
  isLoading: false,
}
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
          return result
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
        },
        rejected: (state: AdvertInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),
    saveAdvertData: create.reducer((state: AdvertInitialState) => {
      state.adverts = state.dataAdv
        ? [...state.adverts, state.dataAdv]
        : state.adverts
      state.dataAdv = undefined
    }),
    addAdvert: create.reducer(
      (state: AdvertInitialState, action: PayloadAction<AdvertResponseDto>) => {
        state.adverts = [
          ...state.adverts,
          {
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            status: action.payload.status,
            image: action.payload.image,
            price: action.payload.price,
          },
        ]
      },
    ),
    deleteAdvert: create.reducer(
      (state: AdvertInitialState, action: PayloadAction<string>) => {
        state.adverts = [...state.adverts].filter(
          (advert: AdvertResponseDto) => advert.id !== action.payload,
        )
      },
    ),
    updateAdvert: create.reducer(
      (state: AdvertInitialState, action: PayloadAction<AdvertResponseDto>) => {
        const index = state.adverts.findIndex(
          advert => advert.id === action.payload.id,
        )
        if (index !== -1) {
          state.adverts[index] = {
            ...state.adverts[index],
            ...action.payload,
          }
        }
      },
    ),
    findAdvertById: create.reducer(
      (state: AdvertInitialState, action: PayloadAction<string>) => {
        const advert = state.adverts.find(
          advert => advert.id === action.payload,
        )
        if (!advert) {
          state.error = 'Advert not found'
        }
      },
    ),
    addImage: create.reducer(
      (state: AdvertInitialState, action: PayloadAction<string>) => {
        state.images.push(action.payload);
      }
    ),
    clearImages: create.reducer((state: AdvertInitialState) => {
      state.images = []; 
    }),
  }),
  selectors: {
    adverts: (state: AdvertInitialState) => state,
    advertById: (state: AdvertInitialState) => (id: string) =>
      state.adverts.find(advert => advert.id === id),
  },
})

export const addAdvertSliceAction = addAdvertSlice.actions
export const addAdvertSliceSelectors = addAdvertSlice.selectors
