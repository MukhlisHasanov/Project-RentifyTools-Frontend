import styled from '@emotion/styled'
import { colors } from 'styles/colors'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 10px;
`
export const PhotoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 550px;
  min-height: 30px;
  max-height: fit-content;
  border: 1px solid ${colors.WHITE};
  padding: 60px;
  border-radius: 15px;
  backdrop-filter: blur(4px);
  background: ${colors.HEADER};
  gap: 20px;
`

export const PhotoFrame = styled.div``

export const DescriptionFrame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 550px;
  min-height: 30px;
  max-height: fit-content;
  border: 1px solid ${colors.WHITE};
  padding: 60px;
  border-radius: 15px;
  backdrop-filter: blur(4px);
  background: ${colors.HEADER};
  gap: 20px;
`

export const ToolInfo = styled.div`
display: flex;
flex-direction: column;

`

export const UserInfo = styled.div`
display: flex;
flex-direction: column;
`
