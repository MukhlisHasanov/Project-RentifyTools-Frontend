export interface AdvertData {
  id: string
  title: string
  category: string
  price: string
  description: string
  imageUrl: string
}

export interface AdvertInitialState {
  adverts: AdvertData[]
  dataAdv: AdvertData | undefined
  error: undefined | string
  isLoading: boolean
}
