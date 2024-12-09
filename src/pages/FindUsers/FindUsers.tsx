import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

function FindUsers() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { user } = useAppSelector(signInOutSliceSelectors.currentUser)

  const { foundUsers, isLoading, error } = useAppSelector(
    adminSliceSelectors.search_users,
  )
  const isAdmin = user?.roles?.some(role => role.title === 'ADMIN') || false
  const [showResults, setShowResults] = useState(true)
  useEffect(() => {
    if (isAdmin) {
      dispatch(adminSliceAction.getAllUsers())
    }
  }, [isAdmin, dispatch])

  const [searchParams, setSearchParams] = useState({
    lastname: '',
    email: '',
    phone: '',
  })

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setSearchParams(prev => ({ ...prev, [name]: value }))
  }

  const onSearchUsers = () => {
    if (
      searchParams.lastname.trim() ||
      searchParams.email.trim() ||
      searchParams.phone.trim()
    ) {
      dispatch(adminSliceAction.searchUsers(searchParams))
        .unwrap()
        .then(() => {
          enqueueSnackbar('User found!', { variant: 'success' })
          setShowResults(true)
        })
        .catch(err => {
          enqueueSnackbar(`Error: ${err}`, { variant: 'error' })
        })
    } else {
      enqueueSnackbar('Please provide at least one search parameter.', {
        variant: 'warning',
      })
    }
  }

  const onDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
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
  }

  const onBackToForm = () => {
    setShowResults(false)
  }

  const goBackToList = () => {
    navigate(-1)
  }
  const userCards = foundUsers.map(user => (
    <CardsContainer>
      <CardWrapper>
        <UserDetails key={user.id}>
          <UserInfo>First Name: {user.firstname}</UserInfo>
          <UserInfo>Last Name: {user.lastname}</UserInfo>
          <UserInfo>Email: {user.email}</UserInfo>
          <UserInfo>Phone: {user.phone}</UserInfo>
          <ButtonControl>
            <Button name="Delete " onClick={() => onDeleteUser(user.id)} />
          </ButtonControl>
        </UserDetails>
      </CardWrapper>
    </CardsContainer>
  ))

  return (
    <PageWrapper>
      {isAdmin ? (
        showResults ? (
          <>
            <ButtonControl>
              <Button onClick={onBackToForm} name="Back to Search" />
            </ButtonControl>
            <Title>List of Users</Title>
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
          <FindUsersForm
            value={searchParams}
            onChange={handleSearchChange}
            onSubmit={onSearchUsers}
          />
        )
      ) : (
        <ButtonControl>
          <Button onClick={goBackToList} name="Back to List" />
        </ButtonControl>
      )}
    </PageWrapper>
  )
}

export default FindUsers
