import { useAppSelector } from 'store/hooks'

import { PageWrapper, ProfileContainer } from './styles'

import UserCard from 'components/UseCard/UserCard'
import { signInOutSliceSelectors } from 'store/redux/signInSlice/signInOutSlice'
import { useEffect } from 'react'

function Profile() {
  
  const { user, error } = useAppSelector(signInOutSliceSelectors.currentUser)





  console.log(user)
  return (
    <PageWrapper>
      {user && (
        <ProfileContainer>
          <UserCard userData={user} error={error} />
        </ProfileContainer>
      )}
    </PageWrapper>
  )
}
export default Profile

