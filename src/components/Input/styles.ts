import styled from "@emotion/styled"

import { colors } from "styles/colors"

export interface InputComponentStyleProps {
  $error?: string | undefined
  $isSmallInput: boolean
}

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const InputLabel = styled.label`
  font-size: 16px;
  color: black;
`

export const InputComponent = styled.input<InputComponentStyleProps>`
  width:${({ $isSmallInput }) => 
    $isSmallInput ? "200px" : "500px"};
  height: 50px;
  border: 1px solid black;
  border-radius: 15px;
  margin: 10px;
  outline: none;
  background-color:  ${colors.WHITE};
  color: ${colors.BLACK};

  &::placeholder {
    color: ${colors.BLACK};
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
