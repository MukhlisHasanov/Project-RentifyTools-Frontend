import styled from "@emotion/styled"

import { colors } from "styles/colors"

export const ButtonComponent = styled.button`
  width: 100%;
  height: 55px;
  background-color: ${({ disabled }) =>
    disabled ? colors.GREY : colors.BUTTON};
  color: ${colors.WHITE};
  font-size: 20px;
  font-weight: bold;
  border-radius: 7px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
`
