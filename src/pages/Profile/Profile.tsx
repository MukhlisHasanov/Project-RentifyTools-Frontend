import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProps } from './types';
//import api from '../services/api';  (Importieren einen API-Service, wenn einer da ist (Valerian))



function Profile() {
    const [userData, setUserData] = useState<UserProps | null>(null); 
    const navigate = useNavigate();

    
    //useEffect(() => {
    //    api.get('/api/')  // API-Aufruf zum Laden der Benutzerdaten
    //        .then((response) => setUserData(response.data))
    //        .catch((error) => console.error('Fehler beim Laden der Benutzerdaten:', error));
    //}, []);
     
     useEffect(() => {
        const userTest: UserProps = {  
            first_name: 'Max',
            last_name: 'Mustermann',
            email: 'max.mustermann@example.com',
            phone: 123456789,  
            password: 'geheim123' 
        };
        setUserData(userTest); 
    }, []);

    
    const goToEditProfile = () => {
        navigate('/edit-profile');
    };
    return (
        <div>
            {userData ? (
                <div>
                    <h1>Profil</h1>
                    <p>Vorname: {userData.first_name}</p>
                    <p>Nachname: {userData.last_name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Telefon: {userData.phone}</p>
                    <button onClick={goToEditProfile}>Profil bearbeiten</button>
                </div>
            ) : (
                <p>Profil wird geladen...</p>
            )}
        </div>
    );
}

export default Profile;
