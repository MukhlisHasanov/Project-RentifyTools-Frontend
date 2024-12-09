import styled from '@emotion/styled'

import { colors } from 'styles/colors'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 10px;
`
export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`
export const Title = styled.span`
  cursor: pointer;
  color: ${colors.WHITE};
  font-size: 30px;
  font-weight: bold;
`
export const ButtonControl = styled.div`
  width: 250px;
  height: 55px;
`
export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 20px;
`
export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
  height: 250px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 7px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${colors.HEADER};
`
export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const UserInfo = styled.p`
  color: white;
`
