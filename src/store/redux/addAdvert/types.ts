export interface AdvertRequestDto {
  title: string
  description: string
  // category: string
  image: string
  price: string
  // category: string
}

export interface AdvertResponseDto {
  id: string
  title: string
  description: string
  status: string
  image: string
  price: string
}

export interface AdvertInitialState {
  adverts: AdvertResponseDto[]
  dataAdv: AdvertResponseDto | undefined
  images: string[]
  error: undefined | string
  isLoading: boolean
}
