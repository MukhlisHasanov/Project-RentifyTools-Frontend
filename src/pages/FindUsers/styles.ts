import styled from '@emotion/styled'

import { colors } from 'styles/colors'

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* justify-content: center; */
  align-items: center;
  flex: 1;
  gap: 4px;
  /* Новый стиль для обеспечения переноса и прокрутки */
  flex-wrap: wrap; /* Позволяет элементам переходить на следующую строку */
  overflow-y: auto; /* Добавляет прокрутку по вертикали */
  max-height: 100vh; /* Устанавливаем ограничение по высоте */
  padding: 16px; /* Отступы для красоты */
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
export const UserContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const UserInfo = styled.p`
  color: white;
`
