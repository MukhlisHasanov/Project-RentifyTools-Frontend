import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'

import { UserContainer, UserDetails, UserActions } from './styles'
import { UserProps } from './types'
import { UserName } from 'components/LayoutProfile/styles'
import { UserInfo } from './styles'
import { colors } from 'styles/colors'
import { userSliceAction } from 'store/redux/userSlice/userSlice'
import { useDispatch } from 'react-redux'
import { signInOutSliceAction } from 'store/redux/signInSlice/signInOutSlice'
import { useAppDispatch } from 'store/hooks'


function UserCard({ userData, error }: UserProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch() 

  const handleDelete = async () => {
    if (window.confirm('Bist du sicher, dass du den Benutzer löschen möchtest?')) {
      try {
        const result = await dispatch(userSliceAction.deleteUser()) 
        if (userSliceAction.deleteUser.fulfilled.match(result)) {
          console.log('Benutzer erfolgreich gelöscht:')
        } else {
          console.error('Fehler beim Löschen:', result.payload || result.error)
        }
      } catch (error) {
        console.error('Ein unerwarteter Fehler ist aufgetreten:', error)
      }
    }
  }

  const handleUpdate = () => {
    
    navigate('/profile/change-user')
  }

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
            onClick={handleUpdate} 
            sx={{ color: colors.BUTTON }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
           onClick={() => handleDelete()}  
           sx={{ color: colors.BUTTON }}
        >
          <DeleteIcon />
        </IconButton>
      </UserActions>
    </UserContainer>
  )
}

export default UserCard
