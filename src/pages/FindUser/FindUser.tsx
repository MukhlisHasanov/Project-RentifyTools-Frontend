import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

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
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const { user } = useAppSelector(signInOutSliceSelectors.currentUser)

  const { foundUsers, isLoading, error } = useAppSelector(
    adminSliceSelectors.search_users,
  )
  const isAdmin = user?.roles?.some(role => role.title === 'ADMIN') || false

  const [isFound, setIsFound] = useState(false)

  const onDeleteUser = (userId: string) => {
    dispatch(adminSliceAction.deleteUser(userId))
      .unwrap()
      .then(() => {
        enqueueSnackbar('User deleted successfully', {
          variant: 'success',
        })
      })
      .catch(error => {
        enqueueSnackbar(error, { variant: 'error' })
      })
  }

  const handleIsFound = () => {
    if (foundUsers.length) {
      setIsFound(true)
    } else {
      enqueueSnackbar('No users found!', { variant: 'warning' })
    }
  }

  const handleNewSearch = () => {
    setIsFound(false)
  }

  const userCards = foundUsers.map(user => (
    <CardsContainer>
    <UserCard key={user.id} userData={user} onDelete={() => onDeleteUser} />
    </CardsContainer>
  ))

  return (
    <PageWrapper>
      {!isFound ? (
        <FindUsersForm onSearch={handleIsFound} />
      ) : (
        <CardWrapper>
          {userCards}
          <Button onClick={handleNewSearch} name='New search'/>
        </CardWrapper>
        
      )}
    </PageWrapper>
  )
}
export default FindUsers
