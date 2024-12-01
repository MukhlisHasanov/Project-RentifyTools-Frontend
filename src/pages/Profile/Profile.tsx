//v301124  import { CategoryImg, ImageTitle, ImageWrapper } from 'pages/Home/styles'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store/hooks'
//v231124  import { UserInitialState } from "store/redux/signUpSlice/types";
//v301124  import { toolSlice } from 'store/redux/ToolSlice/toolSlice'
import {
  PageWrapper,
  ProfileContainer,
  ProfileItem,
  ProfileTitle,
} from './styles'

//import userSlice from "store/redux/userSlice/userSlice";
import UserCard from 'components/UseCard/UserCard'
import { signInOutSliceSelectors } from 'store/redux/signInSlice/signInOutSlice'

function Profile() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, error } = useAppSelector(
    signInOutSliceSelectors.currentUser,
  )

console.log(user)
  return (
    <PageWrapper>
      
      {user &&  (
        <ProfileContainer>
          <UserCard userData={user} error={error} />
        </ProfileContainer>
      )}
    </PageWrapper>
  )
}
export default Profile