import styled from "@emotion/styled"

import { colors } from "styles/colors"

interface ProfileTitleStyleProps {
  isActive?: boolean
}

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  max-height: calc(100vh -180px);
  gap: 20px;
  padding: 30px;
  border-right: 2px solid ${colors.WHITE};
  backdrop-filter: blur(4px);
  background: ${colors.HEADER};
  position: fixed;
  top: 80px;
  left: 0;
  z-index: 1;
  bottom: 100px;
`

export const CardItem = styled.span<ProfileTitleStyleProps>`
  font-size: 18px;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? "#F69320" : "#FFFFFF")};
`

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  text-align: center;
`
