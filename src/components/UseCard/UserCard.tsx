import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'

import { UserContainer, UserDetails, UserActions } from './styles'
import { UserProps } from './types'
import { UserName } from 'components/LayoutProfile/styles'
import { UserInfo } from './styles'
import { useState, useEffect } from 'react'

function UserCard({ userData, error }: UserProps) {
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
        <IconButton onClick={()  => navigate('/edit-profile')} color="warning" >
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => console.log('Delete user')} color="warning">
          <DeleteIcon />
        </IconButton>
      </UserActions>
    </UserContainer>
  )
}

export default UserCard