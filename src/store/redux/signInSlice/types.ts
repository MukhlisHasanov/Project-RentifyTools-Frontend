export interface LoginRequestDto {
  email: string
  password: string
}

export interface TokenPayLoad {
  sub: number
}

export interface LoginInitialState {
  userId: number | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | undefined
}
