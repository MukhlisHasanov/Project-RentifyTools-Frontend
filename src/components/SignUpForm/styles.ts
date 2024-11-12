import styled from "@emotion/styled"

import { colors } from "styles/colors"

export const SignUpFormContainer = styled.form`
  display: flex;
  flex-direction: column;
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

export const Title = styled.span`
  color: ${colors.WHITE};
  font-size: 24px;
  font-weight: normal;
  cursor: pointer;
`
export const InputLabel = styled.label`
  font-size: 16px;
  color: ${colors.WHITE};
`
export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const Text = styled.span`
  color: ${colors.WHITE};
  font-size: 12px;
  font-weight: bold;
  justify-content: space-evenly;
  text-align: center;
`
