import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContainer, UserDetails } from './styles'; 
import { UserProps } from './types'; 
import { UserName } from 'components/LayoutProfile/styles'; 
import { UserInfo } from 'pages/Advert/styles'; 

const UserCard: React.FC<UserProps> = ({ userData, error }) => {
  const navigate = useNavigate();
  

  const userObject = localStorage.getItem('userObj');

  if (userObject) {
    const parsedUser = JSON.parse(userObject); 
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <UserContainer>
      {userData ? (
        <UserDetails>
          <UserName>{`${userData.firstname} ${userData.lastname}`}</UserName>
          <UserInfo>Email: {userData.email}</UserInfo>
          <UserInfo>Phone: {userData.phone}</UserInfo>
        </UserDetails>
      ) : (
        <p>Loading user data...</p>
      )}
    </UserContainer>
  );
};

export default UserCard;
