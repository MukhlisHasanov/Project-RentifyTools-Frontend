import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

import {
  UserContainer,
  UserDetails,
 
  UserActions,
} from './styles';
import { UserProps } from './type';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { UserName } from 'components/LayoutProfile/styles';
import { UserInfo } from 'pages/Advert/styles';

function UserCard({
  userId,
  firstname,
  lastname,
  email,
  phone,
  roles,
}: UserProps) {
  const navigate = useNavigate();

 

  return (
    <UserContainer>
      <UserDetails>
        <UserName>{`${firstname} ${lastname}`}</UserName>
        <UserInfo>Email: {email}</UserInfo>
        <UserInfo>Phone: {phone}</UserInfo>
      </UserDetails>
    </UserContainer>
  );
}

export default UserCard;
 //v241124 hier hab ich auch was verändert aber ich weis es nicht mehr was ich denke es war die 9 zeile
 //v241124 UserCard wurde verändert musste jetzt fetig sein
