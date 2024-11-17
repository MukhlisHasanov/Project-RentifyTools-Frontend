import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserProps } from './types'
import {
  PageWrapper,
  ProfileContainer,
  ProfileItem,
  ProfileTitle,
} from './styles'

function Profile() {
  const [userData, setUserData] = useState<UserProps | null>(null)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  async function fetchUserProfile() {
    const res = await fetch('/api/users/2')
    const userData = await res.json()
    setUserData(userData)
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const goToEditProfile = () => {
    navigate('/edit-profile')
    navigate('/edit-profile')
  }

  return (
    <PageWrapper>
      {userData ? (
        <ProfileContainer>
          <ProfileTitle>Profil</ProfileTitle>
          <ProfileItem>Vorname: {userData.first_name}</ProfileItem>
          <ProfileItem>Nachname: {userData.last_name}</ProfileItem>
          <ProfileItem>Email: {userData.email}</ProfileItem>
          <ProfileItem>Telefon: {userData.phone}</ProfileItem>
          <button onClick={goToEditProfile}>Profil bearbeiten</button>

          <h2>Andere Benutzer:</h2>
          <ul>
            {users.map((user: { email: string; id: number }) => (
              <li key={user.id}>{user.email}</li>
            ))}
          </ul>
        </ProfileContainer>
       
      ) : (
        <p>Profil wird geladen...</p>
      )}
    </PageWrapper>
  )
}

export default Profile
