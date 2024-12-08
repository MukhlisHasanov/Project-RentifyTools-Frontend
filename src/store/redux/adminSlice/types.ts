export interface SearchUserRequestDto {
    lastname?: string
    email?: string
    phone?: string
  }
  
  export interface SearchUserResponseDto {
    id: string
    firstname: string
    lastname: string
    email: string
    phone: string
  }

  export interface SearchUserInitialState {
    userData: SearchUserResponseDto | undefined
    users: SearchUserResponseDto []
    foundUsers: SearchUserResponseDto []
    initialUsers: SearchUserResponseDto []
    isLoading: boolean
    error: string | undefined
  }