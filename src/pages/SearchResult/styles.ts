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

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 20px;
`
export const TextContainer = styled.h2`
  font-weight: bold;
  color: ${colors.WHITE};
  margin: 10px;
  background: ${colors.HEADER};
  height: fit-content;
  width: fit-content;
  padding: 5px;
  border-radius: 7px;
`
