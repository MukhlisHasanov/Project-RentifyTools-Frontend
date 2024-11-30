import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'

import { UserContainer, UserDetails, UserActions } from './styles'
import { UserProps } from './types'
import { UserName } from 'components/LayoutProfile/styles'
import { UserInfo } from 'pages/Advert/styles'
import { useState, useEffect } from 'react'

function UserCard({ userData, error }: UserProps) {
  const navigate = useNavigate()


  const [user, setUser] = useState(userData || null);


  useEffect(() => {
    if (!userData) {
      const userObject = localStorage.getItem('userObj');
      if (userObject) {
        const parsedUser = JSON.parse(userObject);
        setUser(parsedUser);
      }
    }
  }, [userData]);


  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <UserContainer>
      <UserDetails>
        <UserName>{`${user.firstname} ${user.lastname}`}</UserName>
        <UserInfo>Email: {user.email}</UserInfo>
        <UserInfo>Phone: {user.phone}</UserInfo>
      </UserDetails>

      <UserActions>       
        <IconButton onClick={() => navigate('/edit-profile')}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => console.log("Delete user")}>
          <DeleteIcon />
        </IconButton>
      </UserActions>
    </UserContainer>
  );
}

export default UserCard;
