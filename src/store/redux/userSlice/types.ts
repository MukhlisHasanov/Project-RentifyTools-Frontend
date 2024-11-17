export interface User {
  id: string
  firstname: string
  lastname: string
  email: string
  phone: string
  password: string
}

export interface UserSliceInitialState {
  data: User[]
  error: string | undefined
  isFetching: boolean
}
