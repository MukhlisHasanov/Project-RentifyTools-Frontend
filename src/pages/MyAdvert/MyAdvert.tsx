

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyAdvertsProps } from "./types";
import { UserProps } from "pages/Profile/types";
import { AbstandContainer, AdvertContainer, AdvertTitle, Description, ImgMyAvert, PageWrapper } from "./styles";

function MyAdvert() {
  const [advertData, setAdvertData] = useState<MyAdvertsProps | null>(null);
  const [users, setUsers] = useState<UserProps[]>([]);
  const navigate = useNavigate();


  async function fetchUsers() {
    const res = await fetch("/api/users");
    const userArr = await res.json();
    setUsers(userArr);
  }


  useEffect(() => {
    const MyAdverTest: MyAdvertsProps = {
      titel: "Beispiel Titel",
      Price: 100,
      Deposit: 50,
      Status: false,
      
    };
    
    setAdvertData(MyAdverTest);
    fetchUsers();
  }, []);

  return (
    <PageWrapper>
      {advertData ? (
        <AdvertContainer>
        
          
          <AbstandContainer>
            <AdvertTitle>{advertData.titel}</AdvertTitle>
          <Description>Price: {advertData.Price} </Description>
          <Description>Deposit: {advertData.Deposit} </Description>
          <Description>Status: {advertData.Status ? "Verfügbar" : "Nicht verfügbar"}</Description>
      </AbstandContainer>
        </AdvertContainer>
      ) : (
        <p>Anzeige wird geladen...</p>
      )}
    </PageWrapper>
  );
}

export default MyAdvert;
