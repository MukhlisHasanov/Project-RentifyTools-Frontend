
import styled from "@emotion/styled"

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 4px;
`

export const AdvertContainer = styled.div`
 width: 450px;
  height: 250px;
  display: flex;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #4d4d4dc7;
  cursor: pointer;
`

export const AdvertTitle = styled.h1`
  font-size: 18px;
  color: black;
`

export const Description = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
`
export const ImgMyAvert = styled.img`
flex: 1;
width: 219px;
height: 228px;
top: 262px;
left: 568px;
margin: 5px;
border-radius: 15px;
  background-size: cover;
  background-position: center;
`
export const AbstandContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; 
`;