export interface UserRequestDto {
  firstname: string
  lastname: string
  email: string
  password: string
  phone: string
}

export interface Role {
  id: number
  title: string
}

export interface UserResponseDto {
  id: string
  firstname: string
  lastname: string
  email: string
  phone: string
  roles: Role[]
}

export interface UserInitialState {
  user: UserResponseDto | undefined
  isLoading: boolean
  error: string | undefined
}
