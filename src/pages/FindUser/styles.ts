import styled from '@emotion/styled'

import { colors } from 'styles/colors'

export const PageWrapper = styled.div`
   display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 20px;
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
  width: 500px;
  padding: 20px;
  border: 2px solid ${colors.WHITE || '#ffffff'};
  border-radius: 15px;
  background-color: ${colors.HEADER || '#333'};
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`
export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
`
export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const UserInfo = styled.p`
  color: white;
`