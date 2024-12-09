import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'

import { UserContainer, UserDetails, UserActions } from './styles'
import { UserProps } from './types'
import { UserName } from 'components/LayoutProfile/styles'
import { UserInfo } from './styles'
import { colors } from 'styles/colors'

function UserCard({ userData, error, onDelete, onUpdate }: UserProps) {
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
          onClick={onUpdate}
          sx={{ color: colors.BUTTON }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={onDelete}
          sx={{ color: colors.BUTTON }}
        >
          <DeleteIcon />
        </IconButton>
      </UserActions>
    </UserContainer>
  )
}

export default UserCard
