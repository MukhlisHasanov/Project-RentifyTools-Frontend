import { createAppSlice } from 'store/createAppSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import { v4 } from 'uuid'

import { AdvertData, AdvertInitialState } from './types'

const advertDataInitialState: AdvertInitialState = {
  adverts: [],
  dataAdv: undefined,
  error: undefined,
  isLoading: false,
}
export const addAdvertSlice = createAppSlice({
  name: 'ADVERT',
  initialState: advertDataInitialState,
  reducers: create => ({
    getAdvertData: create.asyncThunk(
      async (
        {
          title,
          categoty,
          price,
          description,
          imageUrl,
        }: {
          title: string
          categoty: string
          price: string
          description: string
          imageUrl: string
        },
        { rejectWithValue },
      ) => {
        const ADVERT_API_URL: string = `/api/products/${title}${categoty}${price}${description}${imageUrl}`
        const response = await fetch(ADVERT_API_URL)
        const result = await response.json()

        if (response.ok) {
          return result
        } else {
          return rejectWithValue(result.message)
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
            id: v4(),
            title: action.payload.title,
            category: action.payload.category,
            price: action.payload.price,
            description: action.payload.description,
            imageUrl: action.payload.imageUrl,
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
      (state: AdvertInitialState, action: PayloadAction<AdvertData>) => {
        state.adverts = [
          ...state.adverts,
          {
            id: v4(),
            title: action.payload.title,
            category: action.payload.category,
            price: action.payload.price,
            description: action.payload.description,
            imageUrl: action.payload.imageUrl,
          },
        ]
      },
    ),
    deleteAdvert: create.reducer(
      (state: AdvertInitialState, action: PayloadAction<string>) => {
        state.adverts = [...state.adverts].filter(
          (advert: AdvertData) => advert.id !== action.payload,
        )
      },
    ),
    updateAdvert: create.reducer(
      (state: AdvertInitialState, action: PayloadAction<AdvertData>) => {
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
  }),
  selectors: {
    adverts: (state: AdvertInitialState) => state,
    advertById: (state: AdvertInitialState) => (id: string) =>
      state.adverts.find(advert => advert.id === id),
  },
})

export const addAdvertSliceAction = addAdvertSlice.actions
export const addAdvertSliceSelectors = addAdvertSlice.selectors
