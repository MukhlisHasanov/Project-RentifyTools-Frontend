import styled from '@emotion/styled'
import { colors } from 'styles/colors'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${colors.HEADER};
  min-height: 100vh;
`

export const PageTitle = styled.h1`
  font-size: 24px;
  color: ${colors.WHITE};
  margin-bottom: 20px;
`

export const SuccessMessage = styled.div`
  color: green;
  font-size: 16px;
  margin-bottom: 20px;
`
