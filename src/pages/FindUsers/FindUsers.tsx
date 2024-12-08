import { useEffect } from 'react'
import { useSnackbar } from 'notistack'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  adminSliceSelectors,
  adminSliceAction,
} from 'store/redux/adminSlice/adminSlice'
import { signInOutSliceSelectors } from 'store/redux/signInSlice/signInOutSlice'
import Button from 'components/Button/Button'
import FindUsersForm from 'components/FindUserForm/FindUserForm'
import UserCard from 'components/UserCard/UserCard'

import {
  PageWrapper,
  TitleContainer,
  Title,
  ButtonControl,
  CardsContainer,
  CardWrapper,
  UserDetails,
  UserInfo,
} from './styles'
import { SearchUserRequestDto } from 'store/redux/adminSlice/types'
import { FindUsersProps } from 'components/FindUserForm/types'

function FindUsers({onSearch}:FindUsersProps) {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { user } = useAppSelector(signInOutSliceSelectors.currentUser)

  const { foundUsers, isLoading, error } = useAppSelector(
    adminSliceSelectors.search_users,
  )
  const isAdmin = user?.roles?.some(role => role.title === 'ADMIN') || false

  useEffect(() => {
    if (isAdmin) {
      dispatch(adminSliceAction.getAllUsers())
    }
  }, [isAdmin, dispatch])

  // useEffect(() => {
   
  //     dispatch(adminSliceAction.searchUsers(user.id))

  // }, [dispatch])

  const onSearchUsers = () => {
    dispatch(adminSliceAction.searchUsers())
  }

  const onDeleteUser = (userId: string) => {
    dispatch(adminSliceAction.deleteUser(userId))
      .unwrap()
      .then(() => {
        enqueueSnackbar('User deleted successfully', {
          variant: 'success',
        })
        dispatch(adminSliceAction.getAllUsers())
      })
      .catch(error => {
        enqueueSnackbar(error, { variant: 'error' })
      })
  }

  const userCards = foundUsers.map(user => (
    // <UserCard key={user.id} userData={user}  />
    <CardsContainer> 
      <CardWrapper> 
    <UserDetails key={user.id}>
      <UserInfo>First Name: {user.firstname}</UserInfo>
      <UserInfo>Last Name: {user.lastname}</UserInfo>
      <UserInfo>Email: {user.email}</UserInfo>
      <UserInfo>Phone: {user.phone}</UserInfo>
      <ButtonControl>
        <Button name = 'Delete 'onClick={() => onDeleteUser(user.id)} />
      </ButtonControl>
    </UserDetails>
    </CardWrapper>
    </CardsContainer>
  ))

  return (
    <PageWrapper>
      <FindUsersForm />
      {/* Показываем сообщение о доступе, если пользователь не администратор */}
      {isAdmin ? (
  <>
    <Title>All Users</Title>
    {isLoading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error loading users: {error}</p>
    ) : !foundUsers.length ? (
      <p>No users found</p>
    ) : (
      <CardsContainer>{userCards}</CardsContainer>
    )}
  </>
) : (
  <p>Access denied: You do not have permission to view this page.</p>
)}
</PageWrapper>
  )
}
export default FindUsers
