export interface LoginRequestDto {
  email: string
  password: string
}

export interface TokenResponceDto {
  accessToken: string
  refreshToken: string
}

export interface LoginInitialState {
  isLoading:boolean
  isAuthenticated: boolean
  error: string | undefined
}
