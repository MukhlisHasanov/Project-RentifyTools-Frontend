export interface LoginRequestDto {
  email: string
  password: string
}

export interface LoginInitialState {
  user:UserResponseDto | undefined
  isLoading: boolean
  isAuthenticated: boolean
  error: string | undefined
}

export interface UserResponseDto {
  id: string
  firstname: string
  lastname: string
  email: string
  phone: string
  roles: Role[]
}
export interface Role {
  id: number
  title: string
}