import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCardProps } from './types';
import {
  PageWrapper,
  ProfileContainer,
  ProfileItem,
  ProfileTitle,
} from './styles';

function Profile() {
  const [userData, setUserData] = useState<UserCardProps | null>(null)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  

  async function fetchUserProfile() {
    const userId = 1; 
    try {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      const userData = await res.json();
      setUserData(userData);
    } catch (error) {
      console.error("Fehler beim Laden des Benutzerprofils:", error);
    }
  }
  

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const goToEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <PageWrapper>
      {userData ? (
        <ProfileContainer>
          <ProfileTitle>Profil</ProfileTitle>
          <ProfileItem>Name: {userData.firstname}</ProfileItem>
          <ProfileItem>Surname: {userData.lastname}</ProfileItem>
          <ProfileItem>Email: {userData.email}</ProfileItem>
          <ProfileItem>Phone: {userData.phone}</ProfileItem>
          <button onClick={goToEditProfile}>Change information</button>
        </ProfileContainer>
      ) : (
        <p>Profile is loading...</p>
      )}
    </PageWrapper>
  );
}

export default Profile;
