import styled from '@emotion/styled'

interface TitleStyleProps {
    $isActive: boolean
  }
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
  flex: 1;
  gap: 4px;
`
export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`

export const Title = styled.span<TitleStyleProps>`
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? '#F69320' : '#FFFFFF')};
  font-size: 30px;
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
`