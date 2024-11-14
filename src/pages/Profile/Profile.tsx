import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserProps } from './types'
import {
  PageWrapper,
  ProfileTitle,
  ProfileItem,
  ProfileContainer,
} from './styles'
import ProfileCard from 'components/ProfileCard/ProfileCard'
import { UserImg } from 'assets'
//import api from '../services/api';  (Importieren einen API-Service, wenn einer da ist (Valerian))

function Profile() {
  const [userData, setUserData] = useState<UserProps | null>(null)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  async function fetchUsers() {
    const res = await fetch('/api/users/')
    const usersArr = await res.json()
    setUsers(usersArr)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    const userTest: UserProps = {
      first_name: 'Max',
      last_name: 'Mustermann',
      email: 'max.mustermann@example.com',
      phone: 123456789,
      password: 'geheim123',
    }
    setUserData(userTest)
  }, [])

  const goToEditProfile = () => {
    navigate('/edit-profile')
  }
  return (
    <PageWrapper>
      <ProfileCard firstName="Jonny" lastName="Depp" />
      {userData ? (
        <ProfileContainer>
          <ProfileTitle>Profile</ProfileTitle>
          <ProfileItem>Firstname: {userData.first_name}</ProfileItem>
          <ProfileItem>Lastname: {userData.last_name}</ProfileItem>
          <ProfileItem>Email: {userData.email}</ProfileItem>
          <ProfileItem>Telefon: {userData.phone}</ProfileItem>
          <button onClick={goToEditProfile}>Profil bearbeiten</button>

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
