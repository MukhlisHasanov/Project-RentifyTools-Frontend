import { CategoryImg, ImageTitle, ImageWrapper } from "pages/Home/styles";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { registerUser, signUpSliceAction, signUpSliceSelectors } from "store/redux/signUpSlice/signUpSlice";
import { UserInitialState } from "store/redux/signUpSlice/types";
import { toolSlice } from "store/redux/ToolSlice/toolSlice";
import { PageWrapper, ProfileContainer, ProfileItem, ProfileTitle } from "./styles";
//import userSlice from "store/redux/userSlice/userSlice";




function Profile() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userObj, isLoading, error } = useAppSelector(signUpSliceSelectors.register_user);

  useEffect(() => {
    
  }, )

  return (
    <PageWrapper>
      {userObj ? (
        <ProfileContainer>
          <ProfileTitle>Profil</ProfileTitle>
          <ProfileItem>Name: {userObj.firstname}</ProfileItem>
          <ProfileItem>LastName: {userObj.lastname}</ProfileItem>
          <ProfileItem>Email: {userObj.email}</ProfileItem>
          <ProfileItem>Phone: {userObj.phone}</ProfileItem>
          
        </ProfileContainer>
      ) : (
        <p>Profile is loading...</p>
      )}
    </PageWrapper>
  );
}
 export default Profile();