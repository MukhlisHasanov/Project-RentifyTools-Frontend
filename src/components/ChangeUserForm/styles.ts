import styled from '@emotion/styled'
import { colors } from 'styles/colors'

export const ChangeUserFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  background-color: ${colors.CARD};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`

export const Title = styled.h2`
  font-size: 24px;
  color: ${colors.WHITE};
  margin-bottom: 20px;
`

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2px;
  width: 350px;

  &.inline {
    flex-direction: row;
    gap: 5px;
    justify-content: space-between;
  }
`

export const ButtonControlWrapper = styled.div`
  margin-top: 20px;
  width: 350px;
  height: 55px;
`
