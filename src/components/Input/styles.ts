import styled from "@emotion/styled"

import { colors } from "styles/colors"

export interface InputComponentStyleProps {
  $error?: string | undefined
}

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const InputLabel = styled.label`
  font-size: 16px;
  color: hsl(0, 0%, 44%);
`

export const InputComponent = styled.input<InputComponentStyleProps>`
  /* width: 100%; */
  width: 500px;
  height: 50px;
  border: 1px solid white;
  border-radius: 50px;
  padding: 12px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);

  color: ${colors.WHITE};
  backdrop-filter: blur(4px);

  &::placeholder {
    color: ${colors.WHITE};
    font-size: 16px;
  }

  &:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  }
`

export const ErrorContainer = styled.p`
  font-size: 18px;
  color: ${colors.ERROR};
`
