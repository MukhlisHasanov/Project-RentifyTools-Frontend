import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { TOOLS_APP_ROUTES } from 'constants/routes';
import {
  ProfileWrapper,
  Sidebar,
  SidebarNav,
  SidebarLink,
  Content,
  UserProfile,
  UserPhoto,
  UserName,
} from './styles';
import { UserImg } from 'assets'; 

const LayoutProfile = () => {
  const [userData, setUserData] = useState<any | null>(null); 
  const navigate = useNavigate();

 
  useEffect(() => {
    const userObject = localStorage.getItem('userObj');
    if (userObject) {
      const userObj = JSON.parse(userObject);
      setUserData(userObj); 
    } else {
      navigate('/login'); 
    }
  }, [navigate]);

 
  if (!userData) return null;

  const goToProfile = () => {
    navigate(TOOLS_APP_ROUTES.PROFILE); 
  };

  
  const profileLinks = {
    [TOOLS_APP_ROUTES.MESSAGES]: 'Messages',
    [TOOLS_APP_ROUTES.MY_ADVERTS]: 'My Adverts',
    [TOOLS_APP_ROUTES.FAVOURITES]: 'Favourites',
    [TOOLS_APP_ROUTES.RENTED_TOOLS]: 'Rented Tools',
  };

 
  const sidebarLinks = Object.keys(profileLinks).map((link) => (
    <SidebarLink key={v4()} to={link}>
      {profileLinks[link as keyof typeof profileLinks]}
    </SidebarLink>
  ));

  return (
    <ProfileWrapper>
      <Sidebar>
        <UserProfile onClick={goToProfile}>
          <UserPhoto src={userData?.profilePicture || UserImg} alt="User Photo" />
          
          <UserName>{`${userData?.firstname} ${userData?.lastname}`}</UserName>
        </UserProfile>
        <SidebarNav>{sidebarLinks}</SidebarNav>
      </Sidebar>
      <Content>
        
        <Outlet />
      </Content>
    </ProfileWrapper>
  );
};

export default LayoutProfile;
