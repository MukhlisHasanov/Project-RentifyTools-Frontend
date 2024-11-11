import styled from "@emotion/styled"

import { colors } from "styles/colors"

interface ButtonComponentStyleProps {
  $isSmallButton: boolean
}

export const ButtonComponent = styled.button<ButtonComponentStyleProps>`
  width: 100%;
  max-width: ${({ $isSmallButton }) => 
    $isSmallButton ? "150px" : "500px"};
  height: 55px;
  background-color: ${({ disabled }) =>
  disabled? colors.GREY : colors.BUTTON};
  color: ${colors.WHITE};
  font-size: 20px;
  font-weight: bold;
  border-radius: 15px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
`;