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
import UserCard from 'components/UserCard/UserCard'
import { userSliceSelectors } from 'store/redux/userSlice/userSlice'

function Profile() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch() //241124 Löschen?
  const { userObj, isLoading, error } = useAppSelector(
    userSliceSelectors.user_data,
  )
  useEffect(() => {
    if (!userObj) {
      const storedUser = localStorage.getItem('userObj');
      if (storedUser) {
        dispatch({
          type: 'REGISTER_USER/fulfilled',
          payload: JSON.parse(storedUser),
        });
      }
    }
  }, [dispatch, userObj]);

 

  return (
    <PageWrapper>
      {isLoading && <p>Loading...</p>}
      {userObj && (
        <ProfileContainer>
          <UserCard userData={userObj} error={error} />
        </ProfileContainer>
      )}
    </PageWrapper>
  )
}
export default Profile