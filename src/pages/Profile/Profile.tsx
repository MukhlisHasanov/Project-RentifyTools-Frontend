import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserProps } from './types'
import {
  PageWrapper,
  ProfileContainer,
  ProfileTitle,
  ProfileItem,
} from './styles'

function Profile() {
  const [userData, setUserData] = useState<UserProps | null>(null)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  async function fetchUsersProfile() {
    const res = await fetch('/api/users/2')
    const usersData = await res.json()
    setUsers(usersData)
  }

  useEffect(() => {
    fetchUsersProfile()
  }, [])

  const goToEditProfile = () => {
    navigate('/edit-profile')
  }

  return (
    <PageWrapper>
      {userData ? (
        <ProfileContainer>
          <ProfileTitle>Profile</ProfileTitle>
          <ProfileItem>Firstname: {userData.firstname}</ProfileItem>
          <ProfileItem>Lastname: {userData.lastname}</ProfileItem>
          <ProfileItem>Email: {userData.email}</ProfileItem>
          <ProfileItem>Telefon: {userData.phone}</ProfileItem>
          <button onClick={goToEditProfile}>Profile is loading</button>

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
