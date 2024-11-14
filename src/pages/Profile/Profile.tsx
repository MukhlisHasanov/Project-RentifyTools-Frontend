//v141124  import React, { useEffect, useState } from "react"
//v141124  import { useNavigate } from "react-router-dom"
//v141124  import { UserProps } from "./types"
//v141124  import { ProfileBox, PPBox } from "./styles"
//import api from '../services/api';  (Importieren einen API-Service, wenn einer da ist (Valerian))

//v141124  function Profile() {
//v141124    const [userData, setUserData] = useState<UserProps | null>(null)
//v141124    const navigate = useNavigate()
//v141124    const [users, setUsers] = useState([])

//v141124    async function fetchUsers() {
//v141124      const res = await fetch("/api/users")
//v141124      const usersArr = await res.json()
//v141124      setUsers(usersArr)
//v141124    }

//v141124    useEffect(() => {
//v141124      fetchUsers()
//v141124    }, [])
//useEffect(() => {
//    api.get('/api/')  // API-Aufruf zum Laden der Benutzerdaten
//        .then((response) => setUserData(response.data))
//        .catch((error) => console.error('Fehler beim Laden der Benutzerdaten:', error));
//}, []);

//v141124    useEffect(() => {
//v141124      const userTest: UserProps = {
//v141124        first_name: "Max",
//v141124        last_name: "Mustermann",
//v141124        email: "max.mustermann@example.com",
//v141124        phone: 123456789,
//v141124        password: "geheim123",
//v141124      }
//v141124      setUserData(userTest)
//v141124    }, [])

//v141124    const goToEditProfile = () => {
//v141124      navigate("/edit-profile")
//v141124    }
//v141124    return (
//v141124      <div>
//v141124        {userData ? (
//v141124          <ProfileBox>
//v141124            <h1>Profil</h1>
//v141124            <PPBox>Vorname: {userData.first_name}</PPBox>
//v141124            <PPBox>Nachname: {userData.last_name}</PPBox>
//v141124            <PPBox>Email: {userData.email}</PPBox>
//v141124            <PPBox>Telefon: {userData.phone}</PPBox>
//v141124            <button onClick={goToEditProfile}>Profil bearbeiten</button>

//v141124            <ul>
//v141124              {users.map((user: { email: string; id: number }) => (
//v141124                <li key={user.id}>{user.email}</li>
//v141124              ))}
//v141124            </ul>
//v141124          </ProfileBox>
//v141124        ) : (
//v141124          <p>Profil wird geladen...</p>
//v141124        )}
//v141124      </div>
//v141124    )
//v141124  }

//v141124  export default Profile

//v141124  import MyAdvert from "pages/MyAdvert/MyAdvert";

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserProps } from "./types"
import { PageWrapper, ProfileBox, PPBox, H1PBox } from "./styles"

//v141124  import { UserImg } from "assets"
//import api from '../services/api';  (Importieren einen API-Service, wenn einer da ist (Valerian))

function Profile() {
  const [userData, setUserData] = useState<UserProps | null>(null)
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  async function fetchUsers() {
    const res = await fetch("/api/users")
    const usersArr = await res.json()
    setUsers(usersArr)
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  //useEffect(() => {
  //    api.get('/api/')  // API-Aufruf zum Laden der Benutzerdaten
  //        .then((response) => setUserData(response.data))
  //        .catch((error) => console.error('Fehler beim Laden der Benutzerdaten:', error));
  //}, []);

  useEffect(() => {
    const userTest: UserProps = {
      first_name: "Max",
      last_name: "Mustermann",
      email: "max.mustermann@example.com",
      phone: 123456789,
      password: "geheim123",
    }
    setUserData(userTest)

  }, [])

  const goToEditProfile = () => {
    navigate("/edit-profile")
  }
  return (
    <PageWrapper>
      
      {userData ? (
        <ProfileBox>
          <H1PBox>Profile</H1PBox>
          <PPBox>Vorname: {userData.first_name}</PPBox>
          <PPBox>Nachname: {userData.last_name}</PPBox>
          <PPBox>Email: {userData.email}</PPBox>
          <PPBox>Telefon: {userData.phone}</PPBox>
          <button onClick={goToEditProfile}>Profil bearbeiten</button>

          <ul>
            {users.map((user: { email: string; id: number }) => (
              <li key={user.id}>{user.email}</li>
            ))}
          </ul>
        </ProfileBox>
      ) : (
        <p>Profil wird geladen...</p>
      )}
    </PageWrapper>
  )
}

export default Profile
