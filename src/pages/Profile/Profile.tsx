import { CategoryImg, ImageTitle, ImageWrapper } from 'pages/Home/styles'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  registerUser,
  signUpSliceAction,
  signUpSliceSelectors,
} from 'store/redux/signUpSlice/signUpSlice'
//v231124  import { UserInitialState } from "store/redux/signUpSlice/types";
import { toolSlice } from 'store/redux/ToolSlice/toolSlice'
import {
  PageWrapper,
  ProfileContainer,
  ProfileItem,
  ProfileTitle,
} from './styles'
//import userSlice from "store/redux/userSlice/userSlice";
import UserCard from 'components/UserCard/UserCard'
import { userSliceSelectors } from 'store/redux/userSlice/userSlice'

function Profile() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch() //241124 Löschen?
  const { userObj, isLoading, error } = useAppSelector(
    userSliceSelectors.user_data,
  )
 

  return (
    <PageWrapper>
      {userObj && (
        <ProfileContainer>
          <UserCard userData={userObj} error={error} />
        </ProfileContainer>
      )}
    </PageWrapper>
  )
}
export default Profile

function fetchUserById(userId: any): any {
  throw new Error('Function not implemented.')
}
