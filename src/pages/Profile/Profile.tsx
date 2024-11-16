import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserProps } from "./types"
import { PageWrapper, ProfileBox, PPBox, H1PBox } from "./styles"
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
  return <PageWrapper></PageWrapper>
}

export default Profile
