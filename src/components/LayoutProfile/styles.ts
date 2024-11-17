import styled from "@emotion/styled"
import { Link, NavLink } from "react-router-dom"

import { colors } from "styles/colors"

import { UserImg } from "assets"

interface ProfileTitleStyleProps {
  $isActive?: boolean
}
export const ProfileWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

export const Sidebar = styled.header`
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

export const UserProfile = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`

export const UserPhoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px;
`

export const UserName = styled.h3`
  font-size: 24px;
  color: ${colors.WHITE};
`

export const SidebarNav = styled.nav`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 25px;
`

export const SidebarLink = styled(NavLink)<ProfileTitleStyleProps>`
  font-size: 20px;
  text-decoration: none;
  font-weight: 400px;
  line-height: 24.2px;
  color: ${colors.WHITE};
  border-radius: 20px;

  &.active {
    font-weight: bold;
    color: ${colors.BUTTON};
  }
`

export const Content = styled.main`
  flex: 1;
  padding: 40px;
  margin-left: 300px;
  box-sizing: border-box;
  margin-top: 80px;
`
