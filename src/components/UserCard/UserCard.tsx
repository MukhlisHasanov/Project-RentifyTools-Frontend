import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'

import { UserName } from 'components/LayoutProfile/styles'
import { colors } from 'styles/colors'

import { UserContainer, UserDetails, UserActions } from './styles'
import { UserProps } from './types'
import { UserInfo } from './styles'

function UserCard({ userData}: UserProps) {
  const navigate = useNavigate()

  return (
    <UserContainer>
      <UserDetails>
        {userData && (
          <>
            <UserName>{`${userData.firstname} ${userData.lastname}`}</UserName>
            <UserInfo>Email: {userData.email}</UserInfo>
            <UserInfo>Phone: {userData.phone}</UserInfo>
          </>
        )}
      </UserDetails>

      <UserActions>
        <IconButton
          onClick={() => navigate('/edit-profile')}
          sx={{ color: colors.BUTTON }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => console.log('Delete user')}
          sx={{ color: colors.BUTTON }}
        >
          <DeleteIcon />
        </IconButton>
      </UserActions>
    </UserContainer>
  )
}

export default UserCard
