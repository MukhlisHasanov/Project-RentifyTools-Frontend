import styled from "@emotion/styled"

import { colors } from "styles/colors"

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 4px;
`

export const PageTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.WHITE};
`
export const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  gap: 30px;
  background-color: ${colors.HEADER};
`
export const CategoryImg = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 50px;
  height: 50px;
`
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 550px;
  min-height: 50px;
  max-height: fit-content;
  border: 1px solid ${colors.WHITE};
  padding: 60px;
  border-radius: 15px;
  backdrop-filter: blur(4px);
  background: ${colors.HEADER};
  gap: 20px;
`