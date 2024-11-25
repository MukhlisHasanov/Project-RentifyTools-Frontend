import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'

import { UserContainer, UserDetails, UserActions } from './styles'
import { UserProps } from './type'
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from 'react'
import { UserName } from 'components/LayoutProfile/styles'
import { UserInfo } from 'pages/Advert/styles'

function UserCard({ userData, error }: UserProps) {
  const navigate = useNavigate()

  return (
    <UserContainer>
      {userData && (
        <UserDetails>
          <UserName>{`${userData.firstname} ${userData.lastname}`}</UserName>
          <UserInfo>Email: {userData.email}</UserInfo>
          <UserInfo>Phone: {userData.phone}</UserInfo>
        </UserDetails>
      )}
    </UserContainer>
  )
}

export default UserCard

