import { useAppDispatch, useAppSelector } from 'store/hooks'

import { PageWrapper, ProfileContainer } from './styles'

import UserCard from 'components/UserCard/UserCard'
import { signInOutSliceSelectors } from 'store/redux/signInSlice/signInOutSlice'
import { useNavigate } from 'react-router-dom'
import { userSliceAction } from 'store/redux/userSlice/userSlice'

function Profile() {
  const { user, error } = useAppSelector(signInOutSliceSelectors.currentUser)


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
    navigate('/profile/change-user');
  };
  
  console.log(user)
 
  return (
    <PageWrapper>
      {user ? (
        <ProfileContainer>
          <UserCard
            userData={user}
            error={error}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </ProfileContainer>
      ) : (
        <p>Benutzerdaten sind nicht verfügbar.</p> 
      )}
    </PageWrapper>
  );
}

export default Profile;