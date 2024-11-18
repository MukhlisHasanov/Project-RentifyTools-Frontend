import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProps } from './types';
import {
  PageWrapper,
  ProfileContainer,
  ProfileItem,
  ProfileTitle,
} from './styles';

function Profile() {
  const [userData, setUserData] = useState<UserProps | null>(null);
  const navigate = useNavigate();
  
  async function fetchUserProfile() {
    const userId = 123; 
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
        <p>Profil wird geladen...</p>
      )}
    </PageWrapper>
  );
}

export default Profile;
